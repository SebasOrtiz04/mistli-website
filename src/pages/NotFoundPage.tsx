import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 py-14 text-center">

        {/* Glitchy 404 number */}
        <div className="relative mb-8 select-none">
          <span
            className="text-[140px] font-black tracking-tighter leading-none"
            style={{
              background: "linear-gradient(135deg, rgba(124,109,250,0.15) 0%, rgba(90,77,224,0.05) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              letterSpacing: "-6px",
            }}
          >
            404
          </span>
          {/* Glitch layers */}
          <span
            className="absolute inset-0 text-[140px] font-black tracking-tighter leading-none pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #7c6dfa 0%, #5a4de0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
              transform: "translate(-3px, 0)",
              opacity: 0.4,
              letterSpacing: "-6px",
            }}
          >
            404
          </span>
          <span
            className="absolute inset-0 text-[140px] font-black tracking-tighter leading-none pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #a89cf7 0%, #7c6dfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              clipPath: "polygon(0 60%, 100% 60%, 100% 75%, 0 75%)",
              transform: "translate(3px, 0)",
              opacity: 0.3,
              letterSpacing: "-6px",
            }}
          >
            404
          </span>
        </div>

        {/* Icon */}
        <div
          className="w-[54px] h-[54px] rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(124,109,250,0.12)", border: "1px solid rgba(124,109,250,0.2)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a89cf7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M11 8v3M11 14h.01" />
          </svg>
        </div>

        <h1 className="text-[26px] font-bold text-[#f0f0f8] tracking-tight mb-2">
          Page not found
        </h1>
        <p className="text-[14px] text-[#777] max-w-xs leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved to a different location.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium text-[#ccc] transition-all hover:bg-white/[0.06] hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #7c6dfa 0%, #5a4de0 100%)",
              boxShadow: "0 4px 20px rgba(124,109,250,0.3)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to home
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="text-[11px] font-medium text-[#444] uppercase tracking-widest">Or try one of these</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              { label: "Documentation", path: "/docs" },
              { label: "Support", path: "/support" },
              { label: "System Status", path: "/statuspage" },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-[12px] text-[#666] hover:text-[#a89cf7] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}