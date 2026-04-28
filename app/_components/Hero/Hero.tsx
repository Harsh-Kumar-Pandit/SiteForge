"use client";

import React, { useState, useEffect, useRef } from "react";
import {
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
  ImagePlay,
  Loader2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import "./Hero.css";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/* ── Data ── */
const SUGGESTIONS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "SignUp Form", icon: FormInput },
  { label: "Hero", icon: Home },
  { label: "User Profile Card", icon: UserCircle },
  { label: "Landing Page", icon: Zap },
  { label: "E-Commerce", icon: ShoppingCart },
];

const TRUST = ["No credit card required", "Export clean code", "Powered by AI"];

const WAND_PHRASES = [
  "A stunning SaaS dashboard with dark glass cards, indigo accents and live chart widgets",
  "A bold e-commerce product page with floating 3D preview, size selector and sticky cart",
  "A minimalist portfolio with full-bleed project grid, smooth scroll, and elegant typography",
  "A modern fintech app dashboard with real-time charts, transaction feed, and dark theme",
];

const MAX_CHARS = 500;

const ORBS = [
  {
    rx: 0.5,
    ry: -0.12,
    r: 340,
    color: "rgba(99,102,241,",
    a: 0.12,
    phase: 0,
    speed: 0.00065,
  },
  {
    rx: 0.88,
    ry: 0.35,
    r: 230,
    color: "rgba(6,182,212,",
    a: 0.09,
    phase: Math.PI / 2,
    speed: 0.00085,
  },
  {
    rx: 0.1,
    ry: 0.7,
    r: 190,
    color: "rgba(99,102,241,",
    a: 0.07,
    phase: Math.PI,
    speed: 0.00105,
  },
  {
    rx: 0.75,
    ry: 0.85,
    r: 160,
    color: "rgba(6,182,212,",
    a: 0.06,
    phase: Math.PI * 1.5,
    speed: 0.0007,
  },
];

export default function Hero() {
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [genPulse, setGenPulse] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userInput, setUserInput] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const wandIdx = useRef(0);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasPrompt = prompt.trim().length > 0;
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const p = canvas!.parentElement!;
      canvas!.width = p.clientWidth || 900;
      canvas!.height = p.clientHeight || 700;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    function frame(t: number) {
      const { width: W, height: H } = canvas!;
      ctx.clearRect(0, 0, W, H);
      ORBS.forEach((o) => {
        const drift = Math.sin(t * o.speed + o.phase) * 24;
        const cx = W * o.rx,
          cy = H * o.ry + drift;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        g.addColorStop(0, o.color + o.a + ")");
        g.addColorStop(1, o.color + "0)");
        ctx.beginPath();
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      const sp = 28;
      for (let x = 0; x < W; x += sp) {
        for (let y = 0; y < H; y += sp) {
          const d = Math.sqrt((x - W / 2) ** 2 + (y - H * 0.18) ** 2);
          const al = Math.max(
            0,
            (1 - d / (Math.sqrt(W * W + H * H) * 0.42)) * 0.09,
          );
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,0,0,${al})`;
          ctx.fill();
        }
      }
      animRef.current = requestAnimationFrame(frame);
    }
    animRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  useEffect(
    () => () => {
      if (typeTimer.current) clearInterval(typeTimer.current);
    },
    [],
  );

  function typeText(str: string) {
    if (typeTimer.current) clearInterval(typeTimer.current);
    setIsTyping(true);
    setPrompt("");
    let i = 0;
    typeTimer.current = setInterval(() => {
      i++;
      setPrompt(str.slice(0, i));
      if (i >= str.length) {
        clearInterval(typeTimer.current!);
        typeTimer.current = null;
        setIsTyping(false);
      }
    }, 26);
  }

  function handleSuggestion(label: string) {
    typeText(`A ${label.toLowerCase()} page with modern design`);
  }
  function handleWand() {
    typeText(WAND_PHRASES[wandIdx.current++ % WAND_PHRASES.length]);
  }
  function handleGenerate() {
    setGenPulse(false);
    requestAnimationFrame(() => setGenPulse(true));
    setTimeout(() => setGenPulse(false), 900);
  }

  const CreateNewProject = async () => {
    setLoading(true);
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }

    try {
      const projectId = uuidv4();
      const frameId = generateRandomFrameNumber();
      const messages = [
        {
          role: "user",
          content: prompt,
        },
      ];

      const result = await axios.post("/api/projects", {
        projectId: projectId,
        frameId: frameId,
        messages: messages,
      });
      console.log(result);
      toast.success("Project created successfully!");
      router.push(`/playground/${projectId}?frame=${frameId}`);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className={`hero-page${mounted ? " hero-page--mounted" : ""}`}>
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      <section className="hero-section">
        {/* ── Chip ── */}
        <div className="hero-chip">
          <span className="hero-chip-badge">New</span>
          AI-powered design generation is here
          <ArrowUpRight className="hero-chip-arrow" size={13} />
        </div>

        {/* ── Heading ── */}
        <h1 className="hero-h1">
          What should we <span className="hero-h1-grad">design?</span>
        </h1>

        {/* ── Sub ── */}
        <p className="hero-sub">
          Turn your ideas into polished website layouts with AI in minutes.
        </p>

        {/* ── Prompt Card ── */}
        <div className={`hero-card${hasPrompt ? " hero-card--active" : ""}`}>
          <div className="hero-card-shell">
            <div className="hero-card-label">Prompt</div>
            <Textarea
              className="hero-textarea"
              value={prompt}
              onChange={(e) => {
                if (!isTyping) setPrompt(e.target.value.slice(0, MAX_CHARS));
              }}
              placeholder="Describe your page design... e.g. a SaaS landing page with a bold hero, clean pricing section, and modern glass cards"
              rows={4}
            />

           <Button
  className={`hero-gen-btn hero-gen-btn--corner${
    genPulse ? " hero-gen-btn--pulse" : ""
  }`}
  type="button"
  disabled={!prompt || loading}
  onClick={() => {
    handleGenerate();
    CreateNewProject();
  }}
>
  Generate
  {loading ? (
    <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
  ) : (
    <ArrowRight size={14} />
  )}
</Button>
          </div>

          <div className="hero-card-footer">
            <div className="hero-icon-row">
              <button
                className="hero-icon-btn"
                title="Attach image"
                type="button"
              >
                <ImagePlay size={15} />
              </button>
              <button
                className="hero-icon-btn hero-icon-btn--wand"
                title="AI enhance"
                type="button"
                onClick={handleWand}
              >
                <Wand2 size={15} />
              </button>
              <button className="hero-icon-btn" title="Sparkle" type="button">
                <Sparkles size={15} />
              </button>
            </div>

            {hasPrompt && (
              <span className="hero-char">
                {prompt.length}/{MAX_CHARS}
              </span>
            )}
          </div>
        </div>

        {/* ── Suggestions ── */}
        <div className="hero-chips">
          <span className="hero-chips-label">Try:</span>
          {SUGGESTIONS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="hero-chip2"
              type="button"
              onClick={() => handleSuggestion(label)}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Trust ── */}
        <div className="hero-trust">
          {TRUST.map((item, i) => (
            <React.Fragment key={item}>
              <div className="hero-trust-item">
                <Check size={13} />
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

const generateRandomFrameNumber = () => {
  const num = Math.floor(Math.random() * 1000000);
  return num;
};
