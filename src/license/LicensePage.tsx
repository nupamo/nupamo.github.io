import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Minus } from 'lucide-react';
import { detectLicenseLanguage, isLicenseLanguage, languageOptions, licenseContent } from './content';
import type { LicenseLanguage } from './content';
import './license.css';

function currentLanguage(): LicenseLanguage {
  const requested = new URLSearchParams(window.location.search).get('lang');
  return isLicenseLanguage(requested) ? requested : detectLicenseLanguage(navigator.languages);
}

export default function LicensePage() {
  const [language, setLanguage] = useState(currentLanguage);
  const content = licenseContent[language];

  useEffect(() => {
    const syncLanguage = () => setLanguage(currentLanguage());
    window.addEventListener('popstate', syncLanguage);
    return () => window.removeEventListener('popstate', syncLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${content.title} · nupamo`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.description);
  }, [language, content]);

  function selectLanguage(next: LicenseLanguage) {
    if (next === language) return;
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.pushState(null, '', url);
    setLanguage(next);
  }

  return (
    <div className="license-page">
      <header className="license-topbar">
        <a href="/" className="license-home"><ArrowLeft size={16} aria-hidden="true" /><span>nupamo</span><span className="license-home-label">{content.home}</span></a>
        <nav className="license-languages" aria-label={content.language}>
          {languageOptions.map(option => (
            <button key={option.code} type="button" lang={option.code} aria-pressed={language === option.code} onClick={() => selectLanguage(option.code)}>
              {option.label}
            </button>
          ))}
        </nav>
      </header>

      <main id="main-content">
        <div className="license-hero">
          <p className="license-eyebrow">NUPAMO / LICENSE</p>
          <h1>{content.title}</h1>
          <p className="license-description">{content.description}</p>
        </div>

        <section className="license-introduction" aria-labelledby="why-title">
          <h2 id="why-title">{content.introductionTitle}</h2>
          {content.introduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section className="license-free" aria-labelledby="free-title">
          <div className="license-section-heading"><h2 id="free-title">{content.freeTitle}</h2><span className="license-mit-badge">MIT</span></div>
          <p>{content.freeDescription}</p>
          <a href="https://opensource.org/license/mit" target="_blank" rel="noopener noreferrer">{content.mitLink}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>

        <section className="license-paid" aria-labelledby="paid-title">
          <h2 id="paid-title">{content.paidTitle}</h2>
          <p className="license-paid-description">{content.paidDescription}</p>

          <section className="license-rules license-allowed" aria-labelledby="allowed-title">
            <h3 id="allowed-title"><Check size={20} aria-hidden="true" />{content.allowedTitle}</h3>
            <ul>{content.allowed.map(rule => (
              <li key={rule.text}><Check size={16} aria-hidden="true" /><div><p>{rule.text}</p>{rule.detail && <p className="license-rule-detail">{rule.detail}</p>}</div></li>
            ))}</ul>
          </section>

          <section className="license-rules license-prohibited" aria-labelledby="prohibited-title">
            <h3 id="prohibited-title"><Minus size={20} aria-hidden="true" />{content.prohibitedTitle}</h3>
            <ul>{content.prohibited.map(rule => (
              <li key={rule.text}><Minus size={16} aria-hidden="true" /><p>{rule.text}</p></li>
            ))}</ul>
          </section>
          <p className="license-exceptions">{content.exceptions}</p>
        </section>
      </main>

      <footer className="license-footer"><a href="/">nupamo</a><span>© 2026 nupamo</span></footer>
    </div>
  );
}
