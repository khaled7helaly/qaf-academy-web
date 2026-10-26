/**
 * components/layout/Footer.jsx
 * Site footer. Social links and brand info from config.
 */

import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import siteConfig from "@config/site.config";
import Container from "@components/ui/Container";

const iconMap = {
  Instagram: FaInstagram,
  FaInstagram,
  Twitter: FaTwitter,
  FaTwitter,
  Youtube: FaYoutube,
  FaYoutube,
  Facebook: FaFacebookF,
  FaFacebookF,
  Linkedin: FaLinkedinIn,
  FaLinkedinIn,
  Github: FaGithub,
  FaGithub,
  Tiktok: FaTiktok,
  FaTiktok,
  Whatsapp: FaWhatsapp,
  FaWhatsapp,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-primary-dark)] text-[var(--color-text-inverse)] pt-16 pb-8 mt-0"
      aria-label="تذييل الصفحة"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src={siteConfig.brand.logoPath}
                alt={siteConfig.brand.name}
                className="h-8 w-auto brightness-0 invert"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <span
                className="text-2xl font-black text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {siteConfig.brand.name}
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              {siteConfig.brand.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold mb-4 text-[var(--color-accent)]">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link to="/booking" className="hover:text-white transition-colors">احجز الآن</Link></li>
              {siteConfig.trial.enabled && (
                <li>
                  <Link to="/booking?service=free-trial" className="hover:text-white transition-colors">
                    جلسة مجانية
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold mb-4 text-[var(--color-accent)]">تواصل معنا</h3>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-4"
            >
              <Mail size={16} />
              {siteConfig.contact.email}
            </a>
            <div className="flex items-center gap-3">
              {siteConfig.social.map((s) => {
                const Icon = iconMap[s.icon];
                return Icon ? (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          © {year} {siteConfig.brand.fullName}. جميع الحقوق محفوظة.
        </p>
      </Container>
    </footer>
  );
}
