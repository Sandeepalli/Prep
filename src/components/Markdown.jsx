// Minimal markdown renderer for the Interview Q&A guide.
// Supports: #/##/### headings, blockquotes, ---, bullet & numbered lists,
// **bold** question lines, inline `code`, **bold**, and [text](#anchor) links.
// No external dependency — tuned for the subset used in interviewPrep.md.

// GitHub-style heading slugs so in-document TOC anchors resolve correctly.
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/ /g, '-')
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Pull out the "## " section headings for a table of contents.
export function extractHeadings(source) {
  return source
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .filter((l) => l.startsWith('## '))
    .map((l) => {
      const text = l.slice(3).trim()
      return { text, id: slugify(text) }
    })
}

function renderLinks(text, keyBase) {
  const out = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m
  let n = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const [, label, href] = m
    if (href.startsWith('#')) {
      out.push(
        <button
          key={`${keyBase}-lnk-${n}`}
          onClick={() => scrollToId(href.slice(1))}
          className="text-brand-600 hover:underline dark:text-brand-300"
        >
          {label}
        </button>
      )
    } else {
      out.push(
        <a key={`${keyBase}-lnk-${n}`} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline dark:text-brand-300">
          {label}
        </a>
      )
    }
    last = m.index + m[0].length
    n++
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

// Inline: `code`, then **bold**, then links inside the rest.
function renderInline(text, keyBase) {
  const nodes = []
  text.split(/(`[^`]+`)/g).forEach((chunk, ci) => {
    if (!chunk) return
    if (chunk.startsWith('`') && chunk.endsWith('`')) {
      nodes.push(
        <code key={`${keyBase}-c-${ci}`} className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[0.85em] text-brand-700 dark:bg-white/10 dark:text-brand-200">
          {chunk.slice(1, -1)}
        </code>
      )
      return
    }
    chunk.split(/(\*\*[^*]+\*\*)/g).forEach((seg, si) => {
      if (!seg) return
      if (seg.startsWith('**') && seg.endsWith('**')) {
        nodes.push(
          <strong key={`${keyBase}-b-${ci}-${si}`} className="font-semibold text-slate-900 dark:text-slate-100">
            {seg.slice(2, -2)}
          </strong>
        )
      } else {
        nodes.push(...renderLinks(seg, `${keyBase}-${ci}-${si}`))
      }
    })
  })
  return nodes
}

export default function Markdown({ source }) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n')
  const blocks = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }

    if (line.startsWith('## ')) { blocks.push({ type: 'h2', text: line.slice(3).trim() }); i++; continue }
    if (line.startsWith('# ')) { blocks.push({ type: 'h1', text: line.slice(2).trim() }); i++; continue }
    if (line.startsWith('### ')) { blocks.push({ type: 'h3', text: line.slice(4).trim() }); i++; continue }
    if (line.trim() === '---') { blocks.push({ type: 'hr' }); i++; continue }

    if (line.startsWith('> ')) {
      const buf = []
      while (i < lines.length && lines[i].startsWith('> ')) { buf.push(lines[i].slice(2)); i++ }
      blocks.push({ type: 'quote', items: buf }); continue
    }
    if (line.startsWith('- ')) {
      const buf = []
      while (i < lines.length && lines[i].startsWith('- ')) { buf.push(lines[i].slice(2)); i++ }
      blocks.push({ type: 'ul', items: buf }); continue
    }
    if (/^\d+\.\s/.test(line)) {
      const buf = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) { buf.push(lines[i].replace(/^\d+\.\s/, '')); i++ }
      blocks.push({ type: 'ol', items: buf }); continue
    }
    if (/^\*\*Q\d+\./.test(line)) {
      blocks.push({ type: 'question', text: line.replace(/^\*\*/, '').replace(/\*\*$/, '') }); i++; continue
    }
    blocks.push({ type: 'p', text: line }); i++
  }

  return (
    <div className="space-y-4">
      {blocks.map((b, idx) => {
        switch (b.type) {
          case 'h1':
            return <h1 key={idx} className="text-2xl font-extrabold tracking-tight sm:text-3xl">{renderInline(b.text, idx)}</h1>
          case 'h2':
            return (
              <h2 key={idx} id={slugify(b.text)} className="scroll-mt-24 border-t border-slate-200 pt-6 text-xl font-bold text-brand-700 dark:border-white/10 dark:text-brand-300">
                {renderInline(b.text, idx)}
              </h2>
            )
          case 'h3':
            return <h3 key={idx} className="text-lg font-bold">{renderInline(b.text, idx)}</h3>
          case 'hr':
            return null
          case 'quote':
            return (
              <blockquote key={idx} className="rounded-lg border-l-2 border-brand-400/40 bg-slate-200/60 px-4 py-3 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-400">
                {b.items.map((l, j) => <p key={j}>{renderInline(l, `${idx}-${j}`)}</p>)}
              </blockquote>
            )
          case 'ul':
            return (
              <ul key={idx} className="space-y-1.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    <span>{renderInline(it, `${idx}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={idx} className="space-y-1.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    <span className="shrink-0 font-semibold text-brand-600 dark:text-brand-300">{j + 1}.</span>
                    <span>{renderInline(it, `${idx}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            )
          case 'question':
            return (
              <h3 key={idx} className="pt-2 font-semibold leading-snug text-slate-900 dark:text-slate-100">
                {renderInline(b.text, idx)}
              </h3>
            )
          default:
            return <p key={idx} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{renderInline(b.text, idx)}</p>
        }
      })}
    </div>
  )
}
