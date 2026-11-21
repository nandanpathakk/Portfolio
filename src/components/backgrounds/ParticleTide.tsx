"use client";

/**
 * ParticleTide: a sea made of points, seen from a low camera, rolling toward
 * the viewer. Written for this site, in plain WebGL2 (no libraries).
 *
 * Two layers of water:
 *
 * 1. The swell. Every point is placed from its index alone (gl_VertexID) and
 *    moved with Gerstner waves: each bit of water travels in a small circle,
 *    so points crowd into sharp crests and spread out in the troughs, and
 *    longer waves travel faster (deep-water dispersion).
 *
 * 2. Ripples. A patch of water in front of the camera is simulated on the
 *    GPU as a real height field (the 2D wave equation, solved on a grid every
 *    frame). The cursor presses into it like a fingertip dragged through
 *    water, so ripples spread from it, trail behind it as a wake, overlap and
 *    fade on their own. A click is a drop. The points read the ripple height
 *    and slope from that grid in the same frame, so there is no lag.
 */

import { useEffect, useRef, type CSSProperties } from "react";

export interface ParticleTideProps {
    /** Water colour away from the light. */
    bodyColor?: string;
    /** Colour of glints, crests and foam. */
    crestColor?: string;
    /** Colour of the ripples and the glow under the cursor. */
    accentColor?: string;
    /** Points across × points deep, for wide and narrow screens. */
    density?: { wide: [number, number]; narrow: [number, number] };
    /** Scales how tall the swells are. */
    waveHeight?: number;
    /** 0 = rounded swells, 1 = sharp crests that start to break. */
    steepness?: number;
    /** Scales every wavelength. */
    wavelength?: number;
    /** Radians. 0 = waves come straight at the viewer. */
    windAngle?: number;
    /** Where the horizon sits, 0 = top of the frame, 0.5 = middle. */
    horizon?: number;
    fog?: number;
    glow?: number;
    foam?: number;
    /** 1 = real time for this scale of water. Lower is calmer. */
    speed?: number;
    pointSize?: number;
    interactive?: boolean;
    /** How far the view drifts toward the pointer. */
    parallax?: number;
    /** How hard the cursor presses into the water. */
    rippleStrength?: number;
    /** How tall ripples look on the points. */
    rippleHeight?: number;
    /** Size of the fingertip, in world units. */
    fingerRadius?: number;
    /** 0..1, how bright the soft glow under the cursor is. */
    cursorGlow?: number;
    clickRipples?: boolean;
    dpr?: number;
    className?: string;
    style?: CSSProperties;
}

/* The simulated patch of water, in world units. The camera sits at x = 0,
   z = 0 and looks toward -z; this covers what the cursor can reach. */
const SIM = { x0: -9, x1: 9, z0: -17, z1: -1, cols: 320, rows: 284 };
const SIM_HZ = 60; // fixed simulation rate, independent of the display's frame rate
/** How often the fingertip bobs. Sets the spacing of the rings (about 0.4 world units). */
const RIPPLE_HZ = 4.5;
const RESTING_PRESS = 0.06;

