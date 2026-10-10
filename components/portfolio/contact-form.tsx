"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
export function ContactForm() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setPending(true); setStatus("");
    try {
      if (profile.contactApi) {
        const result = await fetch(profile.contactApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
        if (!result.ok) throw new Error("Could not send your message. Please email me directly.");
        setStatus("Message sent. Thank you for getting in touch."); form.reset();
      } else {
        const subject = `Portfolio inquiry from ${values.name}${values.company ? ` / ${values.company}` : ""}`;
        const body = `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || "—"}\n\n${values.message}`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("邮件草稿已准备，请在邮件应用中确认发送。若未打开，请直接发送至上方邮箱。网站尚未发送此消息。");
      }
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to send. Please try email instead."); }
    finally { setPending(false); }
  }
  return <form className="contact-form" onSubmit={submit}><p className="eyebrow">Tell me a little about it</p><div className="form-row"><label>Your name <span>*</span><input autoComplete="name" name="name" required maxLength={120} placeholder="Alex Chen" /></label><label>Email address <span>*</span><input type="email" autoComplete="email" name="email" required maxLength={254} placeholder="you@company.com" /></label></div><label>Company <span className="optional">(optional)</span><input autoComplete="organization" name="company" maxLength={160} placeholder="Your studio or company" /></label><label>Your message <span>*</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="A project, a role, or an idea you'd like to explore…" /></label><p className="form-note">前端表单会打开邮件草稿，由你确认发送。</p><button className="button button-dark" disabled={pending}>{pending ? "Preparing…" : "Send message"}<ArrowUpRight size={17} /></button><p className="form-status" role="status">{status}</p></form>;
}
