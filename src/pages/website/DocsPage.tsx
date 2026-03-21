import { useState } from "react";
import PageLayout from "../../layouts/PageLayout";

const sections = [
  {
    category: "Getting Started",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    articles: [
      { slug: "introduction", title: "Introduction to Mistli", content: `Mistli is a secure management portal designed for teams that need centralized control over their operations. This guide walks you through the core concepts and helps you get up and running in minutes.\n\n**What you can do with Mistli:**\n- Manage users and permissions across your organization\n- Monitor activity logs in real time\n- Integrate with your existing tools via our REST API\n- Set up automated alerts and notifications\n\nMistli is built on Google Firebase infrastructure, ensuring enterprise-grade security and 99.9% uptime SLA.` },
      { slug: "quickstart", title: "Quickstart Guide", content: `Follow these steps to set up your Mistli workspace in under 5 minutes.\n\n**Step 1 — Create your account**\nHead to the login portal and sign in with your work email or Google SSO. If your account doesn't exist yet, Mistli will create it automatically.\n\n**Step 2 — Set up your organization**\nAfter signing in, navigate to Settings → Organization to configure your workspace name, logo, and default permissions.\n\n**Step 3 — Invite your team**\nGo to Users → Invite and send email invitations to your teammates. They'll receive a secure onboarding link valid for 48 hours.\n\n**Step 4 — Connect integrations**\nVisit the Integrations section to connect Slack, webhooks, or any REST-compatible service.` },
      { slug: "authentication", title: "Authentication & SSO", content: `Mistli supports two authentication methods:\n\n**Email & Password**\nUsers can sign in with their work email. Passwords are hashed using bcrypt and never stored in plaintext. Firebase handles all authentication flows securely.\n\n**Google Single Sign-On**\nFor organizations using Google Workspace, SSO allows users to sign in with one click using their existing Google credentials. No additional passwords required.\n\n**Session management**\nSessions expire after 7 days by default. Users can opt to stay signed in for 30 days via the "Keep me signed in" option at login. Admins can override this from the security settings panel.` },
    ],
  },
  {
    category: "Core Concepts",
    icon: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18",
    articles: [
      { slug: "workspaces", title: "Workspaces", content: `A workspace is the top-level container for your organization in Mistli. Everything — users, data, integrations, logs — lives inside a workspace.\n\n**Creating a workspace**\nWorkspaces are created automatically when the first admin signs up. You can rename or configure your workspace from Settings → General.\n\n**Workspace isolation**\nEach workspace is fully isolated. Data from one workspace is never accessible from another, even within the same Firebase project.` },
      { slug: "permissions", title: "Roles & Permissions", content: `Mistli uses a role-based access control (RBAC) system with three built-in roles:\n\n**Admin** — Full access to all settings, users, and data. Can invite/remove members.\n\n**Editor** — Can read and write content but cannot modify user roles or billing settings.\n\n**Viewer** — Read-only access. Ideal for stakeholders or auditors.\n\nCustom roles are available on the Enterprise plan.` },
      { slug: "api", title: "REST API", content: `The Mistli REST API lets you interact with your workspace programmatically.\n\n**Base URL**\n\`https://api.mistli.io/v1\`\n\n**Authentication**\nAll API requests require a Bearer token in the Authorization header:\n\`\`\`\nAuthorization: Bearer YOUR_API_KEY\n\`\`\`\n\nYou can generate API keys from Settings → API Keys. Keys can be scoped to read-only or read-write access.\n\n**Rate limits**\nThe API allows 100 requests per minute per key. Enterprise plans have higher limits available on request.` },
    ],
  },
  {
    category: "Security",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    articles: [
      { slug: "data-security", title: "Data Security", content: `Mistli takes security seriously at every layer.\n\n**Encryption at rest**\nAll data is encrypted at rest using AES-256, managed by Google Firebase.\n\n**Encryption in transit**\nAll connections use TLS 1.3. Plain HTTP is not supported.\n\n**Infrastructure**\nMistli runs entirely on Google Cloud infrastructure, benefiting from Google's security certifications including SOC 2 Type II, ISO 27001, and GDPR compliance.\n\n**Audit logs**\nEvery action taken within your workspace is logged with a timestamp and user identifier. Logs are retained for 90 days and can be exported on request.` },
      { slug: "2fa", title: "Two-Factor Authentication", content: `Two-factor authentication (2FA) adds an extra layer of security to your account.\n\n**Enabling 2FA**\nGo to your Profile → Security → Enable 2FA. Scan the QR code with an authenticator app (Google Authenticator, Authy, etc.).\n\n**Recovery codes**\nWhen enabling 2FA, you'll receive 8 one-time recovery codes. Store these somewhere safe — they're the only way to regain access if you lose your authenticator device.\n\n**Organization-wide enforcement**\nAdmins can enforce 2FA for all members from Settings → Security Policy.` },
    ],
  },
];

