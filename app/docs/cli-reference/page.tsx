'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, ChevronRight, Terminal, Info, CheckCircle2
} from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-xl border font-mono text-sm overflow-x-auto my-3"
      style={{ background: 'var(--bg-code)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <Terminal size={13} style={{ color: 'var(--accent)' }} />
        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>terminal</span>
      </div>
      <pre className="px-4 py-3 m-0 border-none" style={{ background: 'transparent' }}>
        <code style={{ color: 'var(--text-primary)' }}>
          <span style={{ color: 'var(--text-tertiary)' }}>$ </span>{code}
        </code>
      </pre>
    </div>
  )
}

const commandsList = [
  { cmd: 'devforge init', desc: 'Initialize stack detection and generate workflow configurations.', cat: 'Core' },
  { cmd: 'devforge update', desc: 'Refresh existing configurations against templates while keeping edits.', cat: 'Core' },
  { cmd: 'devforge preview', desc: 'Show visual preview of generated files without writing to disk.', cat: 'Core' },
  { cmd: 'devforge rollback', desc: 'Revert the workspace files back to a previous generation transaction.', cat: 'Core' },
  { cmd: 'devforge audit', desc: 'Scan workflows and infrastructure configurations for security anomalies.', cat: 'Security' },
  { cmd: 'devforge deploy', desc: 'Run steps defined in the deployment plan (AWS integration).', cat: 'Deployment' },
  { cmd: 'devforge jenkins setup', desc: 'Set up a Jenkins job and GitHub webhook wiring.', cat: 'Integration' },
  { cmd: 'devforge diagnose', desc: 'Evaluate log files to isolate compilation or pipeline failures.', cat: 'Diagnostics' },
  { cmd: 'devforge agent status', desc: 'Report active provider configuration and Elasticsearch connection state.', cat: 'Agent' },
  { cmd: 'devforge agent reset', desc: 'Reset stored provider tokens and prompt for setup.', cat: 'Agent' },
  { cmd: 'devforge agent graph status', desc: 'Show checkpoint log records for LangGraph workflows.', cat: 'Agent' },
  { cmd: 'devforge agent graph reset', desc: 'Clear checkpoints and local history memory for graphs.', cat: 'Agent' },
  { cmd: 'devforge cache clear', desc: 'Flush all local stack metadata cache entries.', cat: 'Cache' },
  { cmd: 'devforge cache stats', desc: 'Review cache hits, age, and size metrics.', cat: 'Cache' },
  { cmd: 'devforge cache test-elasticache', desc: 'Test Amazon ElastiCache Redis connectivity.', cat: 'Cache' },
  { cmd: 'devforge memory:stats', desc: 'Retrieve Elasticsearch recommendation learning index details.', cat: 'Memory' },
  { cmd: 'devforge recommendations', desc: 'Review list of active recommendations.', cat: 'Agent' },
  { cmd: 'devforge recommendations dismiss <id>', desc: 'Dismiss a stored recommendation by its unique ID.', cat: 'Agent' }
]

export default function CliReferencePage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>CLI Reference</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <BookOpen size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">CLI Reference</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          This page lists all CLI options, arguments, and diagnostic subcommands included in DevForge.
        </p>
      </motion.div>

      {/* Command List Matrix */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Command Matrix</h2>
        <div className="rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--bg-code)' }}>
                <th className="p-3 text-left font-semibold">Command</th>
                <th className="p-3 text-left font-semibold">Description</th>
                <th className="p-3 text-center font-semibold">Category</th>
              </tr>
            </thead>
            <tbody>
              {commandsList.map((c) => (
                <tr key={c.cmd} className="border-t animate-fade-in" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3 font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>{c.cmd}</td>
                  <td className="p-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{c.desc}</td>
                  <td className="p-3 text-center text-xs">
                    <span className="px-2 py-0.5 rounded-full font-medium bg-sky-500/10" style={{ color: 'var(--accent)' }}>
                      {c.cat}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Core Flags */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Common Generation Options</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Configure standard flags to customize output options:
        </p>
        <div className="space-y-3">
          {[
            { flag: '--dry-run', desc: 'Simulate file generation output and print results without committing writes.' },
            { flag: '--preview', desc: 'Display physical file content buffers on standard output for inspection.' },
            { flag: '--no-agent', desc: 'Bypass all LLM provider nodes and execute deterministic stack detectors.' },
            { flag: '--timing', desc: 'Surface duration details for detection, validation, and generation blocks.' }
          ].map((item) => (
            <div key={item.flag} className="p-4 rounded-xl border flex gap-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <code className="font-mono text-xs font-semibold shrink-0" style={{ color: 'var(--accent)' }}>{item.flag}</code>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
