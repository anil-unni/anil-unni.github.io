"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clipReveal, clipRevealContainer } from "@/lib/motionVariants";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { siteConfig } from "@/lib/config";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required";
  if (!EMAIL_RE.test(fields.email)) errors.email = "Enter a valid email address";
  if (!fields.subject.trim()) errors.subject = "Subject is required";
  if (fields.message.trim().length < 10) errors.message = "Message must be at least 10 characters";
  return errors;
}

const EMPTY: FormFields = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const shouldReduce = useReducedMotion();
  const revealVariant = shouldReduce ? { hidden: {}, visible: {} } : clipReveal;
  const containerVariant = shouldReduce ? { hidden: {}, visible: {} } : clipRevealContainer;

  const errors = validate(fields);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setStatus("success");
        setFields(EMPTY);
        setTouched({});
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data.message ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Unable to send message. Please check your connection.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="px-6 py-24 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <motion.p variants={revealVariant} className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3 overflow-hidden">
            Get in touch
          </motion.p>
          <motion.h2
            variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
            className="font-semibold text-foreground overflow-hidden"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Start a conversation.
          </motion.h2>
          <motion.p
            variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 } } }}
            className="mt-4 max-w-lg text-sm text-muted leading-relaxed overflow-hidden"
          >
            Whether it&apos;s a consulting project, a collaboration, or just a question —
            I read every message.
          </motion.p>
          <motion.div
            variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 } } }}
            className="mt-6 flex flex-col gap-1 overflow-hidden"
          >
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              data-cursor="hover"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              data-cursor="hover"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {siteConfig.email}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-lg overflow-hidden"
        >
          {status === "success" ? (
            <div
              role="status"
              className="border border-border p-8 text-center"
            >
              <p className="text-base font-semibold text-foreground mb-2">
                Message sent!
              </p>
              <p className="text-sm text-muted">
                I&apos;ll be in touch soon. Thanks for reaching out.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <FloatingLabelInput
                label="Name"
                name="name"
                type="text"
                value={fields.name}
                onChange={handleChange}
                error={touched.name ? errors.name : undefined}
                required
              />
              <FloatingLabelInput
                label="Email"
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                error={touched.email ? errors.email : undefined}
                required
              />
              <FloatingLabelInput
                label="Subject"
                name="subject"
                type="text"
                value={fields.subject}
                onChange={handleChange}
                error={touched.subject ? errors.subject : undefined}
                required
              />
              <FloatingLabelInput
                label="Message"
                name="message"
                type="text"
                value={fields.message}
                onChange={handleChange}
                error={touched.message ? errors.message : undefined}
                multiline
                rows={5}
                required
              />

              {status === "error" && serverError && (
                <p className="text-xs text-error" role="alert">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                data-cursor="hover"
                disabled={!isValid || status === "loading"}
                className="w-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
