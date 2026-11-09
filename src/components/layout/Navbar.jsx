

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import siteConfig from "@config/site.config";
import sectionsConfig from "@config/sections.config";
import Button from "@components/ui/Button";
import Container from "@components/ui/Container";

const navLinks = sectionsConfig
  .filter((s) => s.enabled && s.navLabel)
  .map((s) => ({ href: `/#${s.id}`, label: s.navLabel }));

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]";

// "!" لإجبار الألوان تتغلّب على ألوان الزر الأصلية (اللي ممكن تكون غامقة)
const ghostOnDark = "!border-white/40 !text-white hover:!border-white hover:!bg-white/10";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const solid = !isHome || scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    if (isHome && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 text-white transition-colors duration-300 ${
        solid
          ? "bg-[var(--color-primary-dark)]/95 backdrop-blur-md shadow-[var(--shadow-md)]"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav
          role="navigation"
          aria-label="القائمة الرئيسية"
          className="flex items-center justify-between h-16 md:h-20"
        >
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center gap-2 shrink-0 rounded-md ${focusRing}`}
            aria-label={`${siteConfig.brand.fullName} – الرئيسية`}
          >
            <img
          
              src={siteConfig.brand.logoPath}
              alt={siteConfig.brand.name}
              className="w-13 h-13 object-contain drop-shadow-[0_2px_7px_rgba(255,255,255,0.45)]"

               onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span
              className="text-2xl font-black text-[var(--color-accent-light)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {siteConfig.brand.name}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-sm font-semibold text-white/85 hover:text-white transition-colors duration-200 ${focusRing}
                    after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-[var(--color-accent)] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {siteConfig.trial.enabled && (
              <Link to="/booking?service=free-trial">
                <Button variant="ghost" size="sm" className={ghostOnDark}>جرّب مجاناً</Button>
              </Link>
            )}
            <Link to="/booking">
              <Button variant="accent" size="sm">احجز الآن</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((p) => !p)}
            className={`md:hidden p-2 rounded-[var(--radius-md)] text-white hover:bg-white/10 transition-colors ${focusRing}`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[var(--color-primary-dark)] shadow-[var(--shadow-lg)]"
          >
            <Container>
              <ul className="flex flex-col gap-1 py-4 list-none m-0 p-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block px-4 py-3 rounded-[var(--radius-md)] font-semibold text-white hover:bg-white/10 transition-colors ${focusRing}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 flex flex-col gap-2">
                  {siteConfig.trial.enabled && (
                    <Link to="/booking?service=free-trial" onClick={() => setMenuOpen(false)}>
                      <Button variant="ghost" fullWidth className={ghostOnDark}>جرّب مجاناً</Button>
                    </Link>
                  )}
                  <Link to="/booking" onClick={() => setMenuOpen(false)}>
                    <Button variant="accent" fullWidth>احجز الآن</Button>
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}