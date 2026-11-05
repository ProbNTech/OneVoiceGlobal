import Image from "next/image";
import { cx } from "@/lib/cx";
import { programmesScholarships } from "@/data/programmes-page";
import { logo } from "@/data/site";
import { Photo } from "../ui/Photo";
import { ArrowLink, Cta, Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/* Each phrase of the card takes one of the logo's colours in turn. */
const cardColours = ["text-ink", "text-lagoon-600", "text-ocean-600"];

/**
 * Scholarships & Educational Grants, on sand, closing the programmes before
 * the call for referrals: a short introduction to the client's scholarship
 * programme, whose own page sets it out in full. On the left a round
 * photograph of a student at work, with the programme's title line on a
 * card over its foot; on the right its headline, its opening lines, its six
 * kinds of grant as a lettered list two to a row (a letter on a white disc
 * and the grant's name, nothing behind them) and the ways through to the
 * Scholarships page.
 */
export function Scholarships() {
  const { grants, card, image } = programmesScholarships;

  return (
    <section
      id={programmesScholarships.id}
      aria-labelledby="programmes-scholarships-title"
      className="relative isolate overflow-clip bg-sand py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-x-20">
          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative order-2 mx-auto w-full max-w-md pb-12 lg:order-1 lg:col-span-5 lg:max-w-[30rem]">
            <Reveal variant="image">
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-square overflow-hidden rounded-full bg-cream">
                  <div className="reveal-media absolute inset-0">
                    <Photo image={image} sizes="(min-width: 1760px) 480px, (min-width: 1024px) 32vw, 448px" />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="up" delay={320} className="absolute bottom-0 left-0 z-10 sm:-left-4">
              <div className="flex items-center gap-4 rounded-card bg-white p-4 shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)] sm:p-5">
                <Image
                  src={logo.mark.src}
                  alt=""
                  width={logo.mark.width}
                  height={logo.mark.height}
                  className="h-11 w-auto shrink-0"
                />
                <p className="font-display text-[1.0625rem] leading-snug [font-variation-settings:'SOFT'_100] sm:text-[1.1875rem]">
                  {card.map((phrase, index) => (
                    <span
                      key={phrase}
                      className={cx("block whitespace-nowrap", cardColours[index], index > 0 && "italic font-light")}
                    >
                      {phrase}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{programmesScholarships.kicker}</Kicker>
            </Reveal>
            <Title
              id="programmes-scholarships-title"
              lead={programmesScholarships.titleLead}
              accent={programmesScholarships.titleAccent}
              className="mt-5"
            />
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lead text-ink">{programmesScholarships.lead}</p>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-slate">
                {programmesScholarships.description}
              </p>
              <p id="programmes-grants" className="mt-7 max-w-2xl text-[0.9375rem] text-slate">
                {programmesScholarships.grantsLead}
              </p>
            </Reveal>
            <ul aria-labelledby="programmes-grants" className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {grants.map((grant, index) => (
                <Reveal as="li" key={grant.letter} delay={150 + index * 55} className="group flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white font-display text-[1.125rem] text-ink transition-colors duration-500 [font-variation-settings:'SOFT'_100] group-hover:bg-orange group-hover:text-white"
                  >
                    {grant.letter}
                  </span>
                  <span className="text-[1rem] font-semibold leading-snug text-ink">{grant.name}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={200} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Cta href={programmesScholarships.primaryCta.href}>{programmesScholarships.primaryCta.label}</Cta>
              <ArrowLink href={programmesScholarships.secondaryCta.href}>
                {programmesScholarships.secondaryCta.label}
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
