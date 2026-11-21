/**
 * Keeps a fast scroll from flying past the project panels on the home page.
 *
 * Scrolling stays exactly as smooth as the rest of the site. The only change:
 * one scroll gesture can't carry past the next project panel. If a flick
 * would overshoot it, the scroll eases to a stop with that panel filling the
 * screen, the same way smooth scrolling always comes to rest. The next
 * gesture carries on. Above the hero and past the last panel nothing changes.
 *
 * Wheel and trackpad: Lenis's `virtualScroll` hook (wired in src/lib/lenis.tsx)
 * trims the part of a scroll that would cross the boundary, and Lenis eases
 * into it as usual.
 *
 * Touch: phones scroll natively. If a fling's momentum crosses a boundary
 * after the finger lifts, the momentum is cut and the page eases back onto the
 * panel, like a soft bounce.
 */

import type Lenis from "lenis";

type VirtualScrollData = { deltaX: number; deltaY: number; event: WheelEvent | TouchEvent };

/** A wheel gesture ends after this long without events (trackpads keep sending them as inertia). */
const GESTURE_GAP_MS = 220;
const EDGE = 4; // px of slack when comparing scroll positions

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

let lenis: Lenis | null = null;

export function attachLenis(instance: Lenis | null) {
    lenis = instance;
}

/** Scroll positions where each project panel sits flush with the top of the screen. */
function panelStops(): number[] {
    const section = document.getElementById("projects");
    if (!section || !lenis) return [];
    const sheets = Array.from(section.querySelectorAll<HTMLElement>(":scope > article.sheet"));
    if (sheets.length === 0) return [];
    const top = section.getBoundingClientRect().top + window.scrollY;
    const stops: number[] = [];
    let y = top;
    for (const sheet of sheets) {
        stops.push(Math.round(y));
        y += sheet.offsetHeight;
    }
    return stops;
}

/** The panel a gesture starting at `y` in direction `dir` may not scroll past, or null. */
function boundaryFrom(y: number, dir: 1 | -1, stops: number[]): number | null {
    const first = stops[0];
    const last = stops[stops.length - 1];
    if (dir > 0) {
        if (y >= last - EDGE) return null;                     // last panel and below: free
        return stops.find((s) => s > y + EDGE) ?? null;        // the next panel down (hero -> first)
    }
    if (y > last + EDGE) return last;                          // coming back up: stop on the last panel
    if (y > first + EDGE) return [...stops].reverse().find((s) => s < y - EDGE) ?? null;
    return null;                                               // first panel and above: free
}

/* ---------- Wheel and trackpad ---------- */

const wheel = {
    dir: 0 as 0 | 1 | -1,
    boundary: null as number | null,
    last: 0,
    lastSize: 0,
    interval: 16, // running average gap between events, so a slow device isn't mistaken for a pause
    // While parked on a boundary, the leftover momentum of the flick is absorbed.
    absorbing: false,
    absorbSince: 0,
    floor: Infinity, // smallest event seen while absorbing: momentum only ever shrinks
};

/** Longest a boundary holds while events keep coming. Momentum past this is let through. */
const MAX_HOLD_MS = 1400;

/** Lenis `virtualScroll` hook. Return false to keep Lenis from handling the event. */
export function onVirtualScroll(data: VirtualScrollData): boolean {
    const { event } = data;
    if (!lenis || event.ctrlKey) return true;
    if (event.type.startsWith("touch")) {
        onTouch(event as TouchEvent, data.deltaY);
        return true;
    }
    if (event.type !== "wheel" || data.deltaY === 0) return true;

    const stops = panelStops();
    if (stops.length === 0) return true;

    const now = performance.now();
    const since = now - wheel.last;
    const size = Math.abs(data.deltaY);
    const dir = data.deltaY > 0 ? 1 : -1;
    if (since < 1000) wheel.interval = wheel.interval * 0.8 + since * 0.2;

    const paused = since > Math.max(GESTURE_GAP_MS, wheel.interval * 4);
    const freshPush = size > wheel.lastSize * 1.8 + 6; // a new flick while the old one's inertia is fading
    wheel.last = now;
    wheel.lastSize = size;

    const startGesture = () => {
        wheel.dir = dir;
        wheel.boundary = boundaryFrom(lenis!.targetScroll, dir, stops);
        wheel.absorbing = false;
    };
    if (paused || freshPush || dir !== wheel.dir) startGesture();
    if (wheel.boundary === null) return true;

    // How far this gesture may still go before it reaches the boundary.
    let room = dir > 0 ? wheel.boundary - lenis.targetScroll : lenis.targetScroll - wheel.boundary;
    if (room <= 0.5) {
        // Parked on the boundary. Absorb what is left of the flick, but only
        // while it is momentum dying away. Fast repeated swipes run together
        // with no pause between them, so a new swipe is recognised by its
        // events growing again, or simply by the hold running out.
        if (!wheel.absorbing) {
            wheel.absorbing = true;
            wheel.absorbSince = now;
            wheel.floor = size;
        }
        wheel.floor = Math.min(wheel.floor, size);
        const growing = size > wheel.floor * 1.5 + 3;
        // Safety net: if events keep coming at a real strength for this long, let them through.
        const heldLongEnough = now - wheel.absorbSince > MAX_HOLD_MS && size >= 6;
        if (!growing && !heldLongEnough) {
            if (event.cancelable) event.preventDefault();
            return false;
        }
        startGesture();
        if (wheel.boundary === null) return true;
        room = dir > 0 ? wheel.boundary - lenis.targetScroll : lenis.targetScroll - wheel.boundary;
    } else {
        wheel.absorbing = false;
    }
    if (size > room) data.deltaY = dir * Math.max(room, 0);
    return true;
}

/* ---------- Touch ---------- */

const touch = {
    down: false,
    dir: 0 as 0 | 1 | -1,
    boundary: null as number | null, // only enforced on momentum, after the finger lifts
};
let settling = false;

function onTouch(event: TouchEvent, deltaY: number) {
    if (event.type === "touchstart") {
        touch.down = true;
        touch.boundary = null;
        return;
    }
    if (event.type === "touchmove") {
        if (deltaY !== 0) touch.dir = deltaY > 0 ? 1 : -1;
        return;
    }
    if (event.type === "touchend") {
        touch.down = false;
        const stops = panelStops();
        touch.boundary = stops.length && touch.dir ? boundaryFrom(window.scrollY, touch.dir, stops) : null;
    }
}

/**
 * Ease onto `target`, after cutting any native momentum still running.
 * Overflow stays hidden for the length of the ease: that is what stops
 * momentum on phones (iOS included), and programmatic scrolling still works
 * underneath it.
 */
function settleOn(target: number) {
    settling = true;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const from = window.scrollY;
    const start = performance.now();
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450;
    const step = (now: number) => {
        const t = duration ? Math.min(1, (now - start) / duration) : 1;
        window.scrollTo(0, from + (target - from) * easeOutCubic(t));
        if (t < 1) {
            requestAnimationFrame(step);
        } else {
            root.style.overflow = "";
            lenis?.resize();
            settling = false;
        }
    };
    requestAnimationFrame(step);
}

/** Called on every scroll. Catches touch momentum crossing a boundary. */
export function onScroll(y: number) {
    if (settling || touch.down || touch.boundary === null) return;
    const crossed = touch.dir > 0 ? y > touch.boundary : y < touch.boundary;
    if (!crossed) return;
    const target = touch.boundary;
    touch.boundary = null;
    settleOn(target);
}