export default function DocsPage() {
  const [activeSlug, setActiveSlug] = useState("introduction");
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(sections.map((s) => s.category));

  const allArticles = sections.flatMap((s) => s.articles.map((a) => ({ ...a, category: s.category })));
  const filtered = search.trim()
    ? allArticles.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase()))
    : null;

  const activeArticle = allArticles.find((a) => a.slug === activeSlug);

  const toggleCategory = (cat: string) =>
    setOpenCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);

  const renderContent = (text: string) =>
    text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**"))
        return <p key={i} className="font-semibold text-[#e0e0f0] mt-5 mb-1">{line.replace(/\*\*/g, "")}</p>;
      if (line.startsWith("- "))
        return <li key={i} className="text-[#999] ml-4 mb-1 list-disc">{line.slice(2)}</li>;
      if (line.startsWith("```"))
        return null;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-[#888] leading-relaxed text-[14px]">{line}</p>;
    });

  return (
    <PageLayout>
      <div className="flex min-h-[calc(100vh-120px)]">

        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0 px-6 py-8 sticky top-0 h-screen overflow-y-auto"
          style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>

          {/* Search */}
          <div className="relative mb-6">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search docs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg py-2 pl-9 pr-3 text-[13px] text-[#ccc] outline-none placeholder:text-[#444]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>

          {/* Search results */}
          {filtered ? (
            <div>
              <p className="text-[11px] font-medium text-[#555] uppercase tracking-widest mb-3">Results</p>
              {filtered.length === 0 && <p className="text-[13px] text-[#555]">No articles found.</p>}
              {filtered.map((a) => (
                <button key={a.slug} onClick={() => { setActiveSlug(a.slug); setSearch(""); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-[#aaa] hover:text-white hover:bg-white/5 transition-all mb-1">
                  {a.title}
                </button>
              ))}
            </div>
          ) : (
            sections.map((section) => (
              <div key={section.category} className="mb-4">
                <button onClick={() => toggleCategory(section.category)}
                  className="w-full flex items-center justify-between text-[11px] font-semibold text-[#666] uppercase tracking-widest mb-2 hover:text-[#aaa] transition-colors">
                  {section.category}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className={`transition-transform ${openCategories.includes(section.category) ? "rotate-180" : ""}`}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openCategories.includes(section.category) && section.articles.map((article) => (
                  <button key={article.slug} onClick={() => setActiveSlug(article.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all mb-0.5 ${
                      activeSlug === article.slug
                        ? "text-[#a89cf7] bg-[rgba(124,109,250,0.12)]"
                        : "text-[#888] hover:text-white hover:bg-white/5"
                    }`}>
                    {article.title}
                  </button>
                ))}
              </div>
            ))
          )}
        </aside>

        {/* Article */}
        <div className="flex-1 px-12 py-10 max-w-3xl">
          {activeArticle && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[11px] font-medium text-[#555] uppercase tracking-widest">
                  {allArticles.find((a) => a.slug === activeSlug)?.category}
                </span>
                <span className="text-[#333]">/</span>
                <span className="text-[11px] text-[#7c6dfa]">{activeArticle.title}</span>
              </div>

              <h1 className="text-[28px] font-bold text-[#f0f0f8] tracking-tight mb-2">{activeArticle.title}</h1>
              <div className="h-px w-full my-6" style={{ background: "rgba(255,255,255,0.06)" }} />

              <div className="space-y-1">
                {renderContent(activeArticle.content)}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-12 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {(() => {
                  const idx = allArticles.findIndex((a) => a.slug === activeSlug);
                  const prev = allArticles[idx - 1];
                  const next = allArticles[idx + 1];
                  return (
                    <>
                      {prev ? (
                        <button onClick={() => setActiveSlug(prev.slug)}
                          className="flex items-center gap-2 text-[13px] text-[#888] hover:text-[#a89cf7] transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
                          {prev.title}
                        </button>
                      ) : <div />}
                      {next && (
                        <button onClick={() => setActiveSlug(next.slug)}
                          className="flex items-center gap-2 text-[13px] text-[#888] hover:text-[#a89cf7] transition-colors">
                          {next.title}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}