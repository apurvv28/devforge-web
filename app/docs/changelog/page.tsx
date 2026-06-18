'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  GitCommitHorizontal, ChevronRight
} from 'lucide-react'
import { ChangelogFeed } from '@/components/ChangeLogFeed'

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl py-4 space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Changelog</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <GitCommitHorizontal size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Changelog</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Keep track of release additions, features, adjustments, and bug fixes for the DevForge CLI ecosystem.
        </p>
      </motion.div>

      {/* Feed Component */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <ChangelogFeed />
      </motion.section>
    </div>
  )
}
