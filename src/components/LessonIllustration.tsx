type Props = { lessonId: string; title: string }

const scenes: Record<string, { label: string; art: JSX.Element }> = {
  'pause-and-notice': {
    label: 'A child pauses for a calm breath while colorful feeling bubbles float nearby.',
    art: <>
      <circle cx="320" cy="113" r="38" fill="#f3c69c" />
      <path d="M284 109q2-45 38-43 33 2 36 37-17-8-25-24-14 20-49 30" fill="#57413c" />
      <circle cx="307" cy="116" r="3" fill="#423b3a" /><circle cx="333" cy="116" r="3" fill="#423b3a" />
      <path d="M313 132q7 7 14 0" fill="none" stroke="#ad625e" strokeWidth="3" strokeLinecap="round" />
      <path d="M278 209q4-57 42-57t43 57" fill="#6c9f8d" />
      <path className="lesson-art-float" d="M222 111c-14-17-40 3 0 31 40-28 14-48 0-31" fill="#f18b83" />
      <circle className="lesson-art-pulse" cx="320" cy="111" r="67" fill="none" stroke="#79bcb4" strokeWidth="3" />
      <circle cx="424" cy="112" r="18" fill="#ffd57b" /><circle cx="204" cy="173" r="10" fill="#b6d99d" />
    </>
  },
  'attention-reset': {
    label: 'An open book and pencil show a student bringing their attention back to reading.',
    art: <>
      <path d="M180 105q74-27 140 8v93q-67-35-140-8z" fill="#fffdf5" stroke="#79aeb0" strokeWidth="5" />
      <path d="M460 105q-74-27-140 8v93q67-35 140-8z" fill="#fffdf5" stroke="#79aeb0" strokeWidth="5" />
      <path d="M320 113v93" stroke="#79aeb0" strokeWidth="4" />
      <path d="M208 132q42-12 82 5m-82 13q42-12 82 5m80-23q40-17 82-5m-82 28q40-17 82-5" fill="none" stroke="#b8d7d1" strokeWidth="5" strokeLinecap="round" />
      <path className="lesson-art-float" d="m475 183 11-65 13 3-11 65-10 13z" fill="#f4bd59" />
      <circle cx="248" cy="80" r="8" fill="#f2a184" /><circle cx="394" cy="79" r="10" fill="#a4cb7c" />
    </>
  },
  'values-compass': {
    label: 'A colorful collection of stars represents a child’s different strengths.',
    art: <>
      <circle cx="320" cy="145" r="53" fill="#f8d785" />
      <path d="m320 106 12 25 28 4-20 19 5 28-25-13-25 13 5-28-20-19 28-4z" fill="#f6a86c" />
      <circle className="lesson-art-float" cx="220" cy="100" r="24" fill="#91cbb7" />
      <path d="m220 82 6 12 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" fill="#fff8d9" />
      <circle className="lesson-art-float lesson-art-delay" cx="418" cy="101" r="28" fill="#b8a6d9" />
      <path d="m418 80 7 14 16 2-11 11 3 16-15-8-14 8 3-16-12-11 16-2z" fill="#fff8d9" />
      <circle cx="249" cy="202" r="14" fill="#f18b83" /><circle cx="390" cy="199" r="13" fill="#f0b751" />
    </>
  },
  'vision-to-action': {
    label: 'Stepping stones lead up a green hill toward a bright star.',
    art: <>
      <path d="M102 220q80-100 157-46 66-116 152-5 62-78 127 51z" fill="#9bc78c" />
      <path d="M154 221 230 190l36 7 41-45 30 12 36-42 26 12 45-47" fill="none" stroke="#fff8e6" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m425 63 9 18 20 3-15 14 4 20-18-10-18 10 4-20-15-14 20-3z" fill="#f6c758" className="lesson-art-pulse" />
      <circle cx="170" cy="91" r="20" fill="#f8d785" /><path d="M151 91h38" stroke="#f8d785" strokeWidth="4" />
    </>
  },
  'habit-small-start': {
    label: 'A tiny green sprout grows beside a simple habit chart.',
    art: <>
      <rect x="213" y="73" width="214" height="150" rx="20" fill="#fffdf5" stroke="#a7cfc1" strokeWidth="5" />
      <path d="M251 111h15m0-8 8 8-8 8m18-8h102" fill="none" stroke="#78ad9b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M251 153h15m0-8 8 8-8 8m18-8h82" fill="none" stroke="#78ad9b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M319 220v-39m0 16q-29-1-31-22 22-2 31 15m0-1q4-24 29-26-2 23-29 31" fill="none" stroke="#5b9c71" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="319" cy="221" rx="34" ry="7" fill="#c68e62" />
      <circle className="lesson-art-float" cx="460" cy="93" r="11" fill="#f2a184" />
    </>
  },
  'environment-design': {
    label: 'A ready school desk has books, a pencil, and a lamp.',
    art: <>
      <path d="M164 188h312v18H164z" fill="#bd8c64" /><path d="M185 206v35m270-35v35" stroke="#946c50" strokeWidth="10" strokeLinecap="round" />
      <rect x="215" y="126" width="66" height="62" rx="5" fill="#e99a76" /><rect x="281" y="108" width="67" height="80" rx="5" fill="#83b8a5" /><rect x="348" y="137" width="56" height="51" rx="5" fill="#f1c75f" />
      <path d="m405 122 39-39 13 11-38 41m-12-13 15 14m20-50 8-9 13 13-9 9" fill="none" stroke="#6c7781" strokeWidth="7" strokeLinecap="round" />
      <path d="M175 112h35l-10-27h-16zM193 112v20" fill="#f8d785" stroke="#d8a950" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="473" cy="92" r="13" fill="#a9d394" />
    </>
  },
  'one-thing-focus': {
    label: 'Small stepping stones make a big school task feel manageable.',
    art: <>
      <path d="M134 221h113l-23-33h-67zm112-33h102l-21-33h-60zm100-33h93l-20-34h-54zm92-34h72l-18-34h-38z" fill="#8fbda2" />
      <circle cx="177" cy="203" r="6" fill="#f8df9a" /><circle cx="278" cy="170" r="6" fill="#f8df9a" /><circle cx="375" cy="136" r="6" fill="#f8df9a" />
      <path className="lesson-art-float" d="m475 73 8 16 18 3-13 12 3 18-16-8-16 8 3-18-13-12 18-3z" fill="#f4bd59" />
      <path d="M112 222h420" stroke="#7ca984" strokeWidth="5" strokeLinecap="round" />
    </>
  },
  'resilient-restart': {
    label: 'A little flower grows as sunshine returns after a cloud.',
    art: <>
      <circle cx="424" cy="93" r="34" fill="#f7cf69" className="lesson-art-pulse" />
      <path className="lesson-art-float" d="M179 110q0-39 43-39 23-37 56-5 44-4 43 42z" fill="#c0d4dc" />
      <path d="M320 222v-76m0 43q-34-1-39-31 30-4 39 23m0-4q10-33 41-33-2 31-41 42" fill="none" stroke="#5c9d70" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="320" cy="225" rx="76" ry="13" fill="#96c98a" />
      <circle cx="320" cy="142" r="12" fill="#f2a184" /><circle cx="307" cy="142" r="10" fill="#f3c69c" /><circle cx="333" cy="142" r="10" fill="#f3c69c" />
    </>
  },
  'listen-to-understand': {
    label: 'Two children take turns speaking and listening.',
    art: <>
      <circle cx="244" cy="133" r="34" fill="#f3c69c" /><circle cx="396" cy="133" r="34" fill="#c98c68" />
      <path d="M196 222q4-65 48-65t49 65m54 0q4-65 49-65t48 65" fill="#79b5a1" />
      <path d="M198 97q-4-35 38-35h56q28 0 26 28t-29 26h-34l-25 18 7-20q-37 0-39-17zm135-9q0-32 34-32h54q32 0 32 26t-32 27h-23l-22 18 3-18q-46-1-46-21z" fill="#fffdf5" stroke="#96bfb2" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="232" cy="88" r="4" fill="#f2a184" /><circle cx="251" cy="88" r="4" fill="#f2a184" /><circle cx="270" cy="88" r="4" fill="#f2a184" />
      <path d="M357 85h38" stroke="#f1c75f" strokeWidth="6" strokeLinecap="round" />
    </>
  },
  'respectful-conflict': {
    label: 'Two classmates share a ball and take turns during a game.',
    art: <>
      <circle cx="237" cy="113" r="31" fill="#f3c69c" /><circle cx="405" cy="113" r="31" fill="#bd8064" />
      <path d="M194 218q3-73 43-73t44 73m80 0q4-73 44-73t44 73" fill="#82b8a2" />
      <circle className="lesson-art-float" cx="320" cy="147" r="34" fill="#f3c759" />
      <path d="M287 147h66m-33-33v66m-23-56 46 46m0-46-46 46" stroke="#fff8e8" strokeWidth="4" />
      <path d="M275 98q18-14 34 0m-8-9 9 9-10 8m45-8q18-14 34 0m-8-9 9 9-10 8" fill="none" stroke="#f28f82" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  },
  'wise-decisions': {
    label: 'A balanced scale reminds learners to think about safety and fairness.',
    art: <>
      <path d="M320 83v130m-72 8h144m-72-138-88 38m88-38 88 38" stroke="#759b8d" strokeWidth="8" strokeLinecap="round" />
      <circle cx="320" cy="82" r="13" fill="#f2bb59" />
      <path d="m232 121-38 58h76zm176 0-38 58h76z" fill="#a4d2c0" stroke="#759b8d" strokeWidth="4" strokeLinejoin="round" />
      <path d="M195 179q38 18 76 0m100 0q38 18 76 0" fill="none" stroke="#759b8d" strokeWidth="5" />
      <circle className="lesson-art-float" cx="182" cy="91" r="12" fill="#f28f82" /><circle cx="461" cy="91" r="12" fill="#f1c75f" />
    </>
  },
  'lead-through-service': {
    label: 'Children work together to water a small community garden.',
    art: <>
      <path d="M140 220h360" stroke="#85ad78" strokeWidth="8" strokeLinecap="round" />
      <path d="M320 221v-83m0 28q-44-3-49-40 36-5 49 29m0 3q14-39 53-40-4 38-53 51" fill="none" stroke="#538b63" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="320" cy="222" rx="54" ry="15" fill="#bf895f" />
      <circle cx="228" cy="112" r="25" fill="#f3c69c" /><circle cx="412" cy="112" r="25" fill="#bf8064" />
      <path d="M193 197q2-57 35-57t35 57m114 0q2-57 35-57t35 57" fill="#79b5a1" />
      <path className="lesson-art-float" d="M190 158q-30-15-29 7l35 25 9-13m237-19q30-15 29 7l-35 25-9-13" fill="#83b9dc" stroke="#6798b6" strokeWidth="3" />
      <path d="M164 167q-10 14 5 22m287-22q10 14-5 22" fill="none" stroke="#75a9c7" strokeWidth="4" strokeLinecap="round" />
    </>
  }
}

export default function LessonIllustration({ lessonId, title }: Props) {
  const scene = scenes[lessonId]

  if (!scene) return null

  return (
    <div className="lesson-illustration" aria-label={`${title} picture`}>
      <svg viewBox="0 0 640 280" role="img" aria-label={scene.label}>
        <defs>
          <linearGradient id="lesson-sky" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#eff9f5" />
            <stop offset="1" stopColor="#fff1dc" />
          </linearGradient>
        </defs>
        <rect width="640" height="280" rx="28" fill="url(#lesson-sky)" />
        <circle cx="101" cy="51" r="4" fill="#efb95b" className="lesson-art-twinkle" />
        <circle cx="540" cy="223" r="5" fill="#86bca6" className="lesson-art-twinkle lesson-art-delay" />
        {scene.art}
      </svg>
    </div>
  )
}
