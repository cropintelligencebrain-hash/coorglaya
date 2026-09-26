import { motion, useReducedMotion } from 'framer-motion';

type KingfisherDancerProps = {
  isPlaying: boolean;
};

/**
 * An original White-throated Kingfisher illustration, informed by a CC0
 * reference photo: https://commons.wikimedia.org/wiki/File:White-throated_kingfisher_image_14.jpg
 */
export const KingfisherDancer = ({ isPlaying }: KingfisherDancerProps) => {
  const reducedMotion = useReducedMotion();
  const dances = isPlaying && !reducedMotion;
  const loop = { duration: 1.85, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <div className="relative h-44 w-40 sm:h-48 sm:w-48" aria-hidden="true">
      {dances && (
        <motion.div
          className="absolute inset-5 rounded-full bg-[#1A96AA]/20 blur-xl"
          animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.92, 1.08, 0.92] }}
          transition={{ ...loop, duration: 1.85 }}
        />
      )}
      <svg viewBox="0 0 180 180" className="relative h-full w-full overflow-visible drop-shadow-[0_12px_18px_rgba(19,117,134,0.22)]">
        <defs>
          <linearGradient id="kingfisher-wing" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#197F9A" />
            <stop offset="0.55" stopColor="#075568" />
            <stop offset="1" stopColor="#092C35" />
          </linearGradient>
          <linearGradient id="kingfisher-chest" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#AEE2E8" />
            <stop offset="1" stopColor="#63BDCA" />
          </linearGradient>
          <linearGradient id="kingfisher-branch" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#81502B" />
            <stop offset="0.5" stopColor="#C39157" />
            <stop offset="1" stopColor="#754422" />
          </linearGradient>
        </defs>

        <path d="M18 151 C53 147 119 151 163 148 C168 148 169 154 163 156 C111 160 56 157 18 160 C13 160 13 152 18 151Z" fill="url(#kingfisher-branch)" />
        <path d="M30 153 C67 151 120 155 151 152" fill="none" stroke="#E7CC9E" strokeLinecap="round" opacity="0.55" />
        <path d="M132 151 C147 139 159 138 170 141 C157 151 146 154 132 151Z" fill="#137586" opacity="0.7" />

        <motion.g
          animate={dances ? { rotate: [-8, 5, -6, 8, -8], y: [0, -5, 0, -4, 0] } : { rotate: 0, y: 0 }}
          transition={loop}
          style={{ transformOrigin: '96px 145px' }}
        >
          <motion.g
            animate={dances ? { rotate: [-9, 12, -9], x: [0, 3, 0] } : { rotate: 0, x: 0 }}
            transition={{ ...loop, duration: 1.55 }}
            style={{ transformOrigin: '122px 110px' }}
          >
            <path d="M111 110 C142 119 150 134 154 147 C138 140 125 134 105 120Z" fill="#062B34" />
            <path d="M105 113 C132 126 136 141 139 151 C123 140 112 133 98 120Z" fill="#0A6277" />
          </motion.g>

          <path d="M77 76 C56 91 61 128 87 142 C111 153 135 134 128 105 C124 85 106 73 77 76Z" fill="#8A512F" />
          <path d="M73 82 C62 101 67 127 89 139 C85 120 84 101 93 84Z" fill="url(#kingfisher-chest)" />
          <path d="M77 92 C71 108 76 123 86 132" fill="none" stroke="#FFF" strokeLinecap="round" strokeWidth="3" opacity="0.62" />

          <motion.g
            animate={dances ? { rotate: [0, -19, 6, -13, 0], scaleY: [1, 1.08, 0.96, 1.05, 1] } : { rotate: 0, scaleY: 1 }}
            transition={loop}
            style={{ transformOrigin: '106px 93px' }}
          >
            <path d="M99 83 C129 80 143 97 133 127 C120 137 99 126 91 104 C90 93 94 87 99 83Z" fill="url(#kingfisher-wing)" stroke="#073B49" strokeWidth="2" />
            <path d="M105 92 C119 101 126 111 128 121 M101 99 C112 110 117 119 118 129 M98 105 C105 114 109 122 108 130" fill="none" stroke="#62C4D0" strokeLinecap="round" strokeWidth="3" opacity="0.7" />
          </motion.g>

          <motion.g
            animate={dances ? { rotate: [-10, 7, -7, 10, -10], x: [0, -2, 0, 2, 0], y: [0, -3, 0, -2, 0] } : { rotate: -2, x: 0, y: 0 }}
            transition={{ ...loop, duration: 1.85 }}
            style={{ transformOrigin: '77px 78px' }}
          >
            <circle cx="76" cy="61" r="29" fill="#8A512F" />
            <path d="M51 55 C64 45 88 44 103 55 L99 68 C83 61 67 62 51 70Z" fill="#135B72" />
            <path d="M61 36 C68 23 76 23 79 38 M74 34 C83 21 91 25 89 41" fill="none" stroke="#2B8BA0" strokeLinecap="round" strokeWidth="5" />
            <path d="M52 62 C62 54 79 53 90 57" fill="none" stroke="#082A33" strokeLinecap="round" strokeWidth="5" opacity="0.85" />
            <circle cx="59" cy="58" r="8" fill="#FFF" />
            <circle cx="58" cy="59" r="5" fill="#10262C" />
            <circle cx="56" cy="56" r="2" fill="#FFF" />
            <path d="M49 61 L8 70 L49 75Z" fill="#E06443" stroke="#91402D" strokeWidth="1.5" />
            <motion.path
              d="M49 74 L14 76 L49 81Z"
              fill="#B54837"
              stroke="#91402D"
              strokeWidth="1"
              animate={dances ? { rotate: [0, 5, 0, 4, 0] } : { rotate: 0 }}
              transition={{ ...loop, duration: 1.85 }}
              style={{ transformOrigin: '49px 74px' }}
            />
          </motion.g>
          <path d="M84 138 L84 151 M79 151 L84 147 M89 151 L84 147 M104 140 L104 151 M99 151 L104 147 M109 151 L104 147" stroke="#A3733E" strokeLinecap="round" strokeWidth="3" />
        </motion.g>
      </svg>
    </div>
  );
};
