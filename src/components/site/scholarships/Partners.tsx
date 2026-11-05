import {
  Briefcase,
  GraduationCap,
  HandHeart,
  Landmark,
  Library,
  School,
  UsersRound,
  Award,
  type LucideIcon,
} from "lucide-react";
import { scholarshipsPartners, type ScholarshipPartnerIcon } from "@/data/scholarships";
import { Photo } from "../ui/Photo";
import { Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { RunList } from "../ui/RunList";

const icons: Record<ScholarshipPartnerIcon, LucideIcon> = {
  universities: GraduationCap,
  colleges: Library,
  schools: School,
  corporate: Briefcase,
  professional: Award,
  banks: Landmark,
  philanthropists: HandHeart,
  community: UsersRound,
};

/**
 * Our Partners, on cream: the heading and the document's belief in
 * collective effort, then the eight kinds of partner as a plain icon list,
 * two to a row, and what partnerships may include as running text, with the
 * invitation and the call to become a partner. Beside them a photograph of
 * a partners' meeting, rounded into a tall capsule.
 */
export function Partners() {
  const { partners, include, image } = scholarshipsPartners;

  return (
    <section
      id={scholarshipsPartners.id}
      aria-labelledby="scholarship-partners-title"
      className="relative isolate overflow-clip bg-cream py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{scholarshipsPartners.kicker}</Kicker>
            </Reveal>
            <Title
              id="scholarship-partners-title"
              lead={scholarshipsPartners.titleLead}
              accent={scholarshipsPartners.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-slate">{scholarshipsPartners.lead}</p>
              <p
                id="scholarship-partners-list"
                className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
              >
                {scholarshipsPartners.listLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="scholarship-partners-list" className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {partners.map((partner, index) => {
                const Icon = icons[partner.icon];
                return (
                  <Reveal
                    as="li"
                    key={partner.label}
                    delay={150 + (index % 4) * 60}
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ocean-600 transition-colors duration-500 group-hover:bg-ocean-600 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[0.9375rem] font-semibold leading-snug text-ink">{partner.label}</span>
                  </Reveal>
                );
              })}
            </ul>
            <Reveal delay={150}>
              <p
                id="scholarship-partners-include"
                className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink"
              >
                {scholarshipsPartners.includeLabel}
              </p>
              <RunList
                items={include}
                labelledBy="scholarship-partners-include"
                dot="bg-lagoon-500"
                className="mt-2.5 max-w-3xl font-display text-[1.25rem] leading-[1.7] text-ink [font-variation-settings:'SOFT'_100]"
              />
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-slate">{scholarshipsPartners.invite}</p>
              <Cta href={scholarshipsPartners.cta.href} className="mt-7">
                {scholarshipsPartners.cta.label}
              </Cta>
            </Reveal>
          </div>

          <Reveal variant="image" delay={100} className="lg:col-span-5">
            <div className="mx-auto max-w-sm drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)] lg:max-w-[26rem]">
              <div className="reveal-clip relative aspect-[3/4] overflow-hidden rounded-full bg-sand">
                <div className="reveal-media absolute inset-0">
                  <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                    <Photo image={image} sizes="(min-width: 1760px) 420px, (min-width: 1024px) 28vw, 384px" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
