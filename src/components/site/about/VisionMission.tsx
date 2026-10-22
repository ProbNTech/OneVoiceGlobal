import Image from "next/image";
import { Check } from "lucide-react";
import { cx } from "@/lib/cx";
import { aboutVisionMission, aboutVisionPanels } from "@/data/about";
import { Kicker, Shell, Title } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Vision, Mission and Purpose, each in one rounded panel: a photograph down
 * one side and the statement on the logo blue beside it, with the panel's
 * name and the Foundation's at its foot. The photograph changes sides from
 * panel to panel.
 *
 * The blue is the logo's (`ocean-700`) rather than the navy the rest of the
 * site uses for dark cards, because the Approach band directly above this
 * section is navy and three dark blocks of the same colour would run
 * together.
 */
export function VisionMission() {
  return (
    <section
      id={aboutVisionMission.id}
      aria-labelledby="vision-title"
      className="relative isolate overflow-clip bg-white py-band"
    >
      <Shell>
        <Reveal variant="fade">
          <Kicker>{aboutVisionMission.kicker}</Kicker>
        </Reveal>
        <Title
          id="vision-title"
          lead={aboutVisionMission.titleLead}
          accent={aboutVisionMission.titleAccent}
          className="mt-5 max-w-5xl"
        />

        <div className="mt-6 space-y-4 lg:mt-8">
          {aboutVisionPanels.map((panel, index) => {
            // The photograph changes sides; on phones it always leads.
            const photoRight = index % 2 === 1;
            return (
              <Reveal key={panel.label} variant="up" delay={index * 90}>
                <div className="grid overflow-hidden rounded-panel bg-ocean-700 lg:grid-cols-12">
                  <div
                    className={cx(
                      "relative min-h-[13rem] overflow-hidden bg-ocean-700 lg:col-span-4",
                      photoRight && "lg:order-2",
                    )}
                  >
                    <Image
                      src={panel.image.src}
                      alt={panel.image.alt}
                      fill
                      sizes="(min-width: 1760px) 580px, (min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: panel.image.position }}
                    />
                  </div>

                  <div className={cx("flex flex-col p-6 sm:p-8 lg:col-span-8 lg:p-9", photoRight && "lg:order-1")}>
                    <p className="max-w-5xl text-[clamp(1.25rem,1.7vw,1.75rem)] leading-[1.45] text-white">
                      {panel.statement}
                    </p>

                    {panel.commitments ? (
                      <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {panel.commitments.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-[1.0625rem] text-white">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-saffron-500 text-navy-950">
                              <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {/* Pushed to the foot of the panel, as the reference sets it. */}
                    <div className="mt-auto pt-6 text-right">
                      <p className="text-[1.0625rem] font-bold text-white">{panel.label}</p>
                      <p className="mt-0.5 text-[0.75rem] font-semibold text-saffron-300">
                        {aboutVisionMission.attribution}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
