"use client";

import { useState, type FormEvent } from "react";

import { ArrowRight } from "@/components/ui/icon";
import { contactPage } from "@/content/pages";
import { site } from "@/content/site";

const { form } = contactPage;

/**
 * Underline fields rather than boxes — the same hairline vocabulary the rest
 * of the site uses, and it keeps a nine-control form from reading as a stack
 * of containers. The rule thickens and turns navy on focus; the global
 * `:focus-visible` outline still fires on top of it for keyboard users.
 */
const fieldClass =
  "w-full border-0 border-b border-line-strong bg-transparent px-0 py-3.5 text-[17px] text-brand outline-none transition-colors duration-300 ease-out placeholder:text-faint focus:border-brand";
const labelClass =
  "block text-[12px] font-semibold uppercase tracking-[0.16em] text-muted";

/**
 * The enquiry form. As on the live site it composes a message and hands it to
 * the visitor's mail client rather than posting to a server.
 */
export function ContactForm({ labelledBy }: { labelledBy?: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const body = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone") || "-"}`,
      `Project type: ${value("projectType")}`,
      `Budget range: ${value("budget") || "-"}`,
      "",
      "Project details:",
      value("message"),
    ].join("\n");

    const subject = `Project enquiry — ${value("projectType")} — ${value("name")}`;

    // Hand the composed message to the visitor's mail client.
    const mailto = document.createElement("a");
    mailto.href = `${site.contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    mailto.click();
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={labelledBy}
      aria-describedby="enquiry-note"
      className="flex flex-col gap-9"
    >
      <div>
        <label className={labelClass} htmlFor="name">
          {form.fields.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={`${fieldClass} mt-3`}
        />
      </div>

      <div className="grid grid-cols-1 gap-9 nav:grid-cols-2 nav:gap-x-12">
        <div>
          <label className={labelClass} htmlFor="email">
            {form.fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${fieldClass} mt-3`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            {form.fields.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${fieldClass} mt-3`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-9 nav:grid-cols-2 nav:gap-x-12">
        <div>
          <label className={labelClass} htmlFor="projectType">
            {form.fields.projectType}
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={`${fieldClass} mt-3`}
          >
            <option value="" disabled>
              {form.projectTypePlaceholder}
            </option>
            {form.projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="budget">
            {form.fields.budget}
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={`${fieldClass} mt-3`}
          >
            <option value="" disabled>
              {form.budgetPlaceholder}
            </option>
            {form.budgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          {form.fields.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} mt-3 resize-y`}
        />
      </div>

      <div className="mt-2 flex flex-col gap-7 nav:flex-row nav:items-center nav:justify-between nav:gap-12">
        <button
          type="submit"
          className="group/button inline-flex items-center justify-between gap-6 bg-brand px-8 py-[19px] text-[14px] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 ease-out hover:bg-ink"
        >
          <span>{form.submitLabel}</span>
          <ArrowRight className="transition-transform duration-300 ease-out group-hover/button:translate-x-1" />
        </button>

        <p
          id="enquiry-note"
          aria-live="polite"
          className="m-0 max-w-[46ch] text-[15px] leading-[1.7] text-body"
        >
          {sent ? (
            <>
              Your email app should now be open with the enquiry ready to send.
              If nothing happened, email us directly at{" "}
              <a
                href={site.contact.emailHref}
                className="border-b border-brand text-brand"
              >
                {site.contact.email}
              </a>
              .
            </>
          ) : (
            form.note
          )}
        </p>
      </div>
    </form>
  );
}
