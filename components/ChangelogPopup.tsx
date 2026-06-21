// components/ChangelogPopup.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Terminal, ArrowRight, GitCommitHorizontal, Calendar, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface ChangelogEntry {
  version: string
  date: string
  compareUrl: string
  features: string[]
  fixes: string[]
}

export function ChangelogPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [entry, setEntry] = useState<ChangelogEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check session storage first
    const hasSeen = sessionStorage.getItem('devforge-changelog-seen')
    if (hasSeen) {
      setLoading(false)
      return
    }

    const fetchLatestRelease = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/apurvv28/DevForge/main/CHANGELOG.md'
        )
        const text = await response.text()
        const parsed = parseChangelog(text)
        if (parsed.length > 0) {
          setEntry(parsed[0])
          setIsOpen(true)
        }
      } catch (error) {
        console.error('Failed to fetch changelog for popup:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestRelease()
  }, [])

  const parseChangelog = (text: string): ChangelogEntry[] => {
    const entries: ChangelogEntry[] = []
    const lines = text.split('\n')
    let current: Partial<ChangelogEntry> = {}
    let section: 'features' | 'fixes' | null = null

    for (const line of lines) {
      const versionMatch = line.match(/^#+ \[([^\]]+)\]\(([^)]+)\) \(([^)]+)\)/)
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

    const seen = new Set<string>()
    return entries.filter(entry => {
      if (seen.has(entry.version)) return false
      seen.add(entry.version)
      return true
    })
  }

  const handleClose = () => {
    sessionStorage.setItem('devforge-changelog-seen', 'true')
    setIsOpen(false)
  }

  if (loading || !isOpen || !entry) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl z-10"
          style={{
            background: 'var(--bg-glass)',
            borderColor: 'var(--border-strong)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            boxShadow: '0 0 50px var(--accent-glow)',
          }}
        >
          {/* Glowing Top Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)'
          }} />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-105"
            style={{
              background: 'var(--accent-light)',
              color: 'var(--text-tertiary)',
              border: '1px solid var(--border)'
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
          >
            <X size={16} />
          </button>

          {/* Modal Header */}
          <div className="p-6 pb-4 flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: 'var(--accent-light)',
                border: '1px solid var(--border-strong)'
              }}
            >
              <Sparkles className="text-[var(--accent)] animate-pulse" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  border: '1px solid var(--border-strong)'
                }}>
                  New Release
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <Calendar size={12} />
                  {entry.date}
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                DevForge v{entry.version} is Live!
              </h2>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] w-full" style={{ background: 'var(--border)' }} />

          {/* Content Area */}
          <div className="p-6 py-4 max-h-[300px] overflow-y-auto no-scrollbar space-y-4">
            {/* Features */}
            {entry.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                  <Terminal size={12} />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {entry.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-sm flex items-start gap-2 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="text-[var(--accent)] font-bold shrink-0 mt-0.5">•</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bug Fixes */}
            {entry.fixes.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                  <AlertCircle size={12} style={{ color: '#ef4444' }} />
                  Improvements & Fixes
                </h3>
                <ul className="space-y-2">
                  {entry.fixes.map((fix, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (entry.features.length + idx) * 0.05 }}
                      className="text-sm flex items-start gap-2 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{fix}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-[1px] w-full" style={{ background: 'var(--border)' }} />

          {/* Modal Actions */}
          <div className="p-6 bg-[var(--bg-elevated)] flex flex-col sm:flex-row gap-3 items-center justify-between">
            <Link
              href="/docs/changelog"
              onClick={handleClose}
              className="text-xs font-medium flex items-center gap-1.5 hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              <GitCommitHorizontal size={14} />
              Read entire release notes
            </Link>
            
            <button
              onClick={handleClose}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{
                background: 'var(--accent)',
                color: '#0a0f1a',
                boxShadow: '0 0 16px var(--accent-glow)'
              }}
            >
              Explore updates
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
