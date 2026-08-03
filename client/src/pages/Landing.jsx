import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Landing.css';

import bgHero from '/notes.jpg';
import bgPerformance from '/performance_bg.jpg';
import bgSecurity from '/security_bg.jpg';
import bgCta from '/cta_bg.jpg';

const Landing = () => {
  const heroTheme = {
    backgroundImage: `url(${bgHero})`,
    "--dynamic-blur": "1px",
    "--dynamic-text": "#fff",
    "--accent": "#3b81f6",
    "--accent-hover": "#2563eb",
    "--dynamic-font": '"Inter", sans-serif',
    "--dynamic-blur": "10px",
  };

  const performanceTheme = {
    backgroundImage: `url(${bgPerformance})`,
    "--dynamic-text": "#fff",
    "--accent": "#2563eb",
    "--dynamic-accent": "#2563eb",
    "--dynamic-font": '"Inter", sans-serif',
    "--dynamic-blur": "10px",
  };

  const securityTheme = {
    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%), url(${bgSecurity})`,
    "--dynamic-text": "#fff",
    "--accent": "#3b81f6",
    "--accent-hover": "#2563eb",
    "--dynamic-font": '"Inter", sans-serif',
    "--dynamic-blur": "4px",
  };

  const coaTheme = {
    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%), url(${bgCta})`,
    "--dynamic-text": "#fff",
    "--accent": "#3b81f6",
    "--accent-hover": "#2563eb",
    "--dynamic-font": '"Inter", sans-serif',
    "--dynamic-blur": "4px",
  };

  return (
    <div className="landing-container">

      {/* Slide 1: Hero */}
      <section
        className="landing-slide hero-slide"
        style={{
          ...heroTheme,
        }}
      >
        <div className="slide-content">
          <div className="badge">Platform v2.0</div>
          <h1 className="slide-title">
            Simplify your workflow. <br />
            <span className="gradient-text">Build beautiful things.</span>
          </h1>
          <p className="slide-subtitle">
            An all-in-one platform engineered for modern production teams. Monitor analytics, deploy updates, and manage pipelines smoothly from a single interface.
          </p>
          <div className="slide-actions">
            <Link to="/signup" className="btn-primary">Start Free Trial</Link>
            <Link to="/login" className="btn-secondary">Sign In to Account →</Link>
          </div>
        </div>
        <div className="scroll-indicator">Scroll down ↓</div>
      </section>

      {/* Slide 2: Core Metrics / Performance */}
      <section
        className="landing-slide feature-slide"
        style={{
          ...performanceTheme,
        }}
      >
        <div className="slide-content split-layout">
          <div className="text-side">
            <span className="badge">01 | PERFORMANCE</span>
            <h2>Lightning Speed Edge Execution</h2>
            <p>
              Optimized structural components running at sub-millisecond speeds globally. No configuration required, fully managed data pipelining out of the box.
            </p>
          </div>
          <div className="visual-side">
            <div className="metric-box">
              <span className="metric-num">99.9%</span>
              <span className="metric-label">Global Uptime Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: Security */}
      <section
        className="landing-slide security-slide"
        style={{
          ...securityTheme,
        }}
      >
        <div className="slide-content split-layout reverse">
          <div className="text-side">
            <span className="badge">02 // INTEGRITY</span>
            <h2>Bank-Grade Security Baseline</h2>
            <p>
              End-to-end data encryption with fully integrated zero-trust access permissions. Your structural database integrity remains fully secure.
            </p>
          </div>
          <div className="visual-side">
            <div className="shield-graphic">
              <img src="/security.svg" alt="Security Shield" />
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Call to Action */}
      <section
        className="landing-slide cta-slide"
        style={{
          ...coaTheme,
        }}
      >
        <div className="slide-content centered-layout">
          <span className="slide-number">03 // GET STARTED</span>
          <h2>Ready to supercharge your build architecture?</h2>
          <p>Create your modern production dashboard workspace in seconds.</p>
          <div className="slide-actions">
            <Link to="/signup" className="btn-primary large">Create Free Account</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;