type Props = { progressPercent: number }

const stages = [
  { threshold: 0, label: 'A seed is ready to grow' },
  { threshold: 1, label: 'A new sprout is emerging' },
  { threshold: 26, label: 'Your sapling is taking root' },
  { threshold: 51, label: 'Your tree is growing strong' },
  { threshold: 76, label: 'Your tree is flourishing' },
  { threshold: 100, label: 'Your tree has reached full growth' }
]

export default function TreeGrowth({ progressPercent }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))
  const stage = [...stages].reverse().find(item => pct >= item.threshold)?.label ?? stages[0].label
  const trunkProgress = Math.max(0, pct / 100)

  return (
    <section className="fsk-surface overflow-hidden p-6" aria-label="Learning growth tree">
      <div className="flex flex-col items-center">
        <svg className="h-56 w-full max-w-sm" viewBox="0 0 320 230" role="img" aria-labelledby="growth-tree-title growth-tree-description">
          <title id="growth-tree-title">Your learning growth tree</title>
          <desc id="growth-tree-description">The tree grows as you complete syllabus sections. Current progress: {pct}%.</desc>
          <defs>
            <linearGradient id="tree-trunk" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#8b5e3c" />
              <stop offset="0.55" stopColor="#a8754c" />
              <stop offset="1" stopColor="#70452f" />
            </linearGradient>
            <linearGradient id="tree-leaves" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#91c788" />
              <stop offset="1" stopColor="#2e6f5e" />
            </linearGradient>
          </defs>

          <ellipse cx="160" cy="205" rx="106" ry="12" fill="#dcebd5" />
          <path d="M55 204 Q160 196 265 204" fill="none" stroke="#8aaf73" strokeWidth="3" strokeLinecap="round" />

          {/* Seed remains visible at the base while the tree grows above it. */}
          {pct === 0 && <g className="tree-seed">
            <ellipse cx="160" cy="193" rx="11" ry="7" fill="#9b7048" />
            <path d="M158 190 Q160 187 163 190" fill="none" stroke="#d8b17d" strokeWidth="2" strokeLinecap="round" />
            <text x="160" y="222" textAnchor="middle" fill="#557563" fontSize="11">Complete a section to plant your first sprout</text>
          </g>}

          {/* Trunk and branches reveal smoothly with syllabus progress. */}
          <path d="M160 199 C158 169 164 140 160 111 C158 94 160 81 160 68" fill="none" stroke="url(#tree-trunk)" strokeWidth="9" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - trunkProgress * 100} className="tree-trunk" />
          <path d="M160 157 C145 147 139 135 132 123 M161 139 C175 130 180 119 188 107 M160 119 C148 108 146 99 143 89 M161 104 C173 96 177 88 179 78" fill="none" stroke="#8b5e3c" strokeWidth="4" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - trunkProgress * 100} className="tree-trunk" />

          {pct >= 1 && <g className="tree-sprout">
            <path d="M160 199 C160 190 160 183 160 176" fill="none" stroke="#4b8a59" strokeWidth="4" strokeLinecap="round" />
            <path d="M160 185 C150 184 147 178 146 172 C154 172 159 176 160 182" fill="#83bc72" />
            <path d="M160 180 C161 171 167 167 174 166 C173 174 168 179 161 182" fill="#5d9e67" />
          </g>}

          {pct >= 26 && <g className="tree-canopy tree-canopy-small">
            <circle cx="160" cy="70" r="23" fill="url(#tree-leaves)" />
            <circle cx="143" cy="82" r="18" fill="#70ad70" />
            <circle cx="177" cy="82" r="18" fill="#579b68" />
          </g>}
          {pct >= 51 && <g className="tree-canopy tree-canopy-medium">
            <circle cx="160" cy="63" r="34" fill="url(#tree-leaves)" />
            <circle cx="133" cy="79" r="26" fill="#70ad70" />
            <circle cx="187" cy="79" r="26" fill="#579b68" />
            <circle cx="147" cy="49" r="21" fill="#a0cf88" />
          </g>}
          {pct >= 76 && <g className="tree-canopy tree-canopy-full">
            <circle cx="160" cy="56" r="39" fill="url(#tree-leaves)" />
            <circle cx="128" cy="76" r="29" fill="#6eae70" />
            <circle cx="192" cy="76" r="29" fill="#4c9162" />
            <circle cx="143" cy="39" r="24" fill="#a0cf88" />
            <circle cx="179" cy="39" r="24" fill="#80bd79" />
            <circle cx="160" cy="89" r="25" fill="#579b68" />
            <circle cx="160" cy="22" r="7" fill="#f7cd71" className="tree-sparkle" />
          </g>}
          {pct >= 100 && <g className="tree-blossoms" fill="#ffe4a6">
            <circle cx="119" cy="65" r="3" /><circle cx="199" cy="63" r="3" /><circle cx="152" cy="29" r="3" /><circle cx="173" cy="88" r="3" />
          </g>}
        </svg>
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-pine font-medium">Your growth tree</p>
            <p className="text-pine text-sm font-semibold">{pct}%</p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-fsk-sky/60" role="progressbar" aria-label="Syllabus completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
            <div className="h-full rounded-full bg-fsk-pine transition-[width] duration-1000 ease-out" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-center text-sm text-gray-600" aria-live="polite">{stage}</p>
        </div>
      </div>
    </section>
  )
}
