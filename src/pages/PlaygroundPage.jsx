import { useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { PlayIcon, RefreshIcon } from '../components/Icons'

const snippets = {
  'Debounce': `// Implement debounce
function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

const log = debounce((x) => console.log('called with', x), 100);
log(1); log(2); log(3); // only the last runs
console.log('scheduled — last call wins after 100ms');`,

  'Event loop order': `// Predict the output order
console.log('1: sync start');
setTimeout(() => console.log('4: setTimeout (macrotask)'), 0);
Promise.resolve().then(() => console.log('3: promise (microtask)'));
console.log('2: sync end');`,

  'Two Sum': `// Two Sum — O(n) with a hash map
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]`,

  'Promise.all (custom)': `// Implement Promise.all
function myAll(promises) {
  return new Promise((resolve, reject) => {
    const out = [];
    let done = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then((v) => {
        out[i] = v;
        if (++done === promises.length) resolve(out);
      }, reject);
    });
  });
}
myAll([1, Promise.resolve(2), 3]).then((r) => console.log('resolved', r));`,
}

export default function PlaygroundPage() {
  const [code, setCode] = useState(snippets['Two Sum'])
  const [output, setOutput] = useState([])
  const [running, setRunning] = useState(false)
  const taRef = useRef(null)

  const run = async () => {
    setRunning(true)
    const logs = []
    const fmt = (a) =>
      a.map((x) => {
        if (typeof x === 'object') {
          try { return JSON.stringify(x) } catch { return String(x) }
        }
        return String(x)
      }).join(' ')

    const sandboxConsole = {
      log: (...a) => logs.push({ type: 'log', text: fmt(a) }),
      error: (...a) => logs.push({ type: 'error', text: fmt(a) }),
      warn: (...a) => logs.push({ type: 'warn', text: fmt(a) }),
      info: (...a) => logs.push({ type: 'log', text: fmt(a) }),
    }

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('console', `return (async () => {\n${code}\n})()`)
      await fn(sandboxConsole)
    } catch (err) {
      logs.push({ type: 'error', text: `${err.name}: ${err.message}` })
    }

    // Give microtasks/timeouts in the snippet a moment to flush
    await new Promise((r) => setTimeout(r, 150))
    setOutput(logs.length ? logs : [{ type: 'muted', text: '(no console output)' }])
    setRunning(false)
  }

  const handleKeyDown = (e) => {
    // Tab inserts two spaces; Ctrl/Cmd+Enter runs
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.target
      const start = el.selectionStart
      const end = el.selectionEnd
      const next = code.slice(0, start) + '  ' + code.slice(end)
      setCode(next)
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2 })
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      run()
    }
  }

  return (
    <div>
      <PageHeader title="Code Playground" blurb="Write JavaScript and run it in your browser. Console output appears below. (Ctrl/Cmd + Enter to run.)" icon="code" color="from-brand-500 to-brand-700" />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-500">Examples:</span>
        {Object.keys(snippets).map((name) => (
          <button
            key={name}
            onClick={() => { setCode(snippets[name]); setOutput([]) }}
            className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Editor */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <span className="text-xs font-semibold text-slate-400">editor.js</span>
            <div className="flex gap-2">
              <button onClick={() => setOutput([])} className="btn-ghost px-2.5 py-1.5 text-xs"><RefreshIcon size={14} /> Clear</button>
              <button onClick={run} disabled={running} className="btn-primary px-3 py-1.5 text-xs"><PlayIcon size={14} /> {running ? 'Running…' : 'Run'}</button>
            </div>
          </div>
          <textarea
            ref={taRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="h-[420px] w-full resize-none bg-ink-900/60 p-4 font-mono text-sm leading-relaxed text-slate-200 outline-none"
          />
        </div>

        {/* Console */}
        <div className="card overflow-hidden">
          <div className="border-b border-white/5 px-4 py-2.5">
            <span className="text-xs font-semibold text-slate-400">console</span>
          </div>
          <div className="h-[420px] overflow-auto bg-ink-900/60 p-4 font-mono text-sm">
            {output.length === 0 ? (
              <p className="text-slate-600">Run your code to see output…</p>
            ) : (
              output.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap ${
                    line.type === 'error' ? 'text-rose-400' : line.type === 'warn' ? 'text-amber-300' : line.type === 'muted' ? 'text-slate-600' : 'text-slate-200'
                  }`}
                >
                  <span className="select-none text-slate-600">› </span>{line.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Note: code runs in your browser tab. Avoid infinite loops — there’s no execution timeout.
      </p>
    </div>
  )
}
