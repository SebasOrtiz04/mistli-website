import PageLayout from "../../layouts/PageLayout";

const sections = [
  {
    title: "Information We Collect",
    content: [
      { subtitle: "Account Information", text: "When you create a Mistli account, we collect your email address, display name, and authentication credentials. If you sign in via Google SSO, we receive your name and email from Google in accordance with their OAuth policies." },
      { subtitle: "Usage Data", text: "We collect information about how you interact with the Mistli platform, including pages visited, features used, timestamps of actions, and session duration. This data helps us improve the product and diagnose issues." },
      { subtitle: "Device & Technical Information", text: "We may collect your IP address, browser type, operating system, and device identifiers for security monitoring and fraud prevention purposes." },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      { subtitle: "Service Delivery", text: "We use your information to provide, maintain, and improve the Mistli platform, process authentication requests, and manage your workspace." },
      { subtitle: "Communication", text: "We may send you transactional emails (password resets, invitations, billing notices) and, with your consent, product updates and newsletters. You can unsubscribe from non-transactional emails at any time." },
      { subtitle: "Security & Compliance", text: "We use collected data to detect and prevent fraud, abuse, and unauthorized access. We may retain logs for up to 90 days for security auditing purposes." },
    ],
  },
  {
    title: "Data Sharing & Third Parties",
    content: [
      { subtitle: "Firebase / Google Cloud", text: "Mistli is built on Google Firebase. Your data is stored and processed on Google Cloud infrastructure. Google acts as a data processor under our terms and is bound by their Data Processing Addendum." },
      { subtitle: "No Selling of Data", text: "We do not sell, rent, or trade your personal information to third parties for marketing purposes. Period." },
      { subtitle: "Legal Requirements", text: "We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights or the safety of users." },
    ],
  },
  {
    title: "Data Retention",
    content: [
      { subtitle: "Active Accounts", text: "We retain your data for as long as your account is active. You may request deletion of your account and associated data at any time." },
      { subtitle: "After Cancellation", text: "Upon plan cancellation, your workspace data is retained for 30 days to allow for recovery. After this period, data is permanently deleted from our systems." },
      { subtitle: "Logs", text: "Activity and security logs are retained for 90 days and cannot be individually deleted, as they may be required for security investigations." },
    ],
  },
  {
    title: "Your Rights",
    content: [
      { subtitle: "Access & Portability", text: "You have the right to access the personal data we hold about you and request a copy in a portable format. Admins can export workspace data from Settings → Data & Privacy." },
      { subtitle: "Correction", text: "You may update your name and email from your Profile settings at any time. For corrections to other data, contact our support team." },
      { subtitle: "Deletion", text: "You may request deletion of your account and personal data by contacting support@mistli.io. We will process your request within 30 days." },
      { subtitle: "GDPR & CCPA", text: "If you are located in the European Economic Area or California, you have additional rights under GDPR and CCPA respectively. Contact us at privacy@mistli.io to exercise these rights." },
    ],
  },
  {
    title: "Cookies",
    content: [
      { subtitle: "Essential Cookies", text: "We use strictly necessary cookies to maintain your session and authentication state. These cannot be disabled without breaking core functionality." },
      { subtitle: "Analytics", text: "With your consent, we use anonymized analytics cookies to understand how users navigate the platform. No personally identifiable information is included in analytics data." },
    ],
  },
  {
    title: "Contact",
    content: [
      { subtitle: "Privacy Questions", text: "For privacy-related inquiries, contact our Data Protection Officer at privacy@mistli.io. For general support, visit our Support page." },
      { subtitle: "Updates to This Policy", text: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or an in-app notice at least 30 days before they take effect." },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-semibold text-[#7c6dfa] uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-[32px] font-bold text-[#f0f0f8] tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-[14px] text-[#666]">Last updated: <span className="text-[#888]">December 1, 2024</span></p>
          <div className="mt-6 p-4 rounded-xl text-[13px] text-[#888] leading-relaxed"
            style={{ background: "rgba(124,109,250,0.06)", border: "1px solid rgba(124,109,250,0.15)" }}>
            This Privacy Policy describes how Mistli Technologies Inc. ("Mistli", "we", "us", or "our") collects, uses, and protects your personal information when you use our platform and services.
          </div>
        </div>

        {/* Table of contents */}
        <div className="mb-10 p-5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[12px] font-semibold text-[#555] uppercase tracking-widest mb-3">Contents</p>
          <ol className="space-y-1.5">
            {sections.map((s, i) => (
              <li key={i}>
                <a href={`#section-${i}`}
                  className="text-[13px] text-[#888] hover:text-[#a89cf7] transition-colors no-underline flex items-center gap-2">
                  <span className="text-[#555] w-4">{i + 1}.</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={i} id={`section-${i}`}>
              <h2 className="text-[18px] font-bold text-[#e8e8f4] tracking-tight mb-5 flex items-center gap-3">
                <span className="text-[13px] font-semibold text-[#7c6dfa] tabular-nums w-6">{i + 1}.</span>
                {section.title}
              </h2>
              <div className="space-y-5 pl-9">
                {section.content.map((item, j) => (
                  <div key={j}>
                    <h3 className="text-[14px] font-semibold text-[#ccc] mb-1">{item.subtitle}</h3>
                    <p className="text-[13px] text-[#888] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              {i < sections.length - 1 && (
                <div className="mt-10 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
              )}
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}