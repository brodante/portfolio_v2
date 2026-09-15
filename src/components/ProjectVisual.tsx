import type { ProjectVisualKind as Kind } from "@/i18n/types";

/** Art-directed inline SVG "cover art" per project. Pure vectors, theme-aware. */
export function ProjectVisual({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <div className={`relative overflow-hidden border border-line bg-bg-soft/70 ${className}`}>
      <svg viewBox="0 0 480 280" className="w-full h-full block" aria-hidden="true">
        {kind === "kryptboard" && <Kryptboard />}
        {kind === "kanji" && <Kanji />}
        {kind === "keyguardian" && <Keyguardian />}
        {kind === "chinatsu" && <Chinatsu />}
        {kind === "knowledge" && <Knowledge />}
      </svg>
    </div>
  );
}

const faint = { stroke: "var(--line-strong)" } as const;

function Kryptboard() {
  const keys: React.ReactNode[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 10; c++) {
      const hot = r === 1 && c === 6;
      keys.push(
        <rect
          key={`${r}-${c}`}
          x={24 + c * 44}
          y={150 + r * 36}
          width={36}
          height={28}
          fill={hot ? "var(--accent)" : "none"}
          stroke={hot ? "var(--accent)" : "var(--line-strong)"}
          strokeWidth="1"
        />,
      );
    }
  }
  return (
    <g>
      <text x="24" y="52" fill="var(--muted)" fontFamily="var(--ff-mono)" fontSize="13">
        $ kryptboard --emulate
      </text>
      <text x="24" y="80" fill="var(--accent)" fontFamily="var(--ff-mono)" fontSize="13">
        ▓▒░ xK9#f2::0x2c ▒▓ ¤77ab ⊕ poly1305 ░▒
      </text>
      <text x="24" y="108" fill="var(--muted)" fontFamily="var(--ff-mono)" fontSize="13">
        [ok] keystrokes authenticated pre-send
      </text>
      {keys}
      <circle cx={24 + 6 * 44 + 18} cy={150 + 1 * 36 + 14} r="4" fill="var(--accent-ink)" />
    </g>
  );
}

function Kanji() {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={40 + i * 80} y1="0" x2={40 + i * 80} y2="280" {...faint} strokeWidth="0.6" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="0" y1={40 + i * 70} x2="480" y2={40 + i * 70} {...faint} strokeWidth="0.6" />
      ))}
      <text x="60" y="190" fill="none" stroke="var(--ink)" strokeWidth="1.6" fontSize="150" fontFamily="var(--ff-serif)">
        千
      </text>
      <text x="220" y="210" fill="var(--accent)" fontSize="110" fontFamily="var(--ff-serif)">
        夏
      </text>
      <text x="352" y="90" fill="var(--muted)" fontFamily="var(--ff-mono)" fontSize="13">
        N5→N1
      </text>
      <text x="352" y="116" fill="var(--muted)" fontFamily="var(--ff-mono)" fontSize="13">
        SRS: due=3
      </text>
      <rect x="352" y="140" width="96" height="6" fill="var(--accent-dim)" />
      <rect x="352" y="140" width="62" height="6" fill="var(--accent)" />
    </g>
  );
}

function Keyguardian() {
  return (
    <g>
      <circle cx="240" cy="140" r="104" fill="none" {...faint} strokeDasharray="3 6" />
      <circle cx="240" cy="140" r="78" fill="none" {...faint} />
      <path
        d="M240 56 306 82v52c0 46-30 78-66 92-36-14-66-46-66-92V82l66-26Z"
        fill="var(--surface)"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      <circle cx="240" cy="126" r="14" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <path d="M240 138v26m0 0-10 12m10-12 10 12" stroke="var(--accent)" strokeWidth="2" fill="none" />
      <text x="28" y="252" fill="var(--muted)" fontFamily="var(--ff-mono)" fontSize="12">
        AES-128-CBC + HMAC-SHA256 // fernet
      </text>
      <text x="28" y="40" fill="var(--muted)" fontFamily="var(--ff-mono)" fontSize="12">
        $ keyguardian --seal ./vault
      </text>
    </g>
  );
}

function Chinatsu() {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={-80 + i * 90} y1="280" x2={180 + i * 20} y2="150" {...faint} strokeWidth="0.6" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="0" y1={170 + i * 34} x2="480" y2={170 + i * 34} {...faint} strokeWidth="0.6" />
      ))}
      {/* wireframe cube */}
      <g stroke="var(--ink)" strokeWidth="1.4" fill="none">
        <path d="M190 70h100v100H190z" />
        <path d="M230 40h100v100" />
        <path d="M190 70l40-30M290 70l40-30M290 170l40-30M190 170l40-30" />
      </g>
      <circle cx="190" cy="70" r="4" fill="var(--accent)" />
      <circle cx="330" cy="140" r="4" fill="var(--accent)" />
      <text x="28" y="40" fill="var(--muted)" fontFamily="var(--ff-mono)" fontSize="12">
        chinatsu-engine // C++17 · SDL2 · Vulkan
      </text>
      <text x="28" y="252" fill="var(--accent)" fontFamily="var(--ff-mono)" fontSize="12">
        千夏 — a thousand summers
      </text>
    </g>
  );
}

function Knowledge() {
  const nodes: [number, number, boolean][] = [
    [80, 70, false],
    [200, 50, false],
    [330, 90, true],
    [420, 50, false],
    [120, 170, false],
    [260, 150, false],
    [390, 190, false],
    [180, 240, false],
    [330, 250, false],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [4, 5],
    [5, 2],
    [5, 6],
    [6, 2],
    [4, 7],
    [7, 8],
    [8, 6],
  ];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          {...faint}
          strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y, hot], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={hot ? 7 : 4.5}
          fill={hot ? "var(--accent)" : "var(--surface)"}
          stroke={hot ? "var(--accent)" : "var(--line-strong)"}
          strokeWidth="1.4"
        />
      ))}
      <text x="28" y="40" fill="var(--muted)" fontFamily="var(--ff-mono)" fontSize="12">
        ~/knowledge-base — notes that compound
      </text>
    </g>
  );
}
