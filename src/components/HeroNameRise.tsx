"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero name, risen out of the sea.
 *
 * On load, dots lift out of the water below and gather into नंदन पाठक,
 * hold for a moment, then flow across into Nandan Pathak and settle into the
 * solid name. Clicking the name sends it back and forth between the two
 * scripts the same way.
 *
 * The real name is always in the page as text: the dots are drawn on a canvas
 * laid over it, and the text fades back in when they arrive. Without
 * JavaScript, or with reduced motion on, the name simply shows.
 */

type Script = "en" | "hi";
type Lines = { en: string[]; hi: string[] };

const LINES: Lines = { en: ["Nandan", "Pathak"], hi: ["नंदन", "पाठक"] };

const WATER: [number, number, number] = [0x8a, 0x85, 0x92]; // the sea's grey, where the dots start
const MARIGOLD: [number, number, number] = [0xff, 0xb3, 0x19];
const SHADES = 16;

// Timings, in seconds.
const RISE = 1.0; // one dot's trip up out of the water
const RISE_SPREAD = 0.55; // dots set off at different moments
const HOLD = 0.75; // नंदन पाठक holds before turning into English
const FLOW = 0.85; // one dot's trip from one script to the other
const FLOW_SPREAD = 0.4; // the change sweeps left to right
const SETTLE = 0.35; // the dots fade as the solid name comes back

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

type Points = { x: Float32Array; y: Float32Array; gap: number };