const SIM_VERTEX = `#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

/* One step of the wave equation. r = height now, g = height one step ago,
   b = a slow running average of how much the water moves here (drives the
   colour, so it glows steadily instead of blinking with every ring).
   The fingertip is a soft dent swept along the segment the cursor moved
   through since the last step, so fast moves leave an unbroken wake. */
const SIM_FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform vec4 uWorld;     // x0, z0, width, depth of the patch
uniform vec2 uA;         // fingertip: start of this step's stroke (world x, z)
uniform vec2 uB;         // fingertip: end of this step's stroke
uniform float uPress;    // how hard the fingertip pushes this step
uniform float uRadius;
uniform vec3 uDrop;      // world x, world z, strength (a click)
uniform float uDamp;
out vec4 outState;

float segmentDistance(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * t);
}

void main() {
  vec3 s = texture(uState, vUv).rgb;
  vec3 nL = texture(uState, vUv - vec2(uTexel.x, 0.0)).rgb;
  vec3 nR = texture(uState, vUv + vec2(uTexel.x, 0.0)).rgb;
  vec3 nB = texture(uState, vUv - vec2(0.0, uTexel.y)).rgb;
  vec3 nF = texture(uState, vUv + vec2(0.0, uTexel.y)).rgb;
  float next = ((nL.r + nR.r + nB.r + nF.r) * 0.5 - s.g) * uDamp;

  // Pushes are volume-neutral, like real water: a dent with a raised rim
  // around it (a narrow bell minus half a bell twice as wide, which cancel
  // out in total). Without this, every push would add up into one slow,
  // shapeless bulge instead of clean rings.
  vec2 world = uWorld.xy + vUv * uWorld.zw;
  float r2 = uRadius * uRadius;
  float d = segmentDistance(world, uA, uB);
  next -= uPress * (exp(-(d * d) / r2) - 0.5 * exp(-(d * d) / (2.0 * r2)));
  float dd = distance(world, uDrop.xy);
  float R2 = r2 * 3.0;
  next -= uDrop.z * (exp(-(dd * dd) / R2) - 0.5 * exp(-(dd * dd) / (2.0 * R2)));

  // Soak up ripples at the edges of the patch instead of bouncing them back.
  vec2 e = min(vUv, 1.0 - vUv);
  float edge = smoothstep(0.0, 0.06, min(e.x, e.y));
  float energyAround = mix(s.b, (nL.b + nR.b + nB.b + nF.b) * 0.25, 0.5);
  float energy = energyAround + (abs(next) - energyAround) * 0.06;
  outState = vec4(next * edge, s.r * edge, energy * edge, 1.0);
}`;

