import { useState } from "react";
import PageLayout from "../../layouts/PageLayout";

type Status = "operational" | "degraded" | "outage" | "maintenance";

interface Service {
  name: string;
  status: Status;
  latency?: string;
  description: string;
}

interface Incident {
  id: string;
  title: string;
  severity: "minor" | "major" | "critical";
  status: "investigating" | "identified" | "monitoring" | "resolved";
  date: string;
  updates: { time: string; message: string }[];
}

const services: Service[] = [
  { name: "Authentication", status: "operational", latency: "42ms", description: "Firebase Auth, Google SSO, session management" },
  { name: "API", status: "operational", latency: "87ms", description: "REST API endpoints, rate limiting, webhooks" },
  { name: "Database", status: "operational", latency: "23ms", description: "Firestore read/write operations, indexing" },
  { name: "File Storage", status: "operational", latency: "110ms", description: "Firebase Storage, uploads, CDN delivery" },
  { name: "Email Delivery", status: "operational", latency: "1.2s", description: "Transactional emails, invitations, alerts" },
  { name: "Dashboard", status: "operational", latency: "61ms", description: "Web portal, navigation, real-time updates" },
  { name: "Notifications", status: "degraded", latency: "3.4s", description: "Push notifications, in-app alerts" },
  { name: "Search", status: "operational", latency: "95ms", description: "Full-text search, indexing pipeline" },
];

const incidents: Incident[] = [
  {
    id: "INC-2024-031",
    title: "Increased latency in notification delivery",
    severity: "minor",
    status: "monitoring",
    date: "Dec 12, 2024",
    updates: [
      { time: "14:32 UTC", message: "We are monitoring notification delivery following the deployment of a fix. Latency has improved from 8s to 3.4s and continues to trend down." },
      { time: "13:15 UTC", message: "Root cause identified: a misconfigured queue worker was processing notifications sequentially instead of in parallel. Fix deployed." },
      { time: "12:40 UTC", message: "We are investigating reports of delayed notifications. The API and authentication systems are unaffected." },
    ],
  },
  {
    id: "INC-2024-028",
    title: "Dashboard unavailable in EU region",
    severity: "major",
    status: "resolved",
    date: "Dec 5, 2024",
    updates: [
      { time: "09:10 UTC", message: "Service fully restored. All EU users can access the dashboard normally. Post-mortem will be published within 72 hours." },
      { time: "08:45 UTC", message: "Traffic rerouted to backup region. Dashboard is accessible again for most users while primary region recovers." },
      { time: "07:22 UTC", message: "Identified a cascading failure in the EU-WEST-1 load balancer following a routine config update. Rollback initiated." },
      { time: "06:55 UTC", message: "Investigating reports of the dashboard being inaccessible for users in the European region." },
    ],
  },
];

const uptimeData = [
  { month: "Jun", uptime: 99.98 },
  { month: "Jul", uptime: 100 },
  { month: "Aug", uptime: 99.95 },
  { month: "Sep", uptime: 100 },
  { month: "Oct", uptime: 99.99 },
  { month: "Nov", uptime: 99.91 },
  { month: "Dec", uptime: 99.97 },
];