/** Where the dots of one script's letters sit, in canvas pixels, sampled from the text itself. */
function sampleScript(layer: HTMLElement, origin: DOMRect, ratio: number, target: number): Points {
    const lines = Array.from(layer.querySelectorAll<HTMLElement>("[data-line]"));
    const xs: number[] = [];
    const ys: number[] = [];

    const draw = (gap: number, collect: boolean) => {
        let count = 0;
        for (const line of lines) {
            const rect = line.getBoundingClientRect();
            const cs = getComputedStyle(line);
            const w = Math.ceil(rect.width * ratio) + 4;
            const h = Math.ceil(rect.height * ratio) + 4;
            if (w < 2 || h < 2) continue;
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) continue;
            const size = parseFloat(cs.fontSize) * ratio;
            ctx.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`;
            const c = ctx as CanvasRenderingContext2D & { fontStretch?: string; letterSpacing?: string };
            if ("fontStretch" in c) c.fontStretch = "expanded";
            if ("letterSpacing" in c) c.letterSpacing = `${parseFloat(cs.letterSpacing || "0") * ratio || 0}px`;
            const text = line.textContent ?? "";
            const m = ctx.measureText(text);
            // CSS centres the font's box inside the line box; do the same here.
            const asc = m.fontBoundingBoxAscent || size * 0.8;
            const desc = m.fontBoundingBoxDescent || size * 0.2;
            const baseline = (rect.height * ratio - (asc + desc)) / 2 + asc;
            // If the canvas can't stretch the font like CSS does, scale it to the same width.
            const stretch = m.width > 0 ? (rect.width * ratio) / m.width : 1;
            ctx.setTransform(stretch, 0, 0, 1, 0, 0);
            ctx.fillStyle = "#000";
            ctx.fillText(text, 0, baseline);
            const data = ctx.getImageData(0, 0, w, h).data;
            const step = Math.max(1, Math.round(gap * ratio));
            for (let y = 0; y < h; y += step) {
                for (let x = 0; x < w; x += step) {
                    if (data[(y * w + x) * 4 + 3] > 140) {
                        count++;
                        if (collect) {
                            xs.push((rect.left - origin.left) * ratio + x);
                            ys.push((rect.top - origin.top) * ratio + y);
                        }
                    }
                }
            }
        }
        return count;
    };

    // Pick the spacing that gives about `target` dots, whatever the screen size.
    const probe = draw(3, false);
    const gap = probe > 0 ? Math.max(1.5, 3 * Math.sqrt(probe / target)) : 3;
    draw(gap, true);
    return { x: Float32Array.from(xs), y: Float32Array.from(ys), gap };
}

/** Make two dot sets the same size and pair them up so the flow sweeps cleanly. */
function pairUp(a: Points, b: Points, rand: () => number) {
    const n = Math.max(a.x.length, b.x.length);
    const grow = (p: Points) => {
        const idx = Array.from({ length: n }, (_, i) => (i < p.x.length ? i : Math.floor(rand() * p.x.length)));
        // Order by position across the name, with a little noise so paths cross a bit.
        idx.sort((i, j) => p.x[i] + p.y[i] * 0.15 - (p.x[j] + p.y[j] * 0.15));
        return idx;
    };
    const ia = grow(a);
    const ib = grow(b);
    return { ia, ib, n };
}

function makeRandom(seed: number) {
    let s = seed >>> 0;
    return () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
    };
}

export default function HeroNameRise() {
    const [script, setScript] = useState<Script>("en");
    // "pending": waiting for the intro; "running": dots on screen; "done": solid name.
    const [phase, setPhase] = useState<"pending" | "running" | "done">("pending");
    const rootRef = useRef<HTMLButtonElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const layers = useRef<Record<Script, HTMLSpanElement | null>>({ en: null, hi: null });
    const busy = useRef(false);
    const cancel = useRef<() => void>(() => {});

    /** Draw dots moving from `from` (or up out of the water) into `to`, then show `to` as text. */
    const play = async (to: Script, from: Script | "water") => {
        const root = rootRef.current;
        const canvas = canvasRef.current;
        const target = layers.current[to];
        if (!root || !canvas || !target || busy.current) return;
        busy.current = true;

        const finish = () => {
            busy.current = false;
            canvas.style.opacity = "0";
            setScript(to);
            setPhase("done");
        };

        // The dots must be sampled from the real fonts, Devanagari included.
        try {
            const family = getComputedStyle(target).fontFamily;
            await Promise.all([
                document.fonts.load(`800 100px ${family}`, LINES.en.join(" ")),
                document.fonts.load(`800 100px ${family}`, LINES.hi.join(" ")),
            ]);
        } catch {
            /* fall through with whatever fonts are ready */
        }

        // The canvas covers the whole hero, so the dots can rise from the water at the bottom.
        const section = root.closest("section") ?? root;
        const area = section.getBoundingClientRect();
        const own = root.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.style.left = `${area.left - own.left}px`;
        canvas.style.top = `${area.top - own.top}px`;
        canvas.style.width = `${area.width}px`;
        canvas.style.height = `${area.height}px`;
        canvas.width = Math.round(area.width * ratio);
        canvas.height = Math.round(area.height * ratio);
        const ctx = canvas.getContext("2d");
        if (!ctx) return finish();

        const wanted = area.width < 768 ? 3200 : 6500;
        const rand = makeRandom(7);
        const end = sampleScript(target, area, ratio, wanted);
        if (end.x.length === 0) return finish();

        // Every dot gets a start, an optional stop on the way (नंदन पाठक, for
        // the intro), and an end. Worked out once, then only interpolated.
        const intro = from === "water";
        const hiLayer = layers.current.hi;
        const via = intro && to === "en" && hiLayer ? sampleScript(hiLayer, area, ratio, wanted) : null;
        const first = via ?? (intro ? end : sampleScript(layers.current[from as Script]!, area, ratio, wanted));
        const { ia, ib, n } = pairUp(first, end, rand);

        const sx = new Float32Array(n), sy = new Float32Array(n); // start
        const mx = new Float32Array(n), my = new Float32Array(n); // first shape
        const tx = new Float32Array(n), ty = new Float32Array(n); // final shape
        const riseDelay = new Float32Array(n);
        const flowDelay = new Float32Array(n);
        const arc = new Float32Array(n);
        const sway = new Float32Array(n);
        let minX = Infinity;
        let maxX = -Infinity;
        for (let k = 0; k < n; k++) {
            tx[k] = end.x[ib[k]];
            ty[k] = end.y[ib[k]];
            if (tx[k] < minX) minX = tx[k];
            if (tx[k] > maxX) maxX = tx[k];
        }
        const floor = canvas.height;
        for (let k = 0; k < n; k++) {
            mx[k] = first.x[ia[k]];
            my[k] = first.y[ia[k]];
            // Intro: start in the water below the dot's first spot. Otherwise start where it is.
            sx[k] = intro ? mx[k] + (rand() - 0.5) * 90 * ratio : mx[k];
            sy[k] = intro ? floor - rand() * 70 * ratio : my[k];
            const across = (tx[k] - minX) / Math.max(1, maxX - minX);
            riseDelay[k] = rand() * RISE_SPREAD;
            flowDelay[k] = across * FLOW_SPREAD + rand() * 0.08;
            arc[k] = (15 + rand() * 55) * ratio;
            sway[k] = (rand() - 0.5) * 30 * ratio;
        }

        // Timeline: rise (intro only), hold (if there is a second shape), flow.
        const riseEnd = intro ? RISE + RISE_SPREAD : 0;
        const twoShapes = !intro || !!via;
        const flowStart = intro ? riseEnd + HOLD : 0;
        const total = (twoShapes ? flowStart + FLOW + FLOW_SPREAD : riseEnd) + 0.1;

        const palette = Array.from({ length: SHADES }, (_, k) => {
            const t = k / (SHADES - 1);
            const c = WATER.map((w, j) => Math.round(w + (MARIGOLD[j] - w) * t));
            return `rgb(${c[0]},${c[1]},${c[2]})`;
        });
        // Dots about as big as their spacing, so the letters read as solid shapes.
        const size = Math.max(1.4, end.gap * ratio * 0.9);
        const px = new Float32Array(n);
        const py = new Float32Array(n);
        const shade = new Uint8Array(n);

        setPhase("running");
        canvas.style.transition = "none";
        canvas.style.opacity = "1";

        let raf = 0;
        let stopped = false;
        cancel.current = () => {
            stopped = true;
            cancelAnimationFrame(raf);
            finish();
        };

        const t0 = performance.now();
        const frame = (now: number) => {
            if (stopped) return;
            const t = (now - t0) / 1000;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let k = 0; k < n; k++) {
                let x = mx[k];
                let y = my[k];
                let c = 1;
                if (intro) {
                    const p = clamp01((t - riseDelay[k]) / RISE);
                    const e = easeOutCubic(p);
                    x = sx[k] + (mx[k] - sx[k]) * e + Math.sin(p * Math.PI) * sway[k];
                    y = sy[k] + (my[k] - sy[k]) * e;
                    c = e;
                }
                if (twoShapes) {
                    const q = clamp01((t - flowStart - flowDelay[k]) / FLOW);
                    if (q > 0) {
                        const f = easeInOutCubic(q);
                        x = mx[k] + (tx[k] - mx[k]) * f;
                        y = my[k] + (ty[k] - my[k]) * f - Math.sin(q * Math.PI) * arc[k];
                    }
                }
                px[k] = x;
                py[k] = y;
                shade[k] = Math.round(c * (SHADES - 1));
            }

            // One fill colour at a time keeps this fast even with thousands of dots.
            for (let k = 0; k < SHADES; k++) {
                ctx.fillStyle = palette[k];
                for (let i = 0; i < n; i++) {
                    if (shade[i] === k) ctx.fillRect(px[i], py[i], size, size);
                }
            }

            if (t < total) {
                raf = requestAnimationFrame(frame);
            } else {
                // Arrived: bring the solid name back and let the dots fade under it.
                busy.current = false;
                setScript(to);
                setPhase("done");
                canvas.style.transition = `opacity ${SETTLE}s ease`;
                canvas.style.opacity = "0";
            }
        };
        raf = requestAnimationFrame(frame);
    };

    // Intro, once, after the fonts are in.
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setPhase("done");
            return;
        }
        let gone = false;
        document.fonts.ready.then(() => {
            if (!gone) play("en", "water");
        });
        const onResize = () => cancel.current();
        window.addEventListener("resize", onResize);
        return () => {
            gone = true;
            window.removeEventListener("resize", onResize);
            cancel.current();
        };
    }, []);

    const toggle = () => {
        if (busy.current) return;
        const next: Script = script === "en" ? "hi" : "en";
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setScript(next);
            return;
        }
        play(next, script);
    };

    return (
        <button
            ref={rootRef}
            type="button"
            onClick={toggle}
            aria-label="Nandan Pathak. Press to switch between Hindi and English."
            data-intro={phase}
            className="rise-name relative block w-full cursor-pointer text-left"
        >
            <span
                ref={(el) => {
                    layers.current.en = el;
                }}
                data-script="en"
                aria-hidden={script !== "en"}
                className="rise-layer poster block"
            >
                <span data-line className="inline-block">{LINES.en[0]}</span>
                <br />
                <span data-line className="inline-block">{LINES.en[1]}</span>
            </span>
            <span
                ref={(el) => {
                    layers.current.hi = el;
                }}
                data-script="hi"
                lang="hi"
                aria-hidden={script !== "hi"}
                className="rise-layer poster block"
                style={{ lineHeight: 0.98, letterSpacing: "-0.01em", fontSize: "0.92em" }}
            >
                <span data-line className="inline-block">{LINES.hi[0]}</span>
                <br />
                <span data-line className="inline-block">{LINES.hi[1]}</span>
            </span>
            <canvas
                ref={canvasRef}
                aria-hidden
                className="pointer-events-none absolute"
                style={{ opacity: 0, left: 0, top: 0, width: 0, height: 0 }}
            />
        </button>
    );
}
