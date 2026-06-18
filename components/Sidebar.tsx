'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket, Zap, Brain, ShieldCheck, Building2, Package,
  BookOpen, GitCommitHorizontal, Handshake, ShieldAlert,
  Plus, Minus, ChevronRight, X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const sidebarData: { title: string; icon: LucideIcon; items: { title: string; path: string }[] }[] = [
  {
    title: 'Getting Started',
    icon: Rocket,
    items: [
      { title: 'Overview', path: '/docs' },
      { title: 'Installation & Quick Start', path: '/docs/getting-started/installation' },
      { title: 'Offline Mode', path: '/docs/getting-started/offline-mode' },
    ],
  },
  {
    title: 'Commands',
    icon: Zap,
    items: [
      { title: 'devforge init', path: '/docs/commands#init' },
      { title: 'devforge update', path: '/docs/commands#update' },
      { title: 'devforge preview', path: '/docs/commands#preview' },
      { title: 'devforge rollback', path: '/docs/commands#rollback' },
      { title: 'devforge audit', path: '/docs/commands#audit' },
      { title: 'devforge deploy', path: '/docs/commands#deploy' },
      { title: 'devforge diagnose', path: '/docs/commands#diagnose' },
      { title: 'devforge recommendations', path: '/docs/commands#recommendations' },
    ],
  },
  {
    title: 'Agentic Workflow',
    icon: Brain,
    items: [
      { title: 'How the Agent Works', path: '/docs/agentic-workflow#how-it-works' },
      { title: 'LLM Provider Setup', path: '/docs/agentic-workflow#llm-setup' },
      { title: 'Agent Graph (LangGraph)', path: '/docs/agentic-workflow#langgraph' },
      { title: 'Architecture', path: '/docs/agentic-workflow#architecture' },
      { title: 'Cache System', path: '/docs/agentic-workflow#cache' },
      { title: 'Memory System', path: '/docs/agentic-workflow#memory' },
      { title: 'Agent Commands', path: '/docs/agentic-workflow#agent-commands' },
    ],
  },
  {
    title: 'Security & Compliance',
    icon: ShieldCheck,
    items: [
      { title: 'Security Model', path: '/docs/security/model' },
      { title: 'Compliance Agent', path: '/docs/security/compliance' },
      { title: 'Auto-Fix Capabilities', path: '/docs/security/auto-fix' },
      { title: 'Trivy Scanning', path: '/docs/security/trivy' },
    ],
  },
  {
    title: 'Infrastructure as Code',
    icon: Building2,
    items: [
      { title: 'IaC Detection', path: '/docs/iac/detection' },
      { title: 'Automated Execution', path: '/docs/iac/execution' },
      { title: 'IaC Generation Loop', path: '/docs/iac/generation' },
      { title: 'Verification Steps', path: '/docs/iac/verification' },
      { title: 'Deployment Targets', path: '/docs/iac/targets' },
      { title: 'Post-Generation Steps', path: '/docs/iac/post-steps' },
    ],
  },
  {
    title: 'CLI Reference',
    icon: BookOpen,
    items: [{ title: 'Full Command Reference', path: '/docs/cli-reference' }],
  },
  {
    title: 'Dependencies',
    icon: Package,
    items: [{ title: 'Dependency Review', path: '/docs/dependencies' }],
  },
  {
    title: 'Changelog',
    icon: GitCommitHorizontal,
    items: [{ title: 'Full Changelog', path: '/docs/changelog' }],
  },
  {
    title: 'Contributing',
    icon: Handshake,
    items: [{ title: 'Contributing Guide', path: '/docs/contributing' }],
  },
  {
    title: 'Security Policy',
    icon: ShieldAlert,
    items: [{ title: 'Vulnerability Reporting', path: '/docs/security-policy' }],
  },
]

// Create Context for Sidebar State
interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  setIsCollapsed: () => { },
  isMobileOpen: false,
  setIsMobileOpen: () => { },
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('devforge-sidebar-collapsed')
    if (stored) {
      setIsCollapsed(stored === 'true')
    }
    setMounted(true)
  }, [])

  const handleSetCollapsed = (val: boolean) => {
    setIsCollapsed(val)
    localStorage.setItem('devforge-sidebar-collapsed', String(val))
  }

  return (
    <SidebarContext.Provider value={{
      isCollapsed,
      setIsCollapsed: handleSetCollapsed,
      isMobileOpen,
      setIsMobileOpen,
    }}>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)

