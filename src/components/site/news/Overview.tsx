import Link from "next/link";
import { ArrowUpRight, BookOpen, Briefcase, CalendarDays, Newspaper, Sparkles, type LucideIcon } from "lucide-react";
import { newsKinds, type KindIcon } from "@/data/news";
import { Photo } from "../ui/Photo";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<KindIcon, LucideIcon> = {
  news: Newspaper,
  events: CalendarDays,
  opportunities: Briefcase,
  resources: BookOpen,
  stories: Sparkles,
};

/**
 * What the site provides, on cream: the block's five kinds of content as an
 * index, each a whole row that links to where that content lives, with its
 * number, name in the display face and the block's line for it, and an
 * arrow that slides on hover. Beside it, a photograph under an arched top.
 */
export function Overview() {
  return (
    <section
      id={newsKinds.id}
      aria-labelledby="news-kinds-title"
      className="relative isolate scroll-mt-20 overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-[32rem]">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                {/* A true semicircle for the 4:5 frame (see about/Team.tsx). */}
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-b-[2rem] bg-sand [border-top-left-radius:50%_40%] [border-top-right-radius:50%_40%]">
                  <div className="reveal-media absolute inset-0">
                    <Photo image={newsKinds.image} sizes="(min-width: 1760px) 512px, (min-width: 1024px) 34vw, 448px" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{newsKinds.kicker}</Kicker>
            </Reveal>
            <Title id="news-kinds-title" lead={newsKinds.titleLead} accent={newsKinds.titleAccent} className="mt-5" />
            <Reveal delay={120}>
              <p className="mt-6 text-lead text-slate">{newsKinds.lead}</p>
            </Reveal>

            <ol className="mt-6">
              {newsKinds.kinds.map((kind, index) => {
                const Icon = icons[kind.icon];
                return (
                  <Reveal as="li" key={kind.name} delay={160 + index * 80}>
                    <Link
                      href={kind.href}
                      className="group flex items-center gap-4 rounded-card py-3.5 transition-colors duration-500 sm:gap-6"
                    >
                      <span className="w-8 shrink-0 font-display text-[1.25rem] text-ocean-600/60 [font-variation-settings:'SOFT'_100]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-lagoon-600 shadow-[0_10px_24px_-14px_rgb(10_37_64/0.45)] transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[1.375rem] leading-tight text-ink [font-variation-settings:'SOFT'_100] sm:text-[1.5rem]">
                          {kind.name}
                        </span>
                        <span className="mt-1 block text-[0.9375rem] leading-relaxed text-slate">{kind.line}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lagoon-600"
                        strokeWidth={1.6}
                      />
                    </Link>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </Shell>
    </section>
  );
}
