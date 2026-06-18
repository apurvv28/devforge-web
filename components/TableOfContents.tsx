'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUp, FolderGit, Edit2, MessageSquare, PlusCircle } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: number
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function TableOfContents() {
  const pathname = usePathname()
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const extractHeadings = () => {
      const container = document.querySelector('.doc-content')
      if (!container) return

      const headingElements = Array.from(container.querySelectorAll('h2, h3'))
      const items = headingElements.map((el) => {
        // Ensure element has an ID for anchor linking
        if (!el.id) {
          el.id = slugify(el.textContent || '')
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase() === 'h2' ? 2 : 3,
        }
      })

      setTocItems(items)

      // Select first heading as default active if scroll is at the top
      if (items.length > 0) {
        setActiveId(items[0].id)
      }
    }

    // Delay extraction slightly to let Next.js finish rendering/hydration
    timeoutId = setTimeout(extractHeadings, 150)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  // Scroll spy effect
  useEffect(() => {
    if (tocItems.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120 // Header/navbar offset
      const container = document.querySelector('.doc-content')
      if (!container) return

      const headingElements = Array.from(container.querySelectorAll('h2, h3'))
      let currentActiveId = ''

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i]
        const top = el.getBoundingClientRect().top + window.scrollY
        if (scrollPosition >= top - 20) {
          currentActiveId = el.id
        } else {
          break
        }
      }

      if (currentActiveId) {
        setActiveId(currentActiveId)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run once initially
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const headerOffset = 90
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`)
      setActiveId(id)
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    window.history.pushState(null, '', pathname)
  }

  // Generate GitHub edit link
  const getEditUrl = () => {
    const baseUrl = 'https://github.com/apurvv28/devforge-web/blob/main'
    const cleanPath = pathname === '/docs' ? '/docs/page.tsx' : `${pathname}/page.tsx`
    return `${baseUrl}/frontend/app${cleanPath}`
  }

  if (tocItems.length === 0) {
    return (
      <div className="sticky top-24 space-y-8 py-2 text-xs">
        <div className="space-y-3 p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <h4 className="font-semibold uppercase tracking-wider text-[var(--text-tertiary)] text-[10px]">Community</h4>
          <ul className="space-y-3">
            <li>
              <a
                href={getEditUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <Edit2 size={13} />
                <span>Edit this page</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/apurvv28/devforge-web/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <PlusCircle size={13} />
                <span>Submit an issue</span>
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/devforge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <MessageSquare size={13} />
                <span>Join Discord community</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 py-2 no-scrollbar space-y-8 select-none">
      {/* Table of contents list */}
      <div className="space-y-3">
        <h4 className="font-semibold uppercase tracking-wider text-[var(--text-tertiary)] text-[10px]">On This Page</h4>

        <div className="border-l border-[var(--border)] ml-1 pl-3 space-y-3 text-xs py-1">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={`block transition-colors duration-200 leading-relaxed ${item.level === 3 ? 'pl-4 text-[var(--text-tertiary)]' : ''
                } ${activeId === item.id
                  ? 'text-[var(--accent)] font-medium border-l border-[var(--accent)] -ml-[13px] pl-[12px]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>

      {/* Helpful links group */}
      <div className="space-y-3 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
        <h4 className="font-semibold uppercase tracking-wider text-[var(--text-tertiary)] text-[10px]">Contribute</h4>

        <ul className="space-y-3 text-xs">
          <li>
            <a
              href={getEditUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <Edit2 size={13} />
              <span>Edit this page on GitHub</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/apurvv28/devforge-web/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <FolderGit size={13} />
              <span>Submit feedback / bug</span>
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/devforge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <MessageSquare size={13} />
              <span>Join our Discord</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={handleScrollToTop}
        className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-200 pt-2 border-t w-full text-left cursor-pointer"
        style={{ borderColor: 'var(--border)' }}
      >
        <ArrowUp size={13} />
        <span>Back to top</span>
      </button>
    </div>
  )
}
