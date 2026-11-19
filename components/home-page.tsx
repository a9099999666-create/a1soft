"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Backdrop } from "@/components/backdrop";
import { copy, type Lang } from "@/lib/i18n";

type HomePageProps = {
  visualStatic: boolean;
};

export function HomePage({ visualStatic }: HomePageProps) {
  const [lang, setLang] = useState<Lang>("ru");
  const [reduceMotion, setReduceMotion] = useState(false);
  const t = copy[lang];
  const live = !visualStatic && !reduceMotion;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <Backdrop live={live} label={t.visualLabel} />
      <div className="site">
      <a className="skip" href="#about">
        {t.skip}
      </a>

      <header className="masthead">
        <a className="brand" href="#top" aria-label="A1Soft">
          <Image
            className="brand-mark"
            src="/brand/a1-mark.png"
            alt=""
            width={120}
            height={92}
            unoptimized
            priority
          />
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
              onClick={() => setLang("ru")}
            >
              RU
            </button>
            <span aria-hidden> / </span>
            <button
              type="button"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
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
          {t.headline[1]}
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

      <section className="panel" id="about" aria-labelledby="about-title">
        <h2 id="about-title">{t.aboutTitle}</h2>
        {t.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section className="panel" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">{t.contactTitle}</h2>
        <p>{t.contactLead}</p>
        {t.contact.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <footer className="colophon">{t.footer}</footer>
      </div>
    </>
  );
}
