// GlareCard.js
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const GlareCard = () => {
  const cardRef = useRef(null);
  const isPointerInside = useRef(false);

  useEffect(() => {
    const card = cardRef.current;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      const rotateX = ((percentY - 50) / 5).toFixed(2);
      const rotateY = ((percentX - 50) / -5).toFixed(2);

      gsap.to(card, {
        "--m-x": `${percentX}%`,
        "--m-y": `${percentY}%`,
        "--r-x": `${rotateY}deg`,
        "--r-y": `${rotateX}deg`,
        "--opacity": 0.6,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleEnter = () => {
      isPointerInside.current = true;
    };

    const handleLeave = () => {
      isPointerInside.current = false;
      gsap.to(card, {
        "--r-x": "0deg",
        "--r-y": "0deg",
        "--opacity": 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerenter", handleEnter);
    card.addEventListener("pointerleave", handleLeave);

    return () => {
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerenter", handleEnter);
      card.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--opacity": 0,
  };

  return (
    <motion.div
      ref={cardRef}
      style={containerStyle}
      className="relative w-full max-w-[300px] aspect-[17/21] mx-auto my-10
        [contain:layout_style] [perspective:800px] transition-transform duration-300 ease-in-out"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="h-full w-full grid [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] transition-transform duration-300
          rounded-2xl overflow-hidden border border-slate-700 bg-slate-950"
      >
        {/* Background Glare */}
        <div
          className="absolute inset-0 opacity-[var(--opacity)] transition-opacity pointer-events-none z-10"
          style={{
            background: `radial-gradient(
              circle at var(--m-x) var(--m-y),
              rgba(255,255,255,0.4) 0%,
              rgba(255,255,255,0.1) 40%,
              transparent 80%
            )`,
          }}
        ></div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center text-white z-20 relative h-full w-full">
          <svg
            width="66"
            height="65"
            viewBox="0 0 66 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
          >
            <path
              d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
              stroke="currentColor"
              strokeWidth="15"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-white font-bold text-xl mt-4">Aceternity</p>
        </div>
      </div>
    </motion.div>
  );
};

export default GlareCard;