export function Sidebar() {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar()
  const { theme } = useTheme()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const pathname = usePathname()

  // Auto-expand the section that owns the current route
  useEffect(() => {
    const current = sidebarData.find(g =>
      g.items.some(item => item.path === pathname || item.path.split('#')[0] === pathname)
    )
    if (current) setExpanded(prev => ({ ...prev, [current.title]: true }))
  }, [pathname])

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname, setIsMobileOpen])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const toggleSection = (title: string) => {
    setExpanded(prev => ({ ...prev, [title]: !prev[title] }))
  }

  const glassStyle = {
    background: 'var(--sidebar-bg)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  } as React.CSSProperties

  const sidebarWidth = isCollapsed ? 64 : 260

  /* ── Shared sidebar inner content ─────────────────────── */
  const sidebarContent = (isMobile: boolean) => (
    <>
      {/* ── Brand Logo Header ───────────────────────────────────── */}
      <div
        className="shrink-0 border-b select-none overflow-hidden"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className={`flex items-center px-4 py-5 gap-3 ${!isMobile && isCollapsed ? 'flex-col justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => isMobile && setIsMobileOpen(false)}>
              <div className="w-7 h-10 rounded-xl overflow-hidden flex items-center justify-center transition-transform hover:scale-105">
                <img
                  src={theme === 'dark' ? '/logo_top_left.png' : '/logo_top_left.png'}
                  alt="DevForge Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            {(isMobile || !isCollapsed) && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-base font-bold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                DevForge
              </motion.span>
            )}
          </div>

          {isMobile ? (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: 'var(--accent-light)',
                border: '1px solid var(--border-strong)',
                color: 'var(--accent)',
              }}
              title="Close sidebar"
            >
              <X size={16} />
            </button>
          ) : (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: 'var(--accent-light)',
                border: '1px solid var(--border-strong)',
                color: 'var(--accent)',
              }}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 0 : 180 }}
                transition={{ duration: 0.22 }}
              >
                <ChevronRight size={12} />
              </motion.div>
            </button>
          )}
        </div>
      </div>

      {/* ── Navigation List ─────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1.5 no-scrollbar">
        {sidebarData.map((group) => {
          const isGroupExpanded = expanded[group.title] ?? false
          const showExpanded = isMobile || !isCollapsed
          const hasCurrent = group.items.some(
            item => item.path === pathname || item.path.split('#')[0] === pathname
          )

          return (
            <div key={group.title} className="relative group/item">
              {/* Accordion Trigger or Collapsed Icon */}
              <button
                onClick={() => {
                  if (!isMobile && isCollapsed) {
                    setIsCollapsed(false)
                    setExpanded(prev => ({ ...prev, [group.title]: true }))
                  } else {
                    toggleSection(group.title)
                  }
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative"
                style={{
                  background: !showExpanded && hasCurrent ? 'var(--accent-light)' : 'transparent',
                  color: hasCurrent ? 'var(--accent)' : 'var(--text-primary)',
                  border: !showExpanded && hasCurrent ? '1px solid var(--border-strong)' : '1px solid transparent',
                }}
              >
                <group.icon
                  size={18}
                  style={{
                    color: hasCurrent ? 'var(--accent)' : 'var(--text-secondary)',
                    flexShrink: 0,
                  }}
                />

                {showExpanded && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium truncate">
                      {group.title}
                    </span>
                    {group.items.length > 0 && (
                      <div className="flex-shrink-0" style={{ color: 'var(--text-tertiary)' }}>
                        {isGroupExpanded ? <Minus size={13} /> : <Plus size={13} />}
                      </div>
                    )}
                  </>
                )}

                {/* Live dot for active routes when collapsed */}
                {!showExpanded && hasCurrent && (
                  <span
                    className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent-glow)' }}
                  />
                )}
              </button>

              {/* Tooltip in collapsed mode */}
              {!showExpanded && (
                <div
                  className="absolute left-16 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-xs font-semibold border shadow-lg opacity-0 pointer-events-none group-hover/item:opacity-100 transition-opacity duration-150 z-50 whitespace-nowrap"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-strong)',
                  }}
                >
                  {group.title}
                </div>
              )}

              {/* Sub-items Accordion */}
              {showExpanded && group.items.length > 0 && (
                <AnimatePresence initial={false}>
                  {isGroupExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className="ml-5 pl-3 mt-1 py-1 space-y-1"
                        style={{ borderLeft: '1px solid var(--border)' }}
                      >
                        {group.items.map((item) => {
                          const isActive =
                            item.path === pathname || item.path.split('#')[0] === pathname
                          return (
                            <Link
                              key={item.path}
                              href={item.path}
                              onClick={() => isMobile && setIsMobileOpen(false)}
                              className="block px-3 py-2 rounded-lg text-xs transition-all truncate"
                              style={{
                                background: isActive ? 'var(--accent-light)' : 'transparent',
                                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                                fontWeight: isActive ? 600 : 400,
                                border: isActive ? '1px solid var(--border-strong)' : '1px solid transparent',
                              }}
                            >
                              {item.title}
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          )
        })}
      </nav>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <div className="p-3 shrink-0 border-t" style={{ borderColor: 'var(--border)' }}>
        {(isMobile || !isCollapsed) ? (
          <div className="text-center">
            <div className="accent-line mb-2" />
            <p className="text-[10px] tracking-wider uppercase font-semibold" style={{ color: 'var(--text-tertiary)' }}>
              MIT License
            </p>
          </div>
        ) : (
          <div className="flex justify-center text-[10px] font-bold" style={{ color: 'var(--text-tertiary)' }}>
            MIT
          </div>
        )}
      </div>
    </>
  )

  return (
    <>
      {/* ── Desktop Sidebar ──────────────────────────────────── */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-30 hidden lg:flex flex-col border-r transition-all duration-300 ease-in-out"
        style={{ ...glassStyle, width: sidebarWidth, borderColor: 'var(--border)' }}
      >
        {sidebarContent(false)}
      </aside>

      {/* ── Mobile Sidebar Overlay ────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 flex flex-col border-r lg:hidden"
              style={{
                ...glassStyle,
                width: 280,
                borderColor: 'var(--border)',
                boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
              }}
            >
              {sidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
