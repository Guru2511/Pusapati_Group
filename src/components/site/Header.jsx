import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Menu as MenuIcon, ArrowUpRight } from "lucide-react";
import Logo from "@/components/site/Logo";
import MegaMenu from "@/components/site/MegaMenu";
import MobileNav from "@/components/site/MobileNav";

const links = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Our Work", to: "/work" },
  { label: "Vision 2032", to: "/vision-2032" },
  { label: "Vendors", to: "/vendors" },
  { label: "Investors", to: "/investors" },
  { label: "Careers", to: "/careers" },
  { label: "Intelligence", to: "/intelligence" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [path, setPath] = useState("");
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  const location = useLocation();

  // Resolved after mount so the server and first client render always agree.
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMega(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (to) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <header className="sticky top-0 z-50" onMouseLeave={() => setMega(false)}>
      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] w-full origin-left bg-gradient-to-r from-orange via-orange to-[#f0a86b]"
      />

      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/85 shadow-[0_20px_50px_-40px_rgba(16,18,22,0.7)] backdrop-blur-xl"
            : "border-b border-transparent bg-paper/40 backdrop-blur-sm"
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            <Link to="/" aria-label="Pusapati Group home" className="shrink-0">
              <Logo />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-0.5 rounded-full border border-ink/10 bg-white/60 p-1 backdrop-blur xl:flex"
            >
              <div ref={wrapRef} className="relative" onMouseEnter={() => setMega(true)}>
                <button
                  type="button"
                  onClick={() => setMega((v) => !v)}
                  aria-expanded={mega}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11.5px] font-medium uppercase tracking-[0.1em] transition-colors ${
                    mega ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  Companies
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${mega ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative rounded-full px-3.5 py-2 text-[11.5px] font-medium uppercase tracking-[0.1em] transition-colors ${
                    isActive(l.to) ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/quote"
                className="hidden min-h-[42px] items-center gap-2 rounded-full bg-orange px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-all duration-300 hover:bg-[#c95f10] hover:shadow-glowOrange sm:inline-flex"
              >
                Get a Quote
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setMobile(true)}
                aria-label="Open menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper xl:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 top-full origin-top transition-all duration-300 ${
          mega ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {mega && <MegaMenu onNavigate={() => setMega(false)} />}
      </div>

      <MobileNav open={mobile} onOpenChange={setMobile} />
    </header>
  );
}