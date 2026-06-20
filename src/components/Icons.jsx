// Lightweight inline icon set (no external dependency).
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = ({ path, size = 20, ...rest }) => (
  <svg {...base} width={size} height={size} {...rest}>
    {path}
  </svg>
)

export const HomeIcon = (p) => (
  <Icon path={<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>} {...p} />
)
export const ServerIcon = (p) => (
  <Icon path={<><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><path d="M7 7h.01M7 17h.01" /></>} {...p} />
)
export const CodeIcon = (p) => (
  <Icon path={<><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m13 6-2 12" /></>} {...p} />
)
export const ChipIcon = (p) => (
  <Icon path={<><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>} {...p} />
)
export const UserIcon = (p) => (
  <Icon path={<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>} {...p} />
)
export const CardsIcon = (p) => (
  <Icon path={<><rect x="3" y="5" width="13" height="16" rx="2" /><path d="M8 3h11a2 2 0 0 1 2 2v13" /></>} {...p} />
)
export const QuizIcon = (p) => (
  <Icon path={<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" /><path d="M12 17h.01" /></>} {...p} />
)
export const PlayIcon = (p) => (
  <Icon path={<><path d="m6 4 14 8-14 8V4z" /></>} {...p} />
)
export const SunIcon = (p) => (
  <Icon path={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>} {...p} />
)
export const MoonIcon = (p) => (
  <Icon path={<><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></>} {...p} />
)
export const CheckIcon = (p) => (
  <Icon path={<><path d="m5 12 5 5L20 7" /></>} {...p} />
)
export const StarIcon = (p) => (
  <Icon path={<><path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.6 1-6L3.3 9.4l6-.9L12 3z" /></>} {...p} />
)
export const MenuIcon = (p) => (
  <Icon path={<><path d="M4 6h16M4 12h16M4 18h16" /></>} {...p} />
)
export const CloseIcon = (p) => (
  <Icon path={<><path d="M6 6l12 12M18 6 6 18" /></>} {...p} />
)
export const ArrowIcon = (p) => (
  <Icon path={<><path d="M5 12h14M13 6l6 6-6 6" /></>} {...p} />
)
export const RefreshIcon = (p) => (
  <Icon path={<><path d="M21 12a9 9 0 1 1-2.6-6.4" /><path d="M21 3v5h-5" /></>} {...p} />
)
export const SearchIcon = (p) => (
  <Icon path={<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>} {...p} />
)
export const LayersIcon = (p) => (
  <Icon path={<><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5" /></>} {...p} />
)
export const BeakerIcon = (p) => (
  <Icon path={<><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" /><path d="M7.5 14h9" /></>} {...p} />
)
export const ChevronIcon = (p) => (
  <Icon path={<><path d="m9 6 6 6-6 6" /></>} {...p} />
)
export const BookIcon = (p) => (
  <Icon path={<><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z" /><path d="M19 17H6a2 2 0 0 0-2 2" /></>} {...p} />
)
