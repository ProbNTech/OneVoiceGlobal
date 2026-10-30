import { Kicker } from "../ui/primitives";

/**
 * The label above each of the seven events: the event's place in the
 * calendar, then its name, so a reader always knows where they are in the
 * year.
 */
export function EventKicker({
  number,
  name,
  tone = "light",
  className,
}: {
  number: string;
  name: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Kicker tone={tone} className={className}>
      <span className="tabular-nums">{number}</span>
      <span aria-hidden="true" className="-mx-1 opacity-50">
        /
      </span>
      {name}
    </Kicker>
  );
}
