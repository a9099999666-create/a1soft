"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Backdrop } from "@/components/backdrop";
import { Channels } from "@/components/channels";
import { copy, type Lang } from "@/lib/i18n";

type HomePageProps = {
  visualStatic: boolean;
};

export function HomePage({ visualStatic }: HomePageProps) {
  const [lang, setLang] = useState<Lang>("en");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = copy[lang];
  const live = motionReady && !visualStatic && !reduceMotion;

  useEffect(() => {
    const saved = window.localStorage.getItem("a1soft-lang");
    if (saved === "en" || saved === "ru") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(mq.matches);
      setMotionReady(true);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function chooseLang(next: Lang) {
    setLang(next);
    window.localStorage.setItem("a1soft-lang", next);
  }

  return (
    <>
      <Backdrop live={live} label={t.visualLabel} />
      <div className={live ? "site is-live" : "site"}>
        <a className="skip" href="#about">
          {t.skip}
        </a>

        <header className={scrolled ? "masthead is-scrolled" : "masthead"}>
          <a className="brand" href="#top" aria-label="A1Soft">
            <span className="mark">
              <span className="mark-orbit" aria-hidden />
              <span className="mark-core">
                <Image
                  className="brand-mark"
                  src="/brand/a1-mark.png"
                  alt=""
                  width={120}
                  height={92}
                  unoptimized
                  priority
                />
                <span className="mark-shine" aria-hidden />
              </span>
            </span>
            <span className="brand-word" aria-hidden>
              a<span>1</span>soft
            </span>
          </a>
          <nav className="nav" aria-label="A1Soft">
            <a href="#about">{t.aboutNav}</a>
            <a href="#contact">{t.contactNav}</a>
            <div className="lang" role="group" aria-label={t.langGroup}>
              <button
                type="button"
                aria-pressed={lang === "ru"}
                onClick={() => chooseLang("ru")}
              >
                RU
              </button>
              <span aria-hidden>/</span>
              <button
                type="button"
                aria-pressed={lang === "en"}
                onClick={() => chooseLang("en")}
              >
                EN
              </button>
            </div>
          </nav>
        </header>

        <section className="hero-screen">
          <h1 className="headline">
            {t.headline[0]}
            <br />
            {lineWithDot(t.headline[1])}
          </h1>
          <div className="hero-space" />
          <div className="philosophy" aria-labelledby="philosophy-label">
            <p id="philosophy-label" className="eyebrow">
              {t.philosophyLabel}
            </p>
            <p className="philosophy-text">
              {t.philosophy[0]}
              <br />
              {t.philosophy[1]}
            </p>
          </div>
        </section>

        <section className="sheet">
          <div className="sheet-grid">
            <article id="about" aria-labelledby="about-title">
              <h2 id="about-title">{t.aboutTitle}</h2>
              <p className="about-lead">{t.aboutLead}</p>
              {t.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </article>
            <aside id="contact" aria-labelledby="contact-title">
              <h2 id="contact-title">{t.contactTitle}</h2>
              <p className="contact-lead">{t.contactLead}</p>
              <Channels lang={lang} />
            </aside>
          </div>
          <footer className="colophon">{t.footer}</footer>
        </section>
      </div>
    </>
  );
}

function lineWithDot(line: string) {
  if (!line.endsWith(".")) return line;
  return (
    <>
      {line.slice(0, -1)}
      <span className="headline-dot">.</span>
    </>
  );
}
