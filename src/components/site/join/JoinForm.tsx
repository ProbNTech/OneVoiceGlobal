"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { ArrowRight, CircleAlert, MessageCircle, Phone } from "lucide-react";
import { joinOneVoice, type JoinState } from "@/app/(site)/join/actions";
import { joinForm, joinThanks } from "@/data/join";
import { cx } from "@/lib/cx";
import { CtaButton, Title } from "../ui/primitives";

const initialState: JoinState = { status: "idle" };

/**
 * The sign-up form: name, mobile number, WhatsApp number (with a tick box
 * for "same as my mobile"), an optional email so the welcome can be sent,
 * what the person is interested in, and the consent tick box. Fields are
 * checked on the server (../../../app/(site)/join/actions.ts) and each
 * message sits under its field; what was entered stays in place when a try
 * does not go through.
 *
 * Once the details are in, the thank-you opens as a panel in the middle of
 * the screen, over an even shade that covers the page behind it, so the
 * only thing left to do is join the group: WhatsApp lets nobody but the
 * person themselves join a group, so it has to be a link they tap.
 */
export function JoinForm() {
  const [state, formAction, pending] = useActionState(joinOneVoice, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  // After a try with mistakes, take the reader to the first one.
  useEffect(() => {
    if (state.status !== "invalid") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  const sent = state.status === "sent";

  return (
    <>
      {sent ? <Thanks name={values.name ?? ""} /> : null}
      <form ref={formRef} action={formAction} noValidate className="relative" aria-hidden={sent || undefined}>
        <div className="p-6 sm:p-9 lg:p-10">
          {/* The panel carries its own heading: it stands in the hero, beside
            the page's headline, with no band heading of its own above it. */}
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">{joinForm.kicker}</p>
          <p className="mt-3 font-display text-[1.75rem] font-normal leading-tight text-ink [font-variation-settings:'SOFT'_100]">
            {joinForm.titleLead} <span className="font-light italic text-lagoon-600">{joinForm.titleAccent}</span>
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{joinForm.lead}</p>

          <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
            <Field
              name="name"
              label={joinForm.fields.name}
              autoComplete="name"
              defaultValue={values.name}
              error={errors.name}
              className="sm:col-span-2"
            />
            <Field
              name="mobile"
              type="tel"
              label={joinForm.fields.mobile}
              autoComplete="tel"
              defaultValue={values.mobile}
              error={errors.mobile}
            />
            <Field
              name="whatsapp"
              type="tel"
              label={joinForm.fields.whatsapp}
              defaultValue={values.whatsapp}
              optional
            />
            <div className="sm:col-span-2 -mt-1">
              <Tick name="sameNumber" defaultChecked={false}>
                {joinForm.fields.whatsappSame}
              </Tick>
            </div>
            <Field
              name="email"
              type="email"
              label={joinForm.fields.email}
              autoComplete="email"
              defaultValue={values.email}
              error={errors.email}
              optional
            />
            <div>
              <label
                htmlFor="join-interest"
                className="flex items-baseline justify-between gap-3 text-[0.875rem] font-semibold text-ink"
              >
                {joinForm.fields.interest}
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
                  {joinForm.fields.optional}
                </span>
              </label>
              <select
                id="join-interest"
                name="interest"
                defaultValue={values.interest ?? ""}
                className="mt-2 h-13 w-full cursor-pointer rounded-2xl bg-cream px-4 text-[1rem] text-ink ring-1 ring-inset ring-line transition-[background-color,box-shadow] duration-300 hover:ring-ink/25 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lagoon-600"
              >
                <option value="">{joinForm.fields.choose}</option>
                {joinForm.interests.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-7">
            <Tick name="consent" error={errors.consent} defaultChecked={Boolean(values.consent)}>
              {joinForm.consent}
            </Tick>
          </div>

          {/* Kept out of sight and out of the tab order: see actions.ts. */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[0.875rem] leading-relaxed text-ink-muted">
              {joinForm.privacy}{" "}
              <a
                href={joinForm.privacyLink.href}
                className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
              >
                {joinForm.privacyLink.label}
              </a>
            </p>
            <CtaButton disabled={pending} className="shrink-0">
              {pending ? joinForm.sending : joinForm.submit}
            </CtaButton>
          </div>

          <p role="status" className={cx("text-[0.9375rem] font-medium", state.status !== "idle" && "mt-5")}>
            {state.status === "invalid" ? (
              <span className="flex items-start gap-2.5 text-red-700">
                <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                {joinForm.errors.summary}
              </span>
            ) : state.status === "failed" ? (
              <span className="flex items-start gap-2.5 text-red-700">
                <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                {joinForm.status.failed}
              </span>
            ) : null}
          </p>
        </div>

        <p className="flex items-center gap-3.5 rounded-b-panel bg-orange-soft px-6 py-4 text-[0.9375rem] leading-snug text-ink sm:px-9 lg:px-10">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange text-white"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
          </span>
          {joinForm.emergency}
        </p>
      </form>
    </>
  );
}

/**
 * The thank-you, in the panel's place: the welcome, the three next steps,
 * and the WhatsApp group as a large button. The group link opens WhatsApp
 * itself, so it is a plain link, not one of the site's page links.
 */
/**
 * The thank-you, as a panel in the middle of the screen over an even shade
 * that covers the page behind it. It opens as soon as the details are in,
 * so the group button is the only thing left to tap and nothing behind it
 * can draw the eye away. The shade is a flat colour, not a blur, because a
 * blur is redrawn on every scroll frame.
 *
 * The group link opens WhatsApp itself, so it is a plain link, not one of
 * the site's page links.
 */
function Thanks({ name }: { name: string }) {
  const first = name.split(/\s+/)[0] ?? "";
  const groupRef = useRef<HTMLAnchorElement>(null);

  /* The panel cannot be dismissed: the group link is the only way out, so
     the page behind it does not scroll while it is up, and focus starts on
     that link. */
  useEffect(() => {
    const { body } = document;
    const kept = body.style.overflow;
    body.style.overflow = "hidden";
    groupRef.current?.focus();
    return () => {
      body.style.overflow = kept;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-thanks-title"
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain p-5 sm:p-8"
    >
      {/* The shade over the page. Not clickable: the group link is the only way out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 w-full bg-navy-950/75 animate-[fade-in_0.5s_ease-out_both] motion-reduce:animate-none"
      />

      <div className="relative w-full max-w-xl animate-[rise-in_0.7s_cubic-bezier(0.16,1,0.3,1)_both] rounded-panel bg-white p-6 shadow-[0_60px_120px_-50px_rgb(0_0_0/0.7)] motion-reduce:animate-none sm:p-9 lg:p-10">
        <Title
          id="join-thanks-title"
          lead={joinThanks.titleLead}
          accent={first ? `${joinThanks.titleAccent}, ${first}` : joinThanks.titleAccent}
          inline
        />
        <p className="mt-5 text-lead text-slate">{joinThanks.lead}</p>

        {/* The group button first: it is what the panel is for. */}
        <a
          ref={groupRef}
          href={joinThanks.group.href}
          target="_blank"
          rel="noreferrer"
          className="group/cta mt-7 inline-flex h-13 w-full items-center justify-center gap-3 rounded-full bg-orange px-6 text-[0.9375rem] font-semibold text-white sm:w-auto sm:justify-start sm:pl-6 sm:pr-2"
        >
          <MessageCircle aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
          <span>{joinThanks.group.label}</span>
          <span className="relative hidden h-9 w-9 place-items-center overflow-hidden rounded-full bg-white/20 sm:grid">
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover/cta:translate-x-[150%]" />
            <ArrowRight className="absolute h-4 w-4 -translate-x-[150%] transition-transform duration-500 ease-out-soft group-hover/cta:translate-x-0" />
          </span>
        </a>

        <ol className="mt-8 space-y-5">
          {joinThanks.steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lagoon-600 text-[0.8125rem] font-bold text-white">
                {index + 1}
              </span>
              <span>
                <span className="block text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink">
                  {step.title}
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-relaxed text-slate">{step.line}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-7 font-display text-[1.125rem] font-light italic leading-snug text-lagoon-600 [font-variation-settings:'SOFT'_100]">
          {joinThanks.closing}
        </p>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  defaultValue,
  error,
  optional = false,
  className,
}: {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  optional?: boolean;
  className?: string;
}) {
  const id = `join-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.875rem] font-semibold text-ink">
        {label}
        {optional ? (
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
            {joinForm.fields.optional}
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-required={optional ? undefined : true}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cx(
          "mt-2 h-13 w-full rounded-2xl bg-cream px-4 text-[1rem] text-ink ring-1 ring-inset transition-[background-color,box-shadow] duration-300 focus:bg-white focus:outline-none focus:ring-2",
          error ? "ring-red-700 focus:ring-red-700" : "ring-line hover:ring-ink/25 focus:ring-lagoon-600",
        )}
      />
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

/** A tick box: the square fills in the logo's teal once it is ticked. */
function Tick({
  name,
  children,
  error,
  defaultChecked,
}: {
  name: string;
  children: ReactNode;
  error?: string;
  defaultChecked?: boolean;
}) {
  const id = `join-${name}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cx(
            "mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md bg-cream ring-1 ring-inset transition-colors duration-300 checked:bg-lagoon-600 checked:ring-lagoon-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon-600",
            "checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3%208.5l3.2%203.2L13%205%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat",
            error ? "ring-red-700" : "ring-line",
          )}
        />
        <span className="text-[0.9375rem] leading-relaxed text-slate">{children}</span>
      </label>
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[0.875rem] font-medium text-red-700">
      <CircleAlert aria-hidden="true" className="h-4 w-4 shrink-0" />
      {children}
    </p>
  );
}
