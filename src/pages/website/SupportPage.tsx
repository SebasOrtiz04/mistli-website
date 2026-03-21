import { useState } from "react";
import PageLayout from "../../layouts/PageLayout";

const faqs = [
  { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot?' next to the password field. Enter your work email and we'll send a reset link within seconds. The link expires after 1 hour." },
  { q: "Can I invite team members without Google accounts?", a: "Yes. Mistli supports email/password authentication independently of Google. Invited users will receive an email to set their own password and access the portal." },
  { q: "What happens if I lose access to my 2FA device?", a: "Use one of the recovery codes you received when enabling 2FA. If you've lost those too, contact support with your work email and a valid photo ID for manual verification." },
  { q: "Is my data backed up?", a: "Yes. Mistli uses Firebase's automatic daily backups with point-in-time recovery. Data is replicated across multiple Google Cloud regions for redundancy." },
  { q: "Can I export my workspace data?", a: "Admins can request a full data export from Settings → Data & Privacy → Export. The export includes users, logs, and configuration. Processing takes up to 24 hours." },
  { q: "What's the difference between Editor and Admin roles?", a: "Admins have full control including user management, billing, and security policies. Editors can create and modify content but cannot change roles, billing, or security settings." },
  { q: "How do I cancel my subscription?", a: "Go to Settings → Billing → Cancel Plan. Your workspace remains active until the end of the current billing period. Data is retained for 30 days after cancellation." },
];

const categories = [
  { icon: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z", label: "Account & Access", color: "#7c6dfa" },
  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Security", color: "#6ee7b7" },
  { icon: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18", label: "Billing", color: "#f59e0b" },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Integrations", color: "#60a5fa" },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200)); // simula envío
    setSent(true);
    setSending(false);
  };

  const inputClass = "w-full rounded-[10px] py-3 px-4 text-sm text-[#e0e0ee] outline-none transition-all placeholder:text-[#444]";
  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxSizing: "border-box" as const,
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-14">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.25)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a89cf7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h1 className="text-[32px] font-bold text-[#f0f0f8] tracking-tight mb-2">How can we help?</h1>
          <p className="text-[15px] text-[#777] max-w-md mx-auto">
            Browse common questions or send us a message. Our team responds within 24 hours.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 gap-3 mb-14 sm:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.label}
              className="rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={cat.icon} />
                </svg>
              </div>
              <span className="text-[12px] font-medium text-[#aaa] text-center">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-[20px] font-bold text-[#f0f0f8] tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${openFaq === i ? "rgba(124,109,250,0.25)" : "rgba(255,255,255,0.07)"}` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className={`text-[14px] font-medium transition-colors ${openFaq === i ? "text-[#a89cf7]" : "text-[#ccc]"}`}>
                    {faq.q}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={openFaq === i ? "#a89cf7" : "#555"} strokeWidth="2" strokeLinecap="round"
                    className={`flex-shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-[13px] text-[#888] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section>
          <h2 className="text-[20px] font-bold text-[#f0f0f8] tracking-tight mb-2">Contact Support</h2>
          <p className="text-[13px] text-[#666] mb-6">Can't find your answer? Send us a message and we'll get back to you.</p>

          {sent ? (
            <div className="rounded-xl p-8 flex flex-col items-center text-center"
              style={{ background: "rgba(110,231,183,0.06)", border: "1px solid rgba(110,231,183,0.2)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: "rgba(110,231,183,0.12)", border: "1px solid rgba(110,231,183,0.25)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
                </svg>
              </div>
              <h3 className="text-[16px] font-semibold text-[#f0f0f8] mb-1">Message sent!</h3>
              <p className="text-[13px] text-[#777]">We'll reply to <span className="text-[#a89cf7]">{form.email}</span> within 24 hours.</p>
            </div>
          ) : (
            <div className="rounded-[20px] p-8"
              style={{ background: "rgba(18,18,32,0.85)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#bbb] mb-2">Name</label>
                  <input type="text" placeholder="Jane Smith" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass} style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#7c6dfa")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#bbb] mb-2">Work Email</label>
                  <input type="email" placeholder="jane@company.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass} style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#7c6dfa")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-[#bbb] mb-2">Subject</label>
                <input type="text" placeholder="Briefly describe your issue" value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass} style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7c6dfa")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} />
              </div>
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-[#bbb] mb-2">Message</label>
                <textarea rows={5} placeholder="Tell us what's happening in detail..." value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`} style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7c6dfa")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")} />
              </div>
              <button onClick={handleSend} disabled={sending}
                className="px-8 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #7c6dfa 0%, #5a4de0 100%)", boxShadow: "0 4px 20px rgba(124,109,250,0.3)" }}>
                {sending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </button>
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
}