import { orange } from "@/styles/brand-colours";

/**
 * The SVG gradients the orange icon and shape utilities point at
 * (`icon-orange`, `icon-orange-ink`, `stroke-orange`, `fill-orange` in
 * styles/site.css), drawn from the palette in styles/brand-colours.ts.
 * Lucide icons draw in a 24-unit box, so the icon gradients are laid out in
 * that space: a box-relative gradient would leave an icon's straight
 * horizontal and vertical strokes unpainted. Rendered once in the site
 * layout, sized to nothing rather than hidden, since a gradient inside a
 * `display: none` SVG cannot be referenced.
 */
export function OrangeGradients() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
      <defs>
        <linearGradient id="orange-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
          <Stops colours={orange.bright} />
        </linearGradient>
        <linearGradient id="orange-gradient-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
          <Stops colours={orange.ink} />
        </linearGradient>
        <linearGradient id="orange-gradient-box" x1="0" y1="0" x2="1" y2="1">
          <Stops colours={orange.bright} />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** A ramp's colours as evenly spaced stops. */
function Stops({ colours }: { colours: readonly string[] }) {
  return colours.map((colour, index) => <stop key={colour} offset={index / (colours.length - 1)} stopColor={colour} />);
}
