// Aggregates completable item ids per track so progress can be computed centrally.
import { tracks } from './tracks'
import * as javascript from './javascript'
import * as react from './react'
import * as webPlatform from './webPlatform'
import * as systemDesign from './systemDesign'
import * as nodejs from './nodejs'
import * as stateManagement from './stateManagement'
import * as testing from './testing'
import * as coding from './coding'
import * as behavioral from './behavioral'

const conceptIds = (mod) => mod.sections.flatMap((s) => s.items.map((i) => i.id))

export const trackItemIds = {
  javascript: conceptIds(javascript),
  react: conceptIds(react),
  'web-platform': conceptIds(webPlatform),
  nodejs: conceptIds(nodejs),
  'state-management': conceptIds(stateManagement),
  testing: conceptIds(testing),
  'system-design': [
    ...systemDesign.fundamentals.map((i) => i.id),
    ...systemDesign.caseStudies.map((i) => i.id),
  ],
  coding: coding.problems.map((p) => p.id),
  behavioral: [
    ...behavioral.competencies.map((i) => i.id),
    ...behavioral.lld.map((i) => i.id),
  ],
}

export function trackProgress(trackId, completed) {
  const ids = trackItemIds[trackId] || []
  if (ids.length === 0) return { done: 0, total: 0, pct: 0 }
  const done = ids.filter((id) => completed[id]).length
  return { done, total: ids.length, pct: Math.round((done / ids.length) * 100) }
}

export function overallProgress(completed) {
  let done = 0
  let total = 0
  for (const t of tracks) {
    const p = trackProgress(t.id, completed)
    done += p.done
    total += p.total
  }
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
}
