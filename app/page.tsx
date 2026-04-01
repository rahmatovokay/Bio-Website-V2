"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const DEFAULT_VOLUME = 0.07;

const panels = {
  info: {
    title: "инфо",
    eyebrow: "about",
    icon: "/octopus.svg",
    lines: [
      <>
        16 y.o from <Image src="/pirate.svg" alt="" width={16} height={16} aria-hidden="true" className="mr-1 inline-block h-4 w-4 align-[-2px]" />
        <br />
        frontend & backend dev
      </>
    ],
  },
  links: {
    title: "ссылки",
    eyebrow: "socials",
    icon: "/link.svg",
    lines: [
      <>
        <a
          href="https://t.me/rahmatov_owner"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-white/15"
        >
          <Image
            src="/telegram.svg"
            alt=""
            width={16}
            height={16}
            className="h-5 w-5"
          />
        </a>
        <a
          href="https://github.com/rahmatovokay"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-white/15"
        >
          <Image
            src="/github.svg"
            alt=""
            width={16}
            height={16}
            className="h-5 w-5"
          />
        </a>
      </>
    ],
  },
} as const;

type PanelKey = keyof typeof panels;

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [renderedPanel, setRenderedPanel] = useState<PanelKey>("info");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = DEFAULT_VOLUME;
    }
  }, []);

  function toggleSound() {
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);

    if (videoRef.current) {
      if (!nextMuted) {
        videoRef.current.volume = DEFAULT_VOLUME;
      }
      videoRef.current.muted = nextMuted;
    }
  }

  function togglePanel(panel: PanelKey) {
    if (activePanel === panel) {
      setActivePanel(null);
      return;
    }

    setRenderedPanel(panel);
    setActivePanel(panel);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео
      </video>

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 min-h-screen">
        <div className="flex min-h-screen items-center justify-center px-6 py-16">
          <section className="relative flex w-full max-w-5xl flex-col items-center text-white">
            <h1 className="font-regular text-5xl font-black lowercase tracking-[0.08em] text-white sm:text-7xl md:text-8xl">
              rahmatov
            </h1>

            <div className="font-unbound mt-6 flex w-full max-w-3xl items-center justify-center gap-5">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] sm:text-[11px]">
                <button
                  type="button"
                  aria-expanded={activePanel === "info"}
                  aria-controls="bio-panel"
                  onClick={() => togglePanel("info")}
                  className={`rounded-full px-1 py-1 transition ${
                    activePanel === "info"
                      ? "text-white"
                      : "text-white/45 hover:text-white/75"
                  }`}
                >
                  инфо
                </button>

                <span aria-hidden="true" className="text-white/35">
                  |
                </span>

                <button
                  type="button"
                  aria-expanded={activePanel === "links"}
                  aria-controls="bio-panel"
                  onClick={() => togglePanel("links")}
                  className={`rounded-full px-1 py-1 transition ${
                    activePanel === "links"
                      ? "text-white"
                      : "text-white/45 hover:text-white/75"
                  }`}
                >
                  ссылки
                </button>
              </div>
            </div>

            <div className="font-unbound pointer-events-none absolute left-1/2 top-full z-20 mt-4 w-full max-w-104 -translate-x-1/2 px-2 sm:max-w-md">
              <div
                id="bio-panel"
                className={`pointer-events-auto w-full rounded-3xl border border-white/20 bg-black/45 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 ease-out sm:p-5 ${
                  activePanel
                    ? "opacity-100 translate-y-0"
                    : "pointer-events-none opacity-0 translate-y-8"
                } ${
                  (activePanel ?? renderedPanel) === "info"
                    ? "md:translate-x-14"
                    : (activePanel ?? renderedPanel) === "links"
                      ? "md:-translate-x-14"
                      : ""
                }`}
              >
                <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/60">
                  {panels[renderedPanel].icon ? (
                    <Image
                      src={panels[renderedPanel].icon}
                      alt=""
                      aria-hidden="true"
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5"
                    />
                  ) : null}
                  <span>{panels[renderedPanel].eyebrow}</span>
                </div>

                <div className="space-y-2 text-balance text-[13px] leading-6 text-white/92 sm:text-sm">
                  {panels[renderedPanel].lines.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!isMuted}
          aria-label={isMuted ? "Enable background video sound" : "Mute background video sound"}
          className="absolute right-5 bottom-5 rounded-full border border-white/20 bg-black/45 px-2 py-2 text-sm text-white backdrop-blur-md transition hover:bg-black/60"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </main>
  );
}
