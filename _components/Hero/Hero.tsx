"use client";

import React, { useState } from 'react';
import {
  ImagePlay,
  ArrowRight,
  ArrowUpRight,
  LayoutDashboard,
  UserCircle,
  Home,
  FormInput,
  ShoppingCart,
  Zap,
  Check,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import './Hero.css';

const SUGGESTIONS = [
  { label: 'Dashboard',         icon: LayoutDashboard },
  { label: 'SignUp Form',       icon: FormInput       },
  { label: 'Hero',              icon: Home            },
  { label: 'User Profile Card', icon: UserCircle      },
  { label: 'Landing Page',      icon: Zap             },
  { label: 'E-Commerce',        icon: ShoppingCart    },
];

const TRUST = [
  'No credit card required',
  'Export clean code',
  'Powered by AI',
];

const MAX_CHARS = 500;

export default function Hero() {
  const [prompt, setPrompt] = useState('');
  const hasPrompt = prompt.trim().length > 0;

  const handleSuggestion = (label: string) => {
    setPrompt(`A ${label.toLowerCase()} page with modern design`);
  };

  return (
    <div className="hero-page">
      {/* Atmosphere */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />
      <div className="hero-grid"           aria-hidden="true" />

      <section className="hero-section">

        {/* ── Announcement chip ── */}
        <div className="hero-chip">
          <span className="hero-chip-badge">New</span>
          AI-powered design generation is here
          <ArrowUpRight className="hero-chip-arrow" />
        </div>

        {/* ── Heading ── */}
        <h1 className="hero-h1">
          What should we{' '}
          <span className="hero-h1-gradient">design?</span>
        </h1>

        {/* ── Subheading ── */}
        <p className="hero-sub">
          Generate, edit and explore designs with AI.
          Export to production-ready code in seconds.
        </p>

        {/* ── Input card ── */}
        <div className={`hero-input-card${hasPrompt ? ' has-content' : ''}`}>
          <div className="hero-textarea-shell">
            <div className="hero-textarea-label">Prompt</div>
            <Textarea
              className="hero-textarea"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Describe your page design... e.g. a SaaS landing page with a bold hero, clean pricing section, and modern glass cards"
              rows={4}
            />
          </div>

          <div className="hero-input-footer">
            {/* Left icon buttons */}
            <div className="hero-input-actions">
              <button className="hero-icon-btn" title="Attach image" type="button">
                <ImagePlay />
              </button>
              <button className="hero-icon-btn" title="AI enhance prompt" type="button">
                <Wand2 />
              </button>
              <button className="hero-icon-btn" title="Sparkle" type="button">
                <Sparkles />
              </button>
            </div>

            {/* Char count */}
            {hasPrompt && (
              <span className="hero-char-count">
                {prompt.length}/{MAX_CHARS}
              </span>
            )}

            {/* Generate */}
            <Button className="hero-submit-btn" type="button">
              Generate
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* ── Suggestion chips ── */}
        <div className="hero-suggestions">
          <span className="hero-suggest-label">Try:</span>
          {SUGGESTIONS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="hero-suggest-chip"
              type="button"
              onClick={() => handleSuggestion(label)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>

        {/* ── Trust strip ── */}
        <div className="hero-trust">
          {TRUST.map((item, i) => (
            <React.Fragment key={item}>
              <div className="hero-trust-item">
                <Check />
                {item}
              </div>
              {i < TRUST.length - 1 && <div className="hero-trust-dot" />}
            </React.Fragment>
          ))}
        </div>

      </section>
    </div>
  );
}