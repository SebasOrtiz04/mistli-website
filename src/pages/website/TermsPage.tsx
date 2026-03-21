import PageLayout from "../../layouts/PageLayout";

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing or using the Mistli platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use our services. These terms apply to all users, including free trial users, paid subscribers, and administrators.",
  },
  {
    title: "Description of Service",
    content: "Mistli is a cloud-based management portal that provides workspace collaboration, user management, activity monitoring, and API integration services. We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable notice.",
  },
  {
    title: "Account Responsibilities",
    items: [
      { label: "Account Security", text: "You are responsible for maintaining the confidentiality of your login credentials. You must notify us immediately at security@mistli.io if you suspect unauthorized access to your account." },
      { label: "Accurate Information", text: "You agree to provide accurate, current, and complete information when creating your account and to keep this information up to date." },
      { label: "Authorized Use", text: "Your account is for your personal or organizational use only. You may not share credentials with third parties or allow unauthorized individuals to access your workspace." },
      { label: "Minimum Age", text: "You must be at least 18 years old to use Mistli. By using our service, you represent that you meet this requirement." },
    ],
  },
  {
    title: "Acceptable Use Policy",
    content: "You agree not to use Mistli to:",
    items: [
      { label: "", text: "Violate any applicable local, national, or international laws or regulations." },
      { label: "", text: "Transmit any harmful, offensive, or illegal content through the platform." },
      { label: "", text: "Attempt to gain unauthorized access to other users' accounts or any systems connected to Mistli." },
      { label: "", text: "Use the platform to send unsolicited communications (spam)." },
      { label: "", text: "Reverse engineer, decompile, or disassemble any part of the Mistli software." },
      { label: "", text: "Use automated tools to scrape, crawl, or excessively load our infrastructure." },
    ],
  },
  {
    title: "Billing & Subscriptions",
    items: [
      { label: "Billing Cycle", text: "Paid plans are billed monthly or annually in advance. Prices are listed in USD and are subject to applicable taxes." },
      { label: "Refunds", text: "We offer a 14-day money-back guarantee for new paid subscriptions. Refund requests after this period are evaluated on a case-by-case basis." },
      { label: "Cancellation", text: "You may cancel your subscription at any time. Your workspace remains active until the end of the current billing period. No partial refunds are issued for unused time." },
      { label: "Price Changes", text: "We may change our pricing with 30 days notice. Existing subscribers will be notified by email before any price change takes effect." },
    ],
  },
  {
    title: "Intellectual Property",
    content: "All content, software, and technology on the Mistli platform — including our logo, interface design, and underlying code — is the exclusive property of Mistli Technologies Inc. and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit written consent.\n\nYou retain full ownership of any data or content you upload to Mistli. By using our service, you grant us a limited, non-exclusive license to store and process your content solely to provide the service.",
  },
  {
    title: "Data & Privacy",
    content: "Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using Mistli, you consent to our data practices as described in the Privacy Policy.",
  },
  {
    title: "Limitation of Liability",
    content: "To the maximum extent permitted by law, Mistli Technologies Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use the service.\n\nOur total liability for any claim arising from these Terms or your use of the service shall not exceed the amount you paid to us in the 12 months preceding the claim.",
  },
  {
    title: "Termination",
    content: "We may suspend or terminate your account at our discretion if you violate these Terms, engage in fraudulent activity, or if required by law. We will provide notice where reasonably possible. Upon termination, your right to use the service ceases immediately. Provisions of these Terms that by their nature should survive termination will remain in effect.",
  },
  {
    title: "Governing Law",
    content: "These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts located in Delaware.",
  },
  {
    title: "Changes to Terms",
    content: "We reserve the right to modify these Terms at any time. We will notify users of material changes via email or in-app notification at least 30 days before they take effect. Your continued use of Mistli after changes take effect constitutes acceptance of the new Terms.",
  },
  {
    title: "Contact",
    content: "For questions about these Terms, contact our legal team at legal@mistli.io or write to:\n\nMistli Technologies Inc.\n123 Market Street, Suite 400\nSan Francisco, CA 94105\nUnited States",
  },
];

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-semibold text-[#7c6dfa] uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-[32px] font-bold text-[#f0f0f8] tracking-tight mb-3">Terms of Service</h1>
          <p className="text-[14px] text-[#666]">Last updated: <span className="text-[#888]">December 1, 2024</span></p>
          <div className="mt-6 p-4 rounded-xl text-[13px] text-[#888] leading-relaxed"
            style={{ background: "rgba(124,109,250,0.06)", border: "1px solid rgba(124,109,250,0.15)" }}>
            Please read these Terms of Service carefully before using the Mistli platform. These terms form a legally binding agreement between you and Mistli Technologies Inc.
          </div>
        </div>

        {/* Table of contents */}
        <div className="mb-10 p-5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[12px] font-semibold text-[#555] uppercase tracking-widest mb-3">Contents</p>
          <ol className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {sections.map((s, i) => (
              <li key={i}>
                <a href={`#term-${i}`}
                  className="text-[13px] text-[#888] hover:text-[#a89cf7] transition-colors no-underline flex items-start gap-2">
                  <span className="text-[#555] flex-shrink-0 tabular-nums">{i + 1}.</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i} id={`term-${i}`}>
              <h2 className="text-[18px] font-bold text-[#e8e8f4] tracking-tight mb-4 flex items-center gap-3">
                <span className="text-[13px] font-semibold text-[#7c6dfa] tabular-nums w-6 flex-shrink-0">{i + 1}.</span>
                {section.title}
              </h2>

              <div className="pl-9 space-y-3">
                {section.content && section.content.split("\n").map((line, j) =>
                  line.trim() === "" ? <div key={j} className="h-1" /> :
                  <p key={j} className="text-[13px] text-[#888] leading-relaxed">{line}</p>
                )}
                {section.items && (
                  <div className="space-y-4 mt-2">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#7c6dfa" }} />
                        <div>
                          {item.label && <span className="text-[13px] font-semibold text-[#ccc]">{item.label} — </span>}
                          <span className="text-[13px] text-[#888] leading-relaxed">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {i < sections.length - 1 && (
                <div className="mt-8 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
              )}
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}