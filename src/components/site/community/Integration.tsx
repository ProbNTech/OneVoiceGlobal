import Image from "next/image";
import { Check } from "lucide-react";
import { communityIntegration } from "@/data/community";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Community Integration, as the page's one full-bleed photograph: a family
 * sharing tea at home fills the band edge to edge and drifts as the page
 * scrolls, shaded only on the left where the title sits. The activities the
 * brief lists are set on a white card over the right of the picture, each
 * beside an orange tick, as the home page's partnership card sets its list.
 */
export function Integration() {
  const { image } = communityIntegration;

  return (
    <section
      id={communityIntegration.id}
      aria-labelledby="integration-title"
      className="relative isolate overflow-clip bg-navy-950 py-band text-white"
    >
      {/* The photograph carries the section's meaning, so it keeps its
          description although the copy sits over it. */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="parallax absolute inset-x-0 -inset-y-[10%]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            quality={80}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.position }}
          />
        </div>
      </div>
      {/* Even on phones, where the copy runs across the whole picture; from
          large screens a wash that is deep under the title and clear across
          the people on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-950/70 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgb(6_26_48/0.9)_0%,rgb(6_26_48/0.72)_38%,rgb(6_26_48/0.2)_70%,rgb(6_26_48/0.1)_100%)]"
      />

      <Shell>
        <div className="grid items-center gap-8 py-6 lg:min-h-[32rem] lg:grid-cols-12 lg:gap-12 lg:py-10">
          <div className="lg:col-span-6">
            <Reveal variant="fade">
              <Kicker tone="dark">{communityIntegration.kicker}</Kicker>
            </Reveal>
            <Title
              id="integration-title"
              lead={communityIntegration.titleLead}
              accent={communityIntegration.titleAccent}
              tone="dark"
              accentTone="saffron"
              className="mt-5"
            />
            <Reveal delay={150}>
              <p className="mt-6 max-w-lg text-lead text-white/85">{communityIntegration.lead}</p>
            </Reveal>
          </div>

          <Reveal variant="right" delay={200} className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-panel bg-white p-7 text-slate shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] sm:p-9">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-saffron-ink">
                {communityIntegration.listLabel}
              </p>
              <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {communityIntegration.activities.map((activity) => (
                  <li key={activity} className="flex items-center gap-3 text-[1rem] font-medium text-ink">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-saffron-500 text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