const VERTEX = `#version 300 es
precision highp float;

uniform vec2 uGrid;        // columns, rows
uniform float uTime;
uniform float uAspect;
uniform float uTanHalf;
uniform float uPitch;      // camera tilt down, radians
uniform vec3 uCam;         // camera position
uniform float uNear;
uniform float uFar;
uniform float uDpr;
uniform float uSize;
uniform float uHeight;
uniform float uSteep;
uniform float uLength;
uniform float uWind;
uniform float uFog;
uniform float uGlow;
uniform float uFoam;
uniform vec3 uBody;
uniform vec3 uCrest;
uniform vec3 uAccent;
uniform sampler2D uRipples;
uniform vec4 uWorld;       // x0, z0, width, depth of the ripple patch
uniform vec2 uTexel;
uniform float uRippleHeight;
uniform float uHasRipples;
uniform vec4 uCursor;      // world x, world z, presence 0..1, glow
uniform float uFinger;
uniform float uSimAlpha;   // 0..1: how far between the last two simulation steps this frame falls

out vec4 vColor;

const float G = 9.8;
const int WAVES = 6;

float hash(float n) { return fract(sin(n) * 43758.5453123); }

void swellParams(int i, out float len, out float amp, out float angle, out float phase) {
  float lens[6] = float[6](6.0, 3.9, 2.6, 1.7, 1.1, 0.72);
  float spread[6] = float[6](0.0, 0.32, -0.41, 0.63, -0.78, 0.22);
  len = lens[i] * uLength;
  amp = len * 0.032 * uHeight;
  angle = uWind + spread[i];
  phase = float(i) * 1.913;
}

void main() {
  float id = float(gl_VertexID);
  float col = mod(id, uGrid.x);
  float row = floor(id / uGrid.x);

  float jx = hash(id * 1.37) - 0.5;
  float jy = hash(id * 2.71) - 0.5;
  float u = (col + 0.5 + jx) / uGrid.x;
  float v = (row + 0.5 + jy) / uGrid.y;

  // Rows are spaced evenly by viewing angle, so they spread evenly on screen.
  float aNear = atan(uCam.y / uNear);
  float aFar = atan(uCam.y / uFar);
  float dist = uCam.y / tan(mix(aNear, aFar, pow(v, 0.85)));
  float halfWidth = dist * uTanHalf * uAspect * 1.35 + 2.0;
  vec2 p = vec2(uCam.x + (u - 0.5) * 2.0 * halfWidth, -dist);

  // The swell: Gerstner waves.
  vec3 pos = vec3(p.x, 0.0, p.y);
  vec3 n = vec3(0.0, 1.0, 0.0);
  float fold = 1.0;
  for (int i = 0; i < WAVES; i++) {
    float len, amp, angle, ph;
    swellParams(i, len, amp, angle, ph);
    vec2 d = vec2(sin(angle), cos(angle));
    float k = 6.2831853 / len;
    float w = sqrt(G * k);
    float q = uSteep / (k * amp * float(WAVES) + 0.0001);
    float th = k * dot(d, p) - w * uTime + ph;
    float c = cos(th), s = sin(th);
    pos.x += q * amp * d.x * c;
    pos.z += q * amp * d.y * c;
    pos.y += amp * s;
    n.x -= d.x * k * amp * c;
    n.z -= d.y * k * amp * c;
    n.y -= q * k * amp * s;
    fold -= q * k * amp * s;
  }

  // Ripples from the simulation, read at this point's rest position.
  float ripple = 0.0;
  float rippleEnergy = 0.0;
  if (uHasRipples > 0.5) {
    vec2 uv = (p - uWorld.xy) / uWorld.zw;
    if (all(greaterThan(uv, vec2(0.0))) && all(lessThan(uv, vec2(1.0)))) {
      // Each texel holds the height now (r) and one step ago (g). Blending
      // them by how far this frame sits between steps keeps the motion smooth
      // on any refresh rate, 60Hz or 120Hz.
      vec3 c = textureLod(uRipples, uv, 0.0).rgb;
      float hC = mix(c.g, c.r, uSimAlpha);
      float hL = dot(textureLod(uRipples, uv - vec2(uTexel.x, 0.0), 0.0).rg, vec2(uSimAlpha, 1.0 - uSimAlpha));
      float hR = dot(textureLod(uRipples, uv + vec2(uTexel.x, 0.0), 0.0).rg, vec2(uSimAlpha, 1.0 - uSimAlpha));
      float hB = dot(textureLod(uRipples, uv - vec2(0.0, uTexel.y), 0.0).rg, vec2(uSimAlpha, 1.0 - uSimAlpha));
      float hF = dot(textureLod(uRipples, uv + vec2(0.0, uTexel.y), 0.0).rg, vec2(uSimAlpha, 1.0 - uSimAlpha));
      vec2 cell = uWorld.zw * uTexel;
      vec2 slope = vec2(hR - hL, hF - hB) / (2.0 * cell) * uRippleHeight;
      rippleEnergy = c.b;
      // Right under the fingertip the water is being pushed up and down every
      // step, which reads as the surface flickering or sinking under the
      // cursor. Hide that small patch: the rings start just outside it.
      float fromTip = distance(p, uCursor.xy);
      float calm = mix(1.0, smoothstep(uFinger * 1.5, uFinger * 4.5, fromTip), uCursor.z);
      hC *= calm;
      slope *= calm;
      ripple = hC * uRippleHeight;
      pos.y += ripple;
      // Ripples tilt the surface gently. At full strength they would flick the
      // moon's reflection on and off point by point, which reads as flicker.
      n.xz -= slope * 0.3;
    }
  }
  n = normalize(n);

  // Light: a low moon out at the horizon. Slopes that tip it toward the camera glint.
  vec3 toCam = normalize(uCam - pos);
  vec3 toLight = normalize(vec3(0.15, 0.32, -1.0));
  float glint = pow(max(dot(reflect(-toLight, n), toCam), 0.0), 18.0);
  float height = clamp(pos.y / (uHeight * 0.35) * 0.5 + 0.5, 0.0, 1.0);
  float light = clamp(glint * 1.6 + pow(height, 3.0) * 0.55, 0.0, 1.0) * uGlow;
  float foam = smoothstep(0.45, 0.1, fold) * uFoam;

  vec3 colour = mix(uBody, uCrest, clamp(light, 0.0, 1.0));
  colour = mix(colour, uCrest, foam);

  // Marigold: the ripples themselves, plus a small soft glow where the fingertip is.
  // Colour follows the running average of ripple activity: a steady glow
  // where the water is disturbed, fading as it calms. No per-ring blinking.
  float rippleTint = smoothstep(0.006, 0.022, rippleEnergy);
  float r = distance(p, uCursor.xy);
  float halo = uCursor.z * uCursor.w * exp(-(r * r) / (uFinger * uFinger * 9.0));
  float tint = clamp(rippleTint + halo, 0.0, 1.0);
  colour = mix(colour, uAccent, tint * 0.85);

  // Project. World -> view: translate by the camera, then tilt down by uPitch.
  vec3 wv = pos - uCam;
  float cp = cos(uPitch), sp = sin(uPitch);
  vec3 view = vec3(wv.x, wv.y * cp - wv.z * sp, wv.y * sp + wv.z * cp);
  float depth = -view.z;
  float f = 1.0 / uTanHalf;
  gl_Position = vec4(view.x * f / uAspect, view.y * f, 0.0, depth);

  float fog = exp(-pow(dist / uFar * uFog * 2.2, 1.5)) * smoothstep(uFar, uFar * 0.6, dist);
  float alpha = (0.28 + 0.72 * max(max(light, foam), tint * 0.85)) * fog;
  vColor = vec4(colour, alpha);

  float size = uSize * uDpr * clamp(2.6 / dist, 0.85, 1.8);
  gl_PointSize = size * (1.0 + foam * 0.3);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
in vec4 vColor;
out vec4 outColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d) * vColor.a;
  outColor = vec4(vColor.rgb * a, a);
}`;

