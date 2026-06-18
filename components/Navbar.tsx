'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { Search, SunMedium, MoonStar, BotMessageSquare, Hash, ArrowRight, Menu } from 'lucide-react'
import { useAIAssistant } from './AIAssistant'
import { useSidebar } from './Sidebar'
import Fuse from 'fuse.js'

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
  { title: 'Auto-Fix Capabilities', path: '/docs/security/auto-fix', section: 'Security & Compliance' },
  { title: 'Trivy Scanning', path: '/docs/security/trivy', section: 'Security & Compliance' },
  { title: 'IaC Detection', path: '/docs/iac/detection', section: 'Infrastructure as Code' },
  { title: 'Automated Execution', path: '/docs/iac/execution', section: 'Infrastructure as Code' },
  { title: 'IaC Generation Loop', path: '/docs/iac/generation', section: 'Infrastructure as Code' },
  { title: 'Verification Steps', path: '/docs/iac/verification', section: 'Infrastructure as Code' },
  { title: 'Deployment Targets', path: '/docs/iac/targets', section: 'Infrastructure as Code' },
  { title: 'Post-Generation Steps', path: '/docs/iac/post-steps', section: 'Infrastructure as Code' },
  { title: 'Full Command Reference', path: '/docs/cli-reference', section: 'CLI Reference' },
  { title: 'Dependency Review', path: '/docs/dependencies', section: 'Dependencies' },
  { title: 'Full Changelog', path: '/docs/changelog', section: 'Changelog' },
  { title: 'Contributing Guide', path: '/docs/contributing', section: 'Contributing' },
  { title: 'Vulnerability Reporting', path: '/docs/security-policy', section: 'Security Policy' },
]

const fuse = new Fuse(searchData, { keys: ['title', 'section'], threshold: 0.35 })

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isOpen: isAIOpen, setIsOpen: setIsAIOpen } = useAIAssistant()
  const { isMobileOpen, setIsMobileOpen } = useSidebar()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof searchData>([])
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setResults(query.length > 0 ? fuse.search(query).map(r => r.item) : searchData.slice(0, 8))
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.header
      className="sticky top-0 z-40 px-4 py-3"
      style={{
        background: isScrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">

        {/* Mobile hamburger menu */}
        <button
          className="lg:hidden p-2 rounded-xl transition-all hover:scale-105"
          style={{
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            border: '1px solid var(--border)',
          }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          title="Toggle sidebar"
          id="mobile-menu-btn"
        >
          <Menu size={20} />
        </button>

        {/* Center — Inline search bar */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl mx-auto">
          <div
            className="w-full flex items-center gap-3 px-4 py-2 rounded-full text-sm transition-all"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text-primary)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            <Search size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--text-primary)' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs px-2 py-0.5 rounded transition-colors hover:bg-red-500/10"
                style={{ color: 'var(--text-tertiary)', background: 'var(--accent-light)' }}
              >
                clear
              </button>
            )}
          </div>

          {/* Autocomplete Search Dropdown */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-2 rounded-2xl overflow-hidden shadow-2xl z-50 border max-h-[350px] overflow-y-auto no-scrollbar"
                style={{
                  background: 'var(--bg-elevated)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderColor: 'var(--border-strong)',
                }}
              >
                {results.length === 0 ? (
                  <div className="p-4 text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    No results for &quot;{query}&quot;
                  </div>
                ) : (
                  <div className="p-2 space-y-0.5">
                    {results.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => {
                          setIsFocused(false)
                          setQuery('')
                        }}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl transition-all text-sm group/row"
                        style={{ color: 'var(--text-primary)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-light)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Hash size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          <div className="min-w-0">
                            <div className="font-medium truncate">{item.title}</div>
                            <div className="text-[10px] truncate" style={{ color: 'var(--text-tertiary)' }}>
                              {item.section}
                            </div>
                          </div>
                        </div>
                        <ArrowRight size={14} style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.6 }} />
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-1 shrink-0">

          {/* AI Assistant toggle */}
          <button
            onClick={() => setIsAIOpen(!isAIOpen)}
            className="relative p-2 rounded-xl transition-all hover:scale-105"
            style={{
              color: 'var(--accent)',
              background: isAIOpen ? 'var(--accent-light)' : 'transparent',
              border: isAIOpen ? '1px solid var(--border-strong)' : '1px solid transparent',
            }}
            title={isAIOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
            id="ai-assistant-toggle"
          >
            <BotMessageSquare size={20} />
            <span
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-400"
              style={{ boxShadow: '0 0 6px #4ade80' }}
            />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl transition-all hover:scale-105"
            style={{
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              border: '1px solid var(--border)',
            }}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180, scale: 1 }}
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
            >
              {theme === 'dark'
                ? <SunMedium size={18} />
                : <MoonStar size={18} />
              }
            </motion.div>
          </button>

        </div>
      </div>
    </motion.header>
  )
}
