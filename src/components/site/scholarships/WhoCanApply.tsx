import {
  BookOpenCheck,
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  RotateCcw,
  Scale,
  School,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { scholarshipsWho, type ApplicantIcon } from "@/data/scholarships";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons: Record<ApplicantIcon, LucideIcon> = {
  enrolled: GraduationCap,
  school: School,
  professional: BriefcaseBusiness,
  returning: RotateCcw,
  income: Wallet,
  first: Sparkles,
  barriers: HandHeart,
  hardship: BookOpenCheck,
};

/**
 * Who Can Apply?, on white: the heading, the document's line on who the
 * programme will aim to support and its two lines on eligibility and
 * fairness on the left; on the right the eight kinds of applicant as a
 * plain icon list, two to a row (an icon circle and the document's line,
 * nothing behind them).
 */
export function WhoCanApply() {
  return (
    <section
      id={scholarshipsWho.id}
      aria-labelledby="who-apply-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <Kicker>{scholarshipsWho.kicker}</Kicker>
            </Reveal>
            <Title
              id="who-apply-title"
              lead={scholarshipsWho.titleLead}
              accent={scholarshipsWho.titleAccent}
              inline
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 text-lead text-slate">{scholarshipsWho.lead}</p>
              <p className="mt-6 flex items-start gap-3.5 text-[0.9375rem] leading-relaxed text-ink">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600">
                  <Scale aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                </span>
                <span className="pt-1.5">{scholarshipsWho.eligibility.join(" ")}</span>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-3">
            <Reveal variant="fade">
              <p id="applicants-label" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
                {scholarshipsWho.listLabel}
              </p>
            </Reveal>
            <ul aria-labelledby="applicants-label" className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {scholarshipsWho.applicants.map((applicant, index) => {
                const Icon = icons[applicant.icon];
                return (
                  <Reveal
                    as="li"
                    key={applicant.label}
                    delay={100 + (index % 4) * 60}
                    className="group flex items-start gap-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-500 group-hover:bg-lagoon-600">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="pt-2 text-[1rem] font-semibold leading-snug text-ink">{applicant.label}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}
