import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface Props {
  children: ReactNode;
}

export default function PageLayout({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const navLinks = [
    { label: "Documentation", path: "/documentation" },
    { label: "Support", path: "/support" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0d0d1a] text-[#e8e8f0] flex flex-col overflow-hidden font-sans">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed top-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(100,80,220,0.1) 0%, transparent 70%)" }} />
      <div className="pointer-events-none fixed bottom-[10%] -right-[10%] w-[35vw] h-[35vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(80,60,200,0.08) 0%, transparent 70%)" }} />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-9 py-[18px]"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center"
            style={{ background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.3)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="#7c6dfa" opacity="0.9" />
            </svg>
          </div>
          <span className="text-[17px] font-bold tracking-tight text-[#e8e8f4]">Mistli</span>
        </Link>

        <div className="flex items-center gap-4">
          {navLinks.map((l) => (
            <button onClick={()=>navigate(l.path)}
              className={`text-sm font-medium transition-colors no-underline ${location.pathname.startsWith(l.path) ? "text-white" : "text-[#aaa] hover:text-white"}`}>
              {l.label}
            </button>
          ))}
          <Link to="/auth/login"
            className="text-sm font-semibold text-[#e8e8f4] px-5 py-2 rounded-lg transition-colors hover:bg-white/10 no-underline"
            style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}>
            Sign In
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between px-9 py-[18px]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="text-xs text-[#444]">© 2024 Mistli Technologies Inc. All rights reserved.</span>
        <div className="flex gap-5">
          {[
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms of Service", path: "/terms" },
            { label: "System Status", path: "/statuspage" },
          ].map((l) => (
            <Link key={l.path} to={l.path}
              className="text-xs text-[#555] hover:text-[#888] transition-colors no-underline">
              {l.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}