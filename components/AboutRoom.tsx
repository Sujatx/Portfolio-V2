"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutRoom() {
  // === STATE HOOKS ===
  const [chessOpen, setChessOpen] = useState(false);
  const [barbellOpen, setBarbellOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const chamberRef = useRef(null);

  // === COMMON CARD STYLE ===
  const cardStyle =
    "absolute left-1/2 -top-6 transform -translate-x-1/2 -translate-y-full z-20 px-5 py-4 min-w-[180px] rounded-xl bg-black/95 border border-neutral-700/70 text-neutral-100 shadow";

  return (
    <div id="about" className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* === CHAMBER BOUNDARY === */}
      <div
        ref={chamberRef}
        className="relative w-[88vw] h-[78vh] flex flex-col items-center justify-start gap-20 mx-auto pt-16"
        style={{ maxWidth: "1200px", maxHeight: "800px" }}
      >
        {/* === HEADING === */}
        <motion.h1
          className="text-5xl font-extrabold text-neutral-100 mb-6 tracking-wide text-center leading-tight z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          When no one’s watching.<br />
          <span className="text-neutral-400 font-light italic">
            Who are you?
          </span>
        </motion.h1>

        {/* === OBJECTS WRAPPER (Holds all draggable objects) === */}
        <div className="relative flex flex-wrap items-center justify-center gap-16 mt-10 z-10">

          {/* ========================================================== */}
          {/* === 1️⃣ CHESS OBJECT START === */}
          {/* ========================================================== */}
          <motion.div
            drag
            dragConstraints={chamberRef}
            className="relative flex flex-col items-center w-fit cursor-pointer"
            style={{ width: 140, height: 140 }}
            onMouseEnter={() => setChessOpen(true)}
            onMouseLeave={() => setChessOpen(false)}
          >
            {/* Chess Card */}
            <AnimatePresence>
              {chessOpen && (
                <motion.div
                  className={cardStyle}
                  initial={{ opacity: 0, y: 18, scale: 0.89 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.93 }}
                  transition={{ duration: 0.22 }}
                >
                  <h2 className="text-base font-bold mb-2">Chess Stats</h2>
                  <p className="mb-1 text-xs">Lichess Blitz: 1835</p>
                  <p className="mb-1 text-xs">Rapid: 1740</p>
                  <p className="mb-1 text-xs">Favorite: Sicilian Defense</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chess Visual */}
            <motion.div
              className="bg-neutral-900/80 border border-neutral-800 rounded-xl shadow-lg flex items-center justify-center relative"
              initial={{ rotate: 0, scale: 0.96 }}
              animate={{ rotate: [0, 9, -7, 0], scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 8 }}
              whileHover={{ scale: 1.07 }}
              style={{ width: 140, height: 140 }}
            >
              <svg width="110" height="110" viewBox="0 0 110 110">
                <rect x="0" y="0" width="110" height="110" fill="#222" rx="15" />
                {[...Array(8)].map((_, row) =>
                  [...Array(8)].map((_, col) => (
                    <rect
                      key={row + '-' + col}
                      x={col * 13 + 7}
                      y={row * 13 + 7}
                      width={13}
                      height={13}
                      fill={(row + col) % 2 === 0 ? '#444' : '#191919'}
                      opacity={0.92}
                      rx={2}
                    />
                  ))
                )}
                <circle cx="35" cy="35" r="4" fill="#fafafa" opacity="0.75" />
                <circle cx="80" cy="80" r="5" fill="#bbb" opacity="0.8" />
              </svg>
            </motion.div>
          </motion.div>
          {/* === CHESS OBJECT END === */}

          {/* ========================================================== */}
          {/* === 2️⃣ BARBELL OBJECT START === */}
          {/* ========================================================== */}
          <motion.div
            drag
            dragConstraints={chamberRef}
            className="relative flex flex-col items-center w-fit cursor-pointer"
            style={{ width: 200, height: 120 }}
            onMouseEnter={() => setBarbellOpen(true)}
            onMouseLeave={() => setBarbellOpen(false)}
          >
            {/* Barbell Card */}
            <AnimatePresence>
              {barbellOpen && (
                <motion.div
                  className={cardStyle}
                  initial={{ opacity: 0, y: 18, scale: 0.89 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.93 }}
                  transition={{ duration: 0.22 }}
                >
                  <h2 className="text-base font-bold mb-2">Strength Stats</h2>
                  <div className="mb-1 text-xs">
                    Deadlift: <span className="font-mono font-semibold">160kg</span>
                  </div>
                  <div className="mb-1 text-xs">
                    Bench: <span className="font-mono font-semibold">115kg</span>
                  </div>
                  <div className="mb-1 text-xs">
                    Squat: <span className="font-mono font-semibold">145kg</span>
                  </div>
                  <div className="mb-1 text-xs">
                    Bodyweight: <span className="font-mono font-semibold">78kg</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Barbell Visual */}
            <motion.div
              className="flex items-center justify-center relative"
              initial={{ rotate: 0, scale: 0.97 }}
              animate={{ rotate: [0, -7, 10, 0], scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 10 }}
              whileHover={{ scale: 1.01, filter: 'drop-shadow(0 0 6px #eee)' }}
              style={{ width: 200, height: 120 }}
            >
              <img
                src="/bar.png"
                alt="Barbell"
                className="w-full h-full object-contain pointer-events-none select-none"
                style={{ filter: 'invert(1)' }}
              />
            </motion.div>
          </motion.div>
          {/* === BARBELL OBJECT END === */}

          {/* ========================================================== */}
          {/* === 3️⃣ BOOK OBJECT START === */}
          {/* ========================================================== */}
          <motion.div
            drag
            dragConstraints={chamberRef}
            className="relative flex flex-col items-center w-fit cursor-pointer"
            style={{ width: 180, height: 140 }}
            onMouseEnter={() => setBookOpen(true)}
            onMouseLeave={() => setBookOpen(false)}
          >
            {/* Book Card */}
            <AnimatePresence>
              {bookOpen && (
                <motion.div
                  className={cardStyle}
                  initial={{ opacity: 0, y: 18, scale: 0.89 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.93 }}
                  transition={{ duration: 0.22 }}
                >
                  <h2 className="text-base font-bold mb-2">Books That Shaped Me</h2>
                  <ul className="text-xs space-y-1">
                    <li><span className="font-semibold">Atomic Habits</span> — systems over goals.</li>
                    <li><span className="font-semibold">The Kite Runner</span> — guilt, redemption, mercy.</li>
                    <li><span className="font-semibold">Molecule of More</span> — dopamine, desire, drive.</li>
                    <li><span className="font-semibold">White Nights</span> — loneliness turned beauty.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Book Image */}
            <motion.img
              src="/book.png"
              alt="Book"
              className="w-full h-full object-contain rounded-md shadow-lg"
              initial={{ rotate: 0, scale: 0.96 }}
              animate={{ rotate: [0, -2, 2, 0], scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 8 }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
          {/* === BOOK OBJECT END === */}


          {/* ========================================================== */}
          {/* === 🧩 NEXT OBJECT SLOT (Add new object here) === */}
          {/* ========================================================== */}

        </div>
      </div>
    </div>
  );
}
