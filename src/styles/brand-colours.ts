/**
 * The site's orange, in one place. Change a value here and it follows
 * everywhere: the orange utilities in styles/site.css (`bg-orange`,
 * `text-orange`, `icon-orange` and the rest, through the CSS variables the
 * root layout publishes from `orangeCssVariables`), the SVG icon gradients
 * (components/site/ui/OrangeGradients.tsx) and the notification email
 * (lib/notify.ts).
 *
 * On the site orange is always a gradient (the user's rule, 30 October
 * 2026), after britononetech.com's brand gradient but brighter. Each
 * gradient runs from its light stop to its deep one, at `angle`.
 *
 * Plain values only, no `@/` imports: the email test script loads this file
 * directly with Node.
 */
export const orange = {
  angle: "135deg",
  /** The main gradient: buttons, icon discs, dots, bars, and lettering on dark bands. */
  bright: ["#ffb347", "#ff8c1a", "#ff6a00"],
  /** The orange button's hover fill, a touch deeper so its white text stays clear. */
  hover: ["#ffa133", "#ff7d0f", "#f25e00"],
  /** Paler: glows, and lettering on mid-tone grounds such as the closing banner's blue. */
  light: ["#ffd29a", "#ffb95e", "#ff9a33"],
  /** The softest tint: pale panels and the glows behind the page heroes. */
  soft: ["#fff4e6", "#ffe3c4"],
  /** Deeper: small labels on light bands, where the bright gradient would be too faint to read. */
  ink: ["#b35500", "#a84c00", "#9a4200"],
} as const;

type OrangeRamp = Exclude<keyof typeof orange, "angle">;

/**
 * The palette as CSS custom properties (`--orange-angle`, `--orange-bright-1`
 * to `-3`, `--orange-soft-1` and so on), set on the root element so
 * styles/site.css can build its gradients from them.
 */
export function orangeCssVariables(): Record<string, string> {
  const variables: Record<string, string> = { "--orange-angle": orange.angle };
  const ramps: OrangeRamp[] = ["bright", "hover", "light", "soft", "ink"];
  for (const ramp of ramps) {
    orange[ramp].forEach((colour, index) => {
      variables[`--orange-${ramp}-${index + 1}`] = colour;
    });
  }
  return variables;
}
