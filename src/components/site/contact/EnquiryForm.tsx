"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, Phone, type LucideIcon } from "lucide-react";
import { sendEnquiry, type EnquiryState } from "@/app/(site)/contact/actions";
import { contactEnquiry } from "@/data/contact";
import type { EnquiryTopic } from "@/data/site";
import { cx } from "@/lib/cx";
import { CtaButton } from "../ui/primitives";

const { form } = contactEnquiry;
const initialState: EnquiryState = { status: "idle" };

const statusLook: Record<Exclude<EnquiryState["status"], "idle">, { icon: LucideIcon; tone: string }> = {
  invalid: { icon: CircleAlert, tone: "text-red-700" },
  sent: { icon: CircleCheck, tone: "text-lagoon-700" },
  failed: { icon: CircleAlert, tone: "text-red-700" },
};

/* Each kind's line shows while its pill is chosen. It is the radio buttons
   themselves, not React state, that decide this: React resets a form after
   each try, and the line must follow whatever the reset leaves checked.
   Written out whole so Tailwind finds every class. */
const showNote: Record<EnquiryTopic, string> = {
  support: "group-has-[#enquiry-topic-support:checked]/topics:block",
  interest: "group-has-[#enquiry-topic-interest:checked]/topics:block",
  refer: "group-has-[#enquiry-topic-refer:checked]/topics:block",
  volunteer: "group-has-[#enquiry-topic-volunteer:checked]/topics:block",
  partner: "group-has-[#enquiry-topic-partner:checked]/topics:block",
  sponsor: "group-has-[#enquiry-topic-sponsor:checked]/topics:block",
  donate: "group-has-[#enquiry-topic-donate:checked]/topics:block",
};

/**
 * Opens the form with the kind of enquiry named in the address
 * (`?enquiry=donate`), which is how the site's calls to act arrive here
 * (`enquiryHref` in site.ts). It reads the address in the browser, so the
 * page around it stays static: until then the plain form stands in.
 */
export function EnquiryFormFromQuery() {
  const requested = useSearchParams().get("enquiry");
  const topic = form.topics.find((item) => item.id === requested)?.id;
  return <EnquiryForm key={topic ?? "default"} initialTopic={topic} />;
}

/**
 * The enquiry form: the kind of enquiry as a row of pills, with a line from
 * the brief for the one chosen, then name, email, telephone, organisation
 * and message. Fields are checked on the server (actions.ts) and each
 * message sits under its field; what was entered stays in place when a try
 * does not go through. The brief's 999 advice runs along the panel's foot.
 */
export function EnquiryForm({ initialTopic = "support" }: { initialTopic?: EnquiryTopic }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  // After a try that did not go through, the reset brings back the kind that was sent.
  const chosen = values.topic ?? initialTopic;

  // After a try with mistakes, take the reader to the first one.
  useEffect(() => {
    if (state.status !== "invalid") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  const status = state.status === "idle" ? null : statusLook[state.status];
  const statusText =
    state.status === "invalid" ? form.errors.summary : state.status === "idle" ? "" : form.status[state.status];

  return (
    <form ref={formRef} action={formAction} noValidate className="relative">
      <div className="p-6 sm:p-9 lg:p-10">
        <fieldset aria-describedby={errors.topic ? "enquiry-topic-error" : undefined} className="group/topics">
          <legend className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-orange-ink">
            {form.topicsLabel}
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {form.topics.map((item) => (
              <label key={item.id} className="group cursor-pointer">
                <input
                  type="radio"
                  id={`enquiry-topic-${item.id}`}
                  name="topic"
                  value={item.id}
                  defaultChecked={item.id === chosen}
                  className="peer sr-only"
                />
                <span className="inline-flex h-10 items-center rounded-full px-4 text-[0.875rem] font-medium text-ink ring-1 ring-inset ring-ink/15 transition-[background-color,color,box-shadow] duration-500 ease-out-soft group-hover:ring-ink/40 peer-checked:bg-ink peer-checked:text-white peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lagoon-600">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
          {errors.topic ? <FieldError id="enquiry-topic-error">{errors.topic}</FieldError> : null}
          {/* The chosen kind's line, eased in afresh each time it shows. */}
          {form.topics.map((item) => (
            <p
              key={item.id}
              className={cx(
                "mt-4 hidden animate-[rise-in_0.7s_cubic-bezier(0.16,1,0.3,1)_both] font-display text-[1.1875rem] font-light italic leading-snug text-lagoon-600 [font-variation-settings:'SOFT'_100] motion-reduce:animate-none",
                showNote[item.id],
              )}
            >
              {item.note}
            </p>
          ))}
        </fieldset>

        <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <Field
            name="name"
            label={form.fields.name}
            autoComplete="name"
            defaultValue={values.name}
            error={errors.name}
          />
          <Field
            name="email"
            type="email"
            label={form.fields.email}
            autoComplete="email"
            defaultValue={values.email}
            error={errors.email}
          />
          <Field
            name="telephone"
            type="tel"
            label={form.fields.telephone}
            autoComplete="tel"
            defaultValue={values.telephone}
            optional
          />
          <Field
            name="organisation"
            label={form.fields.organisation}
            autoComplete="organization"
            defaultValue={values.organisation}
            optional
          />
          <Field
            name="message"
            label={form.fields.message}
            defaultValue={values.message}
            error={errors.message}
            multiline
            className="sm:col-span-2"
          />
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
            {form.privacy}{" "}
            <a
              href={form.privacyLink.href}
              className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
            >
              {form.privacyLink.label}
            </a>
          </p>
          <CtaButton disabled={pending} className="shrink-0">
            {pending ? form.sending : form.submit}
          </CtaButton>
        </div>

        <p role="status" className={cx("text-[0.9375rem] font-medium", status && "mt-5 flex items-start gap-2.5")}>
          {status ? (
            <>
              <status.icon aria-hidden="true" className={cx("mt-0.5 h-5 w-5 shrink-0", status.tone)} />
              <span className={status.tone}>{statusText}</span>
            </>
          ) : null}
        </p>
      </div>

      <p className="flex items-center gap-3.5 rounded-b-panel bg-orange-soft px-6 py-4 text-[0.9375rem] leading-snug text-ink sm:px-9 lg:px-10">
        <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange text-white">
          <Phone className="h-4 w-4" strokeWidth={2} />
        </span>
        {form.emergency}
      </p>
    </form>
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
  multiline = false,
  className,
}: {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  optional?: boolean;
  multiline?: boolean;
  className?: string;
}) {
  const id = `enquiry-${name}`;
  const errorId = `${id}-error`;
  const control = cx(
    "w-full rounded-2xl bg-cream px-4 text-[1rem] text-ink ring-1 ring-inset transition-[background-color,box-shadow] duration-300 focus:bg-white focus:outline-none focus:ring-2",
    error ? "ring-red-700 focus:ring-red-700" : "ring-line hover:ring-ink/25 focus:ring-lagoon-600",
  );
  const shared = {
    id,
    name,
    defaultValue,
    "aria-required": optional ? undefined : true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.875rem] font-semibold text-ink">
        {label}
        {optional ? (
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
            {form.fields.optional}
          </span>
        ) : null}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={cx(control, "mt-2 block resize-y py-3.5 leading-relaxed")} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} className={cx(control, "mt-2 h-13")} />
      )}
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
