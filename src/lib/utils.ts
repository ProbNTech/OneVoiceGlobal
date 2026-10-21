/**
 * Class-name merge helper.
 *
 * `cn` is re-exported from the compiled `cn` package that the shadcn/ui
 * "radix-nova" preset installs — a drop-in replacement for `clsx` +
 * `tailwind-merge`. shadcn components import it from here (`@/lib/utils`), so
 * this module is the single, stable import path for the whole project.
 */
export { cn } from "cn";
