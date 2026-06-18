// components/ChangelogFeed.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChangelogEntry {
  version: string
  date: string
  compareUrl: string
  features: string[]
  fixes: string[]
}

export function ChangelogFeed() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/apurvv28/DevForge/main/CHANGELOG.md'
        )
        const text = await response.text()
        const parsed = parseChangelog(text)
        setEntries(parsed.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch changelog:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChangelog()
  }, [])

  const parseChangelog = (text: string): ChangelogEntry[] => {
    const entries: ChangelogEntry[] = []
    const lines = text.split('\n')
    let current: Partial<ChangelogEntry> = {}
    let section: 'features' | 'fixes' | null = null

    for (const line of lines) {
      const versionMatch = line.match(/^## \[([^\]]+)\]\(([^)]+)\) \(([^)]+)\)/)
      if (versionMatch) {
        if (current.version) {
          entries.push(current as ChangelogEntry)
        }
        current = {
          version: versionMatch[1],
          compareUrl: versionMatch[2],
          date: versionMatch[3],
          features: [],
          fixes: [],
        }
        section = null
        continue
      }

      if (line.includes('### Features')) {
        section = 'features'
        continue
      }

      if (line.includes('### Bug Fixes')) {
        section = 'fixes'
        continue
      }

      if (section && line.startsWith('-')) {
        const item = line.replace('-', '').trim()
        if (section === 'features' && current.features) {
          current.features.push(item)
        } else if (section === 'fixes' && current.fixes) {
          current.fixes.push(item)
        }
      }
    }

    if (current.version) {
      entries.push(current as ChangelogEntry)
    }

    // Deduplicate by version
    const seen = new Set<string>()
    return entries.filter(entry => {
      if (seen.has(entry.version)) return false
      seen.add(entry.version)
      return true
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 rounded animate-pulse" style={{ background: 'var(--bg-code)' }} />
        <div className="h-24 rounded animate-pulse" style={{ background: 'var(--bg-code)' }} />
      </div>
    )
  }

  const displayEntries = expanded ? entries : entries.slice(0, 1)

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {displayEntries.map((entry, index) => (
          <motion.div
            key={entry.version}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl border"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono font-semibold" style={{ color: 'var(--accent)' }}>
                v{entry.version}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {entry.date}
              </span>
            </div>

            {entry.features.length > 0 && (
              <div className="mb-2">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Features
                </span>
                <ul className="mt-1 space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {entry.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {entry.fixes.length > 0 && (
              <div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Bug Fixes
                </span>
                <ul className="mt-1 space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {entry.fixes.map((fix, i) => (
                    <li key={i}>• {fix}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {entries.length > 1 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          {expanded ? 'Show less' : `Show ${entries.length - 1} more releases`}
        </button>
      )}
    </div>
  )
}