const hexToRgb = (hex: string): [number, number, number] => {
    const clean = hex.replace("#", "");
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
    const n = parseInt(full, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("ParticleTide shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function link(gl: WebGL2RenderingContext, vsSource: string, fsSource: string) {
    const vs = compile(gl, gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn("ParticleTide link:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

export default function ParticleTide({
    bodyColor = "#77727f",
    crestColor = "#f3ecdc",
    accentColor = "#ffb319",
    density = { wide: [620, 340], narrow: [300, 230] },
    waveHeight = 1,
    steepness = 0.62,
    wavelength = 1,
    windAngle = 0.12,
    horizon = 0.2,
    fog = 1,
    glow = 1.4,
    foam = 0.7,
    speed = 0.32,
    pointSize = 1.6,
    interactive = true,
    parallax = 0.25,
    rippleStrength = 1,
    rippleHeight = 0.6,
    fingerRadius = 0.1,
    cursorGlow = 0.55,
    clickRipples = true,
    dpr = 1.5,
    className = "",
    style,
}: ParticleTideProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Props are read through a ref, so the effect below runs once.
    const settings = {
        bodyColor, crestColor, accentColor, density, waveHeight, steepness, wavelength,
        windAngle, horizon, fog, glow, foam, speed, pointSize, interactive, parallax,
        rippleStrength, rippleHeight, fingerRadius, cursorGlow, clickRipples, dpr,
    };
    const settingsRef = useRef(settings);
    settingsRef.current = settings;

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false });
        if (!gl) return;

        const program = link(gl, VERTEX, FRAGMENT);
        if (!program) return;
        const U = (name: string) => gl.getUniformLocation(program, name);
        const u = {
            grid: U("uGrid"), time: U("uTime"), aspect: U("uAspect"), tanHalf: U("uTanHalf"),
            pitch: U("uPitch"), cam: U("uCam"), near: U("uNear"), far: U("uFar"), dpr: U("uDpr"),
            size: U("uSize"), height: U("uHeight"), steep: U("uSteep"), length: U("uLength"),
            wind: U("uWind"), fog: U("uFog"), glow: U("uGlow"), foam: U("uFoam"),
            body: U("uBody"), crest: U("uCrest"), accent: U("uAccent"),
            ripples: U("uRipples"), world: U("uWorld"), texel: U("uTexel"),
            rippleHeight: U("uRippleHeight"), hasRipples: U("uHasRipples"),
            cursor: U("uCursor"), finger: U("uFinger"), simAlpha: U("uSimAlpha"),
        };

        // No vertex data: every point and the simulation quad are built from their index.
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

        /* ---------- Ripple simulation (skipped where the GPU can't render to float textures) ---------- */
        const canFloat = !!gl.getExtension("EXT_color_buffer_float") || !!gl.getExtension("EXT_color_buffer_half_float");
        const simProgram = !reduce && canFloat ? link(gl, SIM_VERTEX, SIM_FRAGMENT) : null;
        type Target = { tex: WebGLTexture; fbo: WebGLFramebuffer };
        let targets: Target[] = [];
        if (simProgram) {
            for (let i = 0; i < 2; i++) {
                const tex = gl.createTexture()!;
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, SIM.cols, SIM.rows, 0, gl.RGBA, gl.HALF_FLOAT, null);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                const fbo = gl.createFramebuffer()!;
                gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                targets.push({ tex, fbo });
            }
            const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            if (!ok) targets = [];
        }
        const hasSim = !!simProgram && targets.length === 2;
        const S = simProgram
            ? {
                  state: gl.getUniformLocation(simProgram, "uState"),
                  texel: gl.getUniformLocation(simProgram, "uTexel"),
                  world: gl.getUniformLocation(simProgram, "uWorld"),
                  a: gl.getUniformLocation(simProgram, "uA"),
                  b: gl.getUniformLocation(simProgram, "uB"),
                  press: gl.getUniformLocation(simProgram, "uPress"),
                  radius: gl.getUniformLocation(simProgram, "uRadius"),
                  drop: gl.getUniformLocation(simProgram, "uDrop"),
                  damp: gl.getUniformLocation(simProgram, "uDamp"),
              }
            : null;
        let current = 0; // which target holds the latest state
        const worldRect = [SIM.x0, SIM.z0, SIM.x1 - SIM.x0, SIM.z1 - SIM.z0] as const;

        /* ---------- Camera ---------- */
        const FOV = (50 * Math.PI) / 180;
        const tanHalf = Math.tan(FOV / 2);
        const camY = 1.55;
        const near = 1.6;
        const far = 60;

        const view = { width: 1, height: 1, ratio: 1, aspect: 1, cols: 1, rows: 1 };
        const pointer = { nx: 0, ny: 0, inside: false };
        const state = { time: 0, camX: 0, camTarget: 0, simClock: 0, presence: 0 };
        // The fingertip: where it was at the last simulation step, and where it is now.
        const finger = { x: 0, z: 0, px: 0, pz: 0, on: false, phase: 0 };
        const pendingDrops: { x: number; z: number }[] = [];

        const pitch = () => Math.atan((1 - 2 * settingsRef.current.horizon) * tanHalf);

        // Where a point on screen (NDC) meets the water, or null above the horizon.
        const toWater = (nx: number, ny: number): [number, number] | null => {
            const th = pitch();
            const dx = nx * tanHalf * view.aspect;
            const dy = ny * tanHalf;
            const wy = dy * Math.cos(th) - Math.sin(th);
            const wz = -dy * Math.sin(th) - Math.cos(th);
            if (wy >= -0.0001) return null;
            const t = -camY / wy;
            return [state.camX + dx * t, wz * t];
        };

        const resize = () => {
            const s = settingsRef.current;
            const width = Math.max(1, container.clientWidth);
            const height = Math.max(1, container.clientHeight);
            const ratio = Math.min(s.dpr, window.devicePixelRatio || 1);
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            view.width = width;
            view.height = height;
            view.ratio = ratio;
            view.aspect = width / height;
            [view.cols, view.rows] = width >= 768 ? s.density.wide : s.density.narrow;
            draw();
        };

        /** One fixed step of the ripple simulation. */
        const simStep = (press: number, drop: { x: number; z: number } | null) => {
            if (!hasSim || !simProgram || !S) return;
            const s = settingsRef.current;
            const src = targets[current];
            const dst = targets[1 - current];
            gl.useProgram(simProgram);
            gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
            gl.viewport(0, 0, SIM.cols, SIM.rows);
            gl.disable(gl.BLEND);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, src.tex);
            gl.uniform1i(S.state, 0);
            gl.uniform2f(S.texel, 1 / SIM.cols, 1 / SIM.rows);
            gl.uniform4f(S.world, ...worldRect);
            gl.uniform2f(S.a, finger.px, finger.pz);
            gl.uniform2f(S.b, finger.x, finger.z);
            gl.uniform1f(S.press, press);
            gl.uniform1f(S.radius, s.fingerRadius);
            gl.uniform3f(S.drop, drop?.x ?? 0, drop?.z ?? 0, drop ? 0.5 * s.rippleStrength : 0);
            gl.uniform1f(S.damp, 0.972);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            current = 1 - current;
            finger.px = finger.x;
            finger.pz = finger.z;
        };

        const draw = () => {
            const s = settingsRef.current;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.bindVertexArray(vao);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, hasSim ? targets[current].tex : null);
            gl.uniform1i(u.ripples, 0);
            gl.uniform1f(u.hasRipples, hasSim ? 1 : 0);
            gl.uniform4f(u.world, ...worldRect);
            gl.uniform2f(u.texel, 1 / SIM.cols, 1 / SIM.rows);
            gl.uniform1f(u.rippleHeight, s.rippleHeight);
            gl.uniform4f(u.cursor, finger.x, finger.z, state.presence, s.cursorGlow);
            gl.uniform1f(u.finger, s.fingerRadius);
            gl.uniform1f(u.simAlpha, hasSim ? Math.min(1, state.simClock * SIM_HZ) : 1);

            gl.uniform2f(u.grid, view.cols, view.rows);
            gl.uniform1f(u.time, state.time);
            gl.uniform1f(u.aspect, view.aspect);
            gl.uniform1f(u.tanHalf, tanHalf);
            gl.uniform1f(u.pitch, pitch());
            gl.uniform3f(u.cam, state.camX, camY, 0);
            gl.uniform1f(u.near, near);
            gl.uniform1f(u.far, far);
            gl.uniform1f(u.dpr, view.ratio);
            gl.uniform1f(u.size, s.pointSize);
            gl.uniform1f(u.height, s.waveHeight);
            gl.uniform1f(u.steep, s.steepness);
            gl.uniform1f(u.length, s.wavelength);
            gl.uniform1f(u.wind, s.windAngle);
            gl.uniform1f(u.fog, s.fog);
            gl.uniform1f(u.glow, s.glow);
            gl.uniform1f(u.foam, s.foam);
            gl.uniform3fv(u.body, hexToRgb(s.bodyColor));
            gl.uniform3fv(u.crest, hexToRgb(s.crestColor));
            gl.uniform3fv(u.accent, hexToRgb(s.accentColor));

            gl.drawArrays(gl.POINTS, 0, view.cols * view.rows);
        };

        let raf = 0;
        let last = 0;
        let visible = true;

        const frame = (now: number) => {
            raf = 0;
            if (!visible || document.hidden) return;
            const s = settingsRef.current;
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
            last = now;
            state.time += dt * s.speed;

            // The fingertip follows the cursor exactly: no easing, no lag.
            const engaged = s.interactive && fine && pointer.inside;
            const hit = engaged ? toWater(pointer.nx, pointer.ny) : null;
            if (hit) {
                if (!finger.on) {
                    finger.px = hit[0];
                    finger.pz = hit[1];
                }
                finger.x = hit[0];
                finger.z = hit[1];
            }
            const wasOn = finger.on;
            finger.on = !!hit;
            state.presence += ((hit ? 1 : 0) - state.presence) * (1 - Math.exp(-dt / 0.12));

            // Fixed-rate simulation steps for the time that passed (at most 3 per frame).
            if (hasSim) {
                state.simClock += dt;
                const steps = Math.min(3, Math.floor(state.simClock * SIM_HZ));
                state.simClock -= steps / SIM_HZ;
                for (let i = 0; i < steps; i++) {
                    let press = 0;
                    if (finger.on) {
                        // A fingertip resting on water is never perfectly still: it
                        // bobs a few times a second, and each bob sends out a ring.
                        // Moving makes it press harder, so the rings bunch up ahead
                        // of it and stretch out behind it as a wake.
                        const moved = Math.hypot(finger.x - finger.px, finger.z - finger.pz);
                        finger.phase += 1 / SIM_HZ;
                        const bob = Math.sin(finger.phase * Math.PI * 2 * RIPPLE_HZ);
                        const touchDown = wasOn ? 0 : 0.08; // first contact: a little splash
                        press = ((RESTING_PRESS + Math.min(moved * 1.2, 0.12)) * bob + touchDown) * s.rippleStrength;
                    }
                    simStep(press, i === 0 ? pendingDrops.shift() ?? null : null);
                }
            }

            state.camTarget = engaged ? pointer.nx * s.parallax : 0;
            state.camX += (state.camTarget - state.camX) * (1 - Math.exp(-dt / 1.4));

            draw();
            raf = requestAnimationFrame(frame);
        };
        const wake = () => {
            if (reduce) return;
            if (!raf && visible && !document.hidden) {
                last = 0;
                raf = requestAnimationFrame(frame);
            }
        };

        const locate = (event: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            pointer.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
            pointer.nx = (x / rect.width) * 2 - 1;
            pointer.ny = 1 - (y / rect.height) * 2;
        };
        const onMove = (event: PointerEvent) => {
            if (event.pointerType === "mouse") locate(event);
        };
        const onDown = (event: PointerEvent) => {
            const s = settingsRef.current;
            if (!s.clickRipples || !hasSim) return;
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
            const hit = toWater((x / rect.width) * 2 - 1, 1 - (y / rect.height) * 2);
            if (hit) pendingDrops.push({ x: hit[0], z: hit[1] });
        };
        const onLeave = () => {
            pointer.inside = false;
        };
        const onVisibility = () => wake();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        const io = new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
            if (visible) wake();
        });
        io.observe(container);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        document.addEventListener("visibilitychange", onVisibility);

        resize();
        if (reduce) {
            state.time = 12;
            draw();
        } else {
            wake();
        }

        return () => {
            cancelAnimationFrame(raf);
            resizeObserver.disconnect();
            io.disconnect();
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            document.documentElement.removeEventListener("pointerleave", onLeave);
            document.removeEventListener("visibilitychange", onVisibility);
            gl.deleteProgram(program);
            if (simProgram) gl.deleteProgram(simProgram);
            for (const t of targets) {
                gl.deleteTexture(t.tex);
                gl.deleteFramebuffer(t.fbo);
            }
            gl.deleteVertexArray(vao);
        };
    }, []);

    return (
        <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`} style={style}>
            <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block h-full w-full" />
        </div>
    );
}
