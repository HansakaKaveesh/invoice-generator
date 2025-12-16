"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { FaHeart, FaBirthdayCake } from "react-icons/fa";
import confetti from "canvas-confetti";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // intro with fireworks
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  // Close intro & start music (MOBILE‑SAFE: runs directly in click handler)
  const handleCloseIntro = () => {
    // Start audio first, then hide the overlay
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log("Birthday music started");
        })
        .catch((err) => {
          console.log("Audio play blocked or failed:", err);
        });
    }
    setShowIntro(false);
  };

  // Run fireworks while the intro is visible
  useEffect(() => {
    if (!showIntro) return;

    const duration = 3500; // ms
    const end = Date.now() + duration;
    let animationFrameId: number | undefined;

    const colors = ["#fecaca", "#fbbf24", "#fb7185", "#e0f2fe", "#c4b5fd"];

    const frame = () => {
      confetti({
        particleCount: 40,
        spread: 70,
        startVelocity: 55,
        ticks: 70,
        gravity: 0.9,
        scalar: 0.9,
        colors,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
      });

      if (Date.now() < end) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };

    frame();

    // If user doesn't tap, just hide intro after fireworks (no music)
    const timeoutId = setTimeout(() => {
      setShowIntro(false);
    }, duration + 300);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [showIntro]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-700 via-pink-500 to-amber-300 flex items-center justify-center px-3 sm:px-4 md:px-8 py-6 sm:py-10">
      {/* Hidden audio player for birthday music */}
      <audio
        ref={audioRef}
        src="/birthday.mp3"
        preload="auto"
        loop
      />

      {/* Soft background glow */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-full bg-amber-300/40 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_60%)]" />

      {/* Intro "Happy Birthday" overlay with fireworks */}
      {showIntro && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
          onClick={handleCloseIntro} // tap anywhere: close + start music
        >
          <div className="flex flex-col items-center justify-center text-center max-w-xs sm:max-w-md">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.18em] sm:tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-rose-300 drop-shadow-[0_0_35px_rgba(255,255,255,0.75)] leading-tight">
              Happy&nbsp;Birthday
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-rose-100 leading-snug">
              To the most special woman in our lives
            </p>
            <p className="mt-1 text-[11px] sm:text-xs text-rose-200/80">
              (Tap anywhere to open your card & start the music)
            </p>
          </div>
        </div>
      )}

      {/* Responsive container: narrow on mobile, wider on desktop */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-3xl mx-auto relative">
        {/* Header text */}
        <div className="mb-4 sm:mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 sm:px-6 py-1.5 text-xs sm:text-sm text-pink-50 shadow-sm backdrop-blur">
            <FaBirthdayCake className="text-amber-200" />
            <span className="tracking-wide">For the most special woman</span>
          </div>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-pink-50/90">
            {isOpen
              ? "Tap the card to gently close it again."
              : "Tap the photo to open your birthday surprise for Mom."}
          </p>
        </div>

        {/* Gradient border wrapper – animation reduced on small screens */}
        <div
          onClick={handleToggle}
          className={`relative rounded-[1.75rem] sm:rounded-[2.2rem] bg-gradient-to-r from-pink-300 via-rose-400 to-amber-300 p-[2px] sm:p-[3px] shadow-2xl transition-transform duration-500 sm:duration-700 ${
            isOpen
              ? "sm:scale-105 md:scale-110 shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
              : "scale-100"
          }`}
        >
          {/* Actual card – height adapts per breakpoint */}
          <div className="relative h-[22rem] sm:h-[24rem] md:h-[26rem] lg:h-[28rem] overflow-hidden rounded-[1.6rem] sm:rounded-[2rem] bg-rose-50/95">
            {/* Inside message */}
            <div
              className={`absolute inset-0 z-0 px-5 sm:px-8 md:px-14 py-6 sm:py-8 md:py-10 flex flex-col justify-center transition-opacity duration-700 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="mb-4 sm:mb-6">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] text-rose-400 uppercase">
                  Happy Birthday, Mom
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
                  To the heart of our family
                </h2>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                Dear Mom,
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                On your special day, I just want to say thank you for your
                endless love, your patience, and your strength. You are the
                heart of our family and the person who has always believed in me.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-5 sm:mb-6 leading-relaxed">
                I am so grateful to call you my mother, and I love you more than
                words can ever say.
              </p>

              <p className="text-right text-sm sm:text-base md:text-lg font-semibold text-rose-500 flex items-center justify-end gap-1">
                With all my love,
                <span>your child</span>
                <FaHeart className="text-rose-400 animate-pulse" />
              </p>
            </div>

            {/* Photo cover that splits to both sides */}
            <div className="absolute inset-0 z-10 cursor-pointer">
              <div className="relative w-full h-full">
                {/* Left half */}
                <div
                  className={`absolute inset-y-0 left-0 w-1/2 overflow-hidden transition-transform duration-700 ease-out ${
                    isOpen ? "-translate-x-full" : "translate-x-0"
                  }`}
                >
                  <img
                    src="/mom1.jpg"
                    alt="Mom"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                </div>

                {/* Right half */}
                <div
                  className={`absolute inset-y-0 right-0 w-1/2 overflow-hidden transition-transform duration-700 ease-out ${
                    isOpen ? "translate-x-full" : "translate-x-0"
                  }`}
                >
                  <img
                    src="/mom2.jpg"
                    alt="Mom"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent" />
                </div>

                {/* Text overlay on the photo (only before open) */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white transition-opacity duration-500 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            </div>

            {/* Soft glow at bottom when open */}
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-rose-200/70 via-transparent to-transparent transition-opacity duration-700 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}