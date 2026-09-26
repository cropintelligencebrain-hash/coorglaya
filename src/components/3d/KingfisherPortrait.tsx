/**
 * A static SVG frame around a CC0 photograph of a White-throated Kingfisher.
 * Source: https://commons.wikimedia.org/wiki/File:White-throated_kingfisher_image_14.jpg
 */
export const KingfisherPortrait = () => (
  <svg
    viewBox="0 0 240 240"
    className="h-44 w-44 overflow-visible drop-shadow-[0_10px_18px_rgba(19,117,134,0.2)] sm:h-48 sm:w-48"
    role="img"
    aria-label="White-throated Kingfisher in flight"
  >
    <defs>
      <clipPath id="kingfisher-photo-clip">
        <circle cx="120" cy="112" r="96" />
      </clipPath>
      <radialGradient id="kingfisher-photo-vignette" cx="50%" cy="42%" r="62%">
        <stop offset="68%" stopColor="#0E4652" stopOpacity="0" />
        <stop offset="100%" stopColor="#0E4652" stopOpacity="0.38" />
      </radialGradient>
    </defs>
    <circle cx="120" cy="112" r="101" fill="#E5F3F5" stroke="#137586" strokeWidth="2" />
    <image
      href="/images/birds/white-throated-kingfisher.webp"
      x="24"
      y="16"
      width="192"
      height="192"
      preserveAspectRatio="xMidYMid slice"
      clipPath="url(#kingfisher-photo-clip)"
    />
    <circle cx="120" cy="112" r="96" fill="url(#kingfisher-photo-vignette)" pointerEvents="none" />
    <path d="M31 207 C78 201 166 205 211 202" fill="none" stroke="#8C5F2E" strokeLinecap="round" strokeWidth="8" />
    <path d="M41 205 C85 202 159 204 202 201" fill="none" stroke="#D8C3AA" strokeLinecap="round" strokeWidth="1.5" opacity="0.68" />
  </svg>
);
