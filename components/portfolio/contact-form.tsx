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
        if (!result.ok) throw new Error("消息发送失败，请直接通过邮箱联系。");
        setStatus("消息已发送，感谢联系。"); form.reset();
      } else {
        const subject = `作品集咨询：${values.name}${values.company ? ` / ${values.company}` : ""}`;
        const body = `姓名：${values.name}\n邮箱：${values.email}\n公司：${values.company || "—"}\n\n${values.message}`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("邮件草稿已准备，请在邮件应用中确认发送。若未打开，请直接发送至上方邮箱。网站尚未发送此消息。");
      }
    } catch (error) { setStatus(error instanceof Error ? error.message : "无法发送，请改用邮箱联系。"); }
    finally { setPending(false); }
  }
  return <form className="contact-form" onSubmit={submit}><p className="eyebrow">告诉我你的想法</p><div className="form-row"><label>你的姓名 <span>*</span><input autoComplete="name" name="name" required maxLength={120} placeholder="请输入姓名" /></label><label>电子邮箱 <span>*</span><input type="email" autoComplete="email" name="email" required maxLength={254} placeholder="请输入你的邮箱" /></label></div><label>公司 <span className="optional">（选填）</span><input autoComplete="organization" name="company" maxLength={160} placeholder="你的工作室或公司" /></label><label>留言内容 <span>*</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="介绍你的项目、岗位或希望探索的创意……" /></label><p className="form-note">前端表单会打开邮件草稿，由你确认发送。</p><button className="button button-dark" disabled={pending}>{pending ? "正在准备……" : "准备邮件"}<ArrowUpRight size={17} /></button><p className="form-status" role="status">{status}</p></form>;
}