const statusConfig: Record<Status, { label: string; color: string; bg: string; dot: string }> = {
  operational: { label: "Operational", color: "#6ee7b7", bg: "rgba(110,231,183,0.1)", dot: "#6ee7b7" },
  degraded: { label: "Degraded", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", dot: "#fbbf24" },
  outage: { label: "Outage", color: "#f87171", bg: "rgba(248,113,113,0.1)", dot: "#f87171" },
  maintenance: { label: "Maintenance", color: "#60a5fa", bg: "rgba(96,165,250,0.1)", dot: "#60a5fa" },
};

const severityConfig = {
  minor: { label: "Minor", color: "#fbbf24" },
  major: { label: "Major", color: "#f97316" },
  critical: { label: "Critical", color: "#f87171" },
};

const incidentStatusConfig = {
  investigating: { label: "Investigating", color: "#f87171" },
  identified: { label: "Identified", color: "#fbbf24" },
  monitoring: { label: "Monitoring", color: "#60a5fa" },
  resolved: { label: "Resolved", color: "#6ee7b7" },
};

const allOperational = services.every((s) => s.status === "operational");

export default function StatusPage() {
  const [expandedIncident, setExpandedIncident] = useState<string | null>("INC-2024-031");

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="text-center mb-12">
          {/* Overall status badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-6"
            style={{
              background: allOperational ? "rgba(110,231,183,0.1)" : "rgba(251,191,36,0.1)",
              border: `1px solid ${allOperational ? "rgba(110,231,183,0.25)" : "rgba(251,191,36,0.25)"}`,
            }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: allOperational ? "#6ee7b7" : "#fbbf24" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: allOperational ? "#6ee7b7" : "#fbbf24" }} />
            </span>
            <span className="text-[14px] font-semibold"
              style={{ color: allOperational ? "#6ee7b7" : "#fbbf24" }}>
              {allOperational ? "All Systems Operational" : "Partial Service Disruption"}
            </span>
          </div>

          <h1 className="text-[30px] font-bold text-[#f0f0f8] tracking-tight mb-2">System Status</h1>
          <p className="text-[13px] text-[#666]">
            Last checked: <span className="text-[#888]">December 12, 2024 · 15:00 UTC</span>
          </p>
        </div>

        {/* Services */}
        <section className="mb-10">
          <h2 className="text-[13px] font-semibold text-[#555] uppercase tracking-widest mb-4">Services</h2>
          <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {services.map((service, i) => {
              const cfg = statusConfig[service.status];
              return (
                <div key={service.name}
                  className="flex items-center justify-between px-5 py-4"
                  style={{
                    background: i % 2 === 0 ? "rgba(18,18,32,0.6)" : "rgba(255,255,255,0.01)",
                    borderBottom: i < services.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#ddd] mb-0.5">{service.name}</p>
                    <p className="text-[12px] text-[#555] truncate">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                    {service.latency && (
                      <span className="text-[12px] text-[#555] tabular-nums hidden sm:block">{service.latency}</span>
                    )}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full"
                      style={{ background: cfg.bg }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
                      <span className="text-[12px] font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Uptime */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-[#555] uppercase tracking-widest">Uptime — Last 7 Months</h2>
            <span className="text-[13px] font-semibold text-[#6ee7b7]">99.97% avg</span>
          </div>
          <div className="rounded-[16px] p-5" style={{ background: "rgba(18,18,32,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-end gap-2 h-20">
              {uptimeData.map((d) => {
                const pct = ((d.uptime - 99.8) / 0.2) * 100;
                const clampedPct = Math.max(10, Math.min(100, pct));
                const color = d.uptime >= 99.95 ? "#6ee7b7" : d.uptime >= 99.9 ? "#fbbf24" : "#f87171";
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] text-[#555] tabular-nums">{d.uptime}%</span>
                    <div className="w-full rounded-t-sm transition-all"
                      style={{ height: `${clampedPct}%`, background: color, opacity: 0.8 }} />
                    <span className="text-[11px] text-[#555]">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Incidents */}
        <section>
          <h2 className="text-[13px] font-semibold text-[#555] uppercase tracking-widest mb-4">Recent Incidents</h2>

          {incidents.length === 0 ? (
            <div className="text-center py-12 text-[#555] text-[13px]">No incidents in the past 30 days.</div>
          ) : (
            <div className="space-y-3">
              {incidents.map((incident) => {
                const sevCfg = severityConfig[incident.severity];
                const stsCfg = incidentStatusConfig[incident.status];
                const isOpen = expandedIncident === incident.id;

                return (
                  <div key={incident.id} className="rounded-[14px] overflow-hidden transition-all"
                    style={{ background: "rgba(18,18,32,0.7)", border: `1px solid ${isOpen ? "rgba(124,109,250,0.2)" : "rgba(255,255,255,0.07)"}` }}>

                    <button onClick={() => setExpandedIncident(isOpen ? null : incident.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full" style={{ background: stsCfg.color }} />
                        <div className="min-w-0">
                          <p className="text-[14px] font-medium text-[#ddd] truncate">{incident.title}</p>
                          <p className="text-[12px] text-[#555] mt-0.5">{incident.date} · {incident.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full hidden sm:block"
                          style={{ color: sevCfg.color, background: `${sevCfg.color}18` }}>
                          {sevCfg.label}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ color: stsCfg.color, background: `${stsCfg.color}18` }}>
                          {stsCfg.label}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"
                          className={`ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1">
                        <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />
                        <div className="space-y-4">
                          {incident.updates.map((update, i) => (
                            <div key={i} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: i === 0 ? stsCfg.color : "#333" }} />
                                {i < incident.updates.length - 1 && (
                                  <div className="w-px flex-1 mt-1" style={{ background: "rgba(255,255,255,0.06)", minHeight: "24px" }} />
                                )}
                              </div>
                              <div className="pb-2">
                                <p className="text-[11px] font-semibold text-[#555] mb-1 tabular-nums">{update.time}</p>
                                <p className="text-[13px] text-[#888] leading-relaxed">{update.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-[12px] text-[#444] text-center mt-6">
            Subscribe to status updates at{" "}
            <a href="mailto:status@mistli.io" className="text-[#7c6dfa] hover:text-[#a89cf7] transition-colors no-underline">
              status@mistli.io
            </a>
          </p>
        </section>
      </div>
    </PageLayout>
  );
}