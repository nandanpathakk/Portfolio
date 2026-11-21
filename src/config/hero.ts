/**
 * Which background the hero uses.
 *
 * - "dither": cream dithered waves with a marigold cursor torch (the one you liked).
 * - "tide":   a sea of points rolling toward you (the experiment).
 *
 * Change the value here to switch for good. To compare without editing, add
 * ?bg=dither or ?bg=tide to the URL, e.g. http://localhost:3000/?bg=tide
 */
export type HeroBackgroundChoice = "dither" | "tide";

export const HERO_BACKGROUND: HeroBackgroundChoice = "tide";
