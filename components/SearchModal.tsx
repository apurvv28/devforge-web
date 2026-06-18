'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Fuse from 'fuse.js'
import { Search, ArrowRight, Hash } from 'lucide-react'

const searchData = [
  { title: 'Overview', path: '/docs', section: 'Getting Started' },
  { title: 'Installation & Quick Start', path: '/docs/getting-started/installation', section: 'Getting Started' },
  { title: 'Offline Mode', path: '/docs/getting-started/offline-mode', section: 'Getting Started' },
  { title: 'devforge init', path: '/docs/commands#init', section: 'Commands' },
  { title: 'devforge update', path: '/docs/commands#update', section: 'Commands' },
  { title: 'devforge preview', path: '/docs/commands#preview', section: 'Commands' },
  { title: 'devforge rollback', path: '/docs/commands#rollback', section: 'Commands' },
  { title: 'devforge audit', path: '/docs/commands#audit', section: 'Commands' },
  { title: 'devforge deploy', path: '/docs/commands#deploy', section: 'Commands' },
  { title: 'devforge diagnose', path: '/docs/commands#diagnose', section: 'Commands' },
  { title: 'devforge recommendations', path: '/docs/commands#recommendations', section: 'Commands' },
  { title: 'How the Agent Works', path: '/docs/agentic-workflow#how-it-works', section: 'Agentic Workflow' },
  { title: 'LLM Provider Setup', path: '/docs/agentic-workflow#llm-setup', section: 'Agentic Workflow' },
  { title: 'Agent Graph (LangGraph)', path: '/docs/agentic-workflow#langgraph', section: 'Agentic Workflow' },
  { title: 'Architecture', path: '/docs/agentic-workflow#architecture', section: 'Agentic Workflow' },
  { title: 'Cache System', path: '/docs/agentic-workflow#cache', section: 'Agentic Workflow' },
  { title: 'Memory System', path: '/docs/agentic-workflow#memory', section: 'Agentic Workflow' },
  { title: 'Security Model', path: '/docs/security/model', section: 'Security & Compliance' },
  { title: 'Compliance Agent', path: '/docs/security/compliance', section: 'Security & Compliance' },
  { title: 'IaC Detection', path: '/docs/iac/detection', section: 'Infrastructure as Code' },
  { title: 'IaC Generation Loop', path: '/docs/iac/generation', section: 'Infrastructure as Code' },
]

const fuse = new Fuse(searchData, { keys: ['title', 'section'], threshold: 0.35 })

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof searchData>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80)
    else setQuery('')
  }, [isOpen])

  useEffect(() => {
    setResults(query.length > 0 ? fuse.search(query).map(r => r.item) : searchData.slice(0, 8))
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(7, 13, 20, 0.70)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[12%] z-50 max-w-2xl mx-auto rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-elevated)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px var(--border)',
            }}
          >
            {/* Input row */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <Search size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search documentation..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: 'var(--text-primary)' }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ color: 'var(--text-tertiary)', background: 'var(--accent-light)' }}
                >
                  clear
                </button>
              )}
              <kbd
                className="hidden sm:inline-flex text-xs px-2 py-1 rounded-md font-mono"
                style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border)' }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 && query.length > 0 ? (
                <p className="py-8 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  No results for &quot;{query}&quot;
                </p>
              ) : (
                results.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={onClose}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all group"
                    style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-light)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Hash size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{item.title}</div>
                        <div className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>
                          {item.section}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={14} style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.6 }} />
                  </a>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              className="px-4 py-2.5 border-t flex items-center gap-4 text-xs"
              style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}
            >
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>↵</kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>↑↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>ESC</kbd>
                to close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
