import Image from "next/image";
import {
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  House,
  Info,
  School,
  Smile,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { getInvolvedRefer, type ReferrerIcon } from "@/data/get-involved";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const referrerIcons: Record<ReferrerIcon, LucideIcon> = {
  community: UsersRound,
  employers: BriefcaseBusiness,
  colleges: School,
  universities: GraduationCap,
  housing: House,
  charities: HandHeart,
  health: HeartPulse,
  family: HeartHandshake,
  friends: Smile,
  self: UserRound,
};

/**
 * Refer Someone. The ten kinds of people and organisations who can refer
 * someone, as an icon list beside a photograph of an adviser at work, with
 * the brief's note on eligibility on a card over its foot. The referral
 * process follows in a section of its own (`Process`).
 */
export function Refer() {
  const { image } = getInvolvedRefer;

  return (
    <section
      id={getInvolvedRefer.id}
      aria-labelledby="refer-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <Kicker>{getInvolvedRefer.kicker}</Kicker>
            </Reveal>
            <Title
              id="refer-title"
              lead={getInvolvedRefer.titleLead}
              accent={getInvolvedRefer.titleAccent}
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 text-lead text-slate">{getInvolvedRefer.lead}</p>
            </Reveal>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {getInvolvedRefer.referrers.map((referrer, index) => {
                const Icon = referrerIcons[referrer.icon];
                return (
                  <Reveal
                    as="li"
                    key={referrer.label}
                    variant="up"
                    delay={200 + index * 50}
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-50 text-lagoon-600 transition-colors duration-500 group-hover:bg-lagoon-600 group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[1rem] font-semibold leading-snug text-ink">{referrer.label}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Photograph. The padding at the foot is the room the card hangs
              down into. */}
          <div className="relative w-full pb-10 lg:col-span-5 lg:ml-auto lg:max-w-[32rem]">
            <Reveal variant="image" delay={100}>
              {/* The shadow is a filter on a wrapper: a box-shadow on the
                  clip would be cut off at its square box. */}
              <div className="drop-shadow-[0_30px_36px_rgb(10_37_64/0.2)]">
                <div className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
                  <div className="reveal-media absolute inset-0">
                    <div className="parallax absolute inset-x-0 -inset-y-[8%]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1760px) 512px, (min-width: 1024px) 36vw, 92vw"
                        className="object-cover"
                        style={{ objectPosition: image.position }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal
              variant="up"
              delay={320}
              className="absolute bottom-0 left-0 z-10 max-w-[19rem] sm:-left-5 sm:max-w-[22rem]"
            >
              <p className="flex items-start gap-4 rounded-card bg-white p-5 text-[0.875rem] leading-relaxed text-slate shadow-[0_24px_50px_-24px_rgb(10_37_64/0.45)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <Info aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={1.7} />
                </span>
                {getInvolvedRefer.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
