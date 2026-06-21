'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  WifiOff, ChevronRight, CheckCircle2, XCircle,
  Terminal, ArrowRight, ShieldCheck, Zap, Info,
} from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-xl border font-mono text-sm overflow-x-auto"
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

const works = [
  'Stack detection from package.json and config files',
  'CI/CD workflow YAML generation',
  'Dockerfile and SECRETS_REQUIRED.md output',
  'IaC detection and static analysis',
  'devforge update, preview, rollback, and audit',
  'All rule-based compliance checks',
  'Expected pipeline output report',
]

const doesNotWork = [
  'LLM-powered recommendations and enrichment',
  'Cross-session memory (Elasticsearch)',
  'LangGraph orchestration graphs',
  'IaC generation via LLM parameter fill-in',
  'AI-assisted pipeline diagnosis',
]

export default function OfflineModePage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Getting Started</Link>
          <ChevronRight size={14} />
          <span>Offline Mode</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <WifiOff size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Offline Mode</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge is fully functional without any LLM provider. Offline mode is ideal for air-gapped
          environments, CI runners without external network access, or when you simply don't need AI enrichment.
        </p>
      </motion.div>

      {/* How to enable */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">How to enable offline mode</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          Pass <code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: 'var(--bg-code)', color: 'var(--accent)' }}>--no-agent</code> to any command to
          skip all LLM logic and run the local rule-based engine only.
        </p>
        <div className="space-y-3">
          <CodeBlock code="npx devforge init --no-agent" />
          <CodeBlock code="npx devforge update --no-agent" />
          <CodeBlock code="npx devforge audit --no-agent" />
        </div>
        <div className="mt-4 flex items-start gap-2 text-sm p-3 rounded-lg border"
          style={{ background: 'var(--accent-light)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          <Info size={15} className="mt-0.5 shrink-0" />
          <span>
            If no LLM credentials are configured and no provider is selected during the prompt,
            DevForge automatically falls back to offline mode — no flag required.
          </span>
        </div>
      </motion.section>

      {/* What works / doesn't */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-6">Capabilities in offline mode</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={18} style={{ color: '#22c55e' }} />
              <h3 className="font-semibold">Works offline</h3>
            </div>
            <ul className="space-y-2">
              {works.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: '#22c55e' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={18} style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold">Requires LLM</h3>
            </div>
            <ul className="space-y-2">
              {doesNotWork.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <XCircle size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Air-gapped environments */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">Air-gapped environments</h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          DevForge makes no network requests during generation. All stack detection and file generation
          happens locally from templates and rule-based logic.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: ShieldCheck,
              title: 'No outbound requests',
              desc: 'Generation never calls external services. Only opt-in LLM providers make network calls.',
            },
            {
              icon: Zap,
              title: 'Deterministic output',
              desc: 'Offline mode produces the same output every run — no randomness from model responses.',
            },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-xl border"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: 'var(--accent-light)' }}>
                <item.icon size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Using with CI */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">Using offline mode in CI</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          Combine <code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: 'var(--bg-code)', color: 'var(--accent)' }}>--no-agent</code> with{' '}
          <code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: 'var(--bg-code)', color: 'var(--accent)' }}>--dry-run</code> to validate
          generation in CI without writing files or calling any external service.
        </p>
        <CodeBlock code="npx devforge init --no-agent --dry-run --no-report" />
        <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Use <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--bg-code)' }}>--no-report</code> to
          suppress the pipeline output summary and keep CI logs clean.
        </p>
      </motion.section>

      {/* Cache in offline mode */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">Detection cache</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          DevForge caches stack detection results in <code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: 'var(--bg-code)' }}>.devforge/</code> to speed up repeated runs.
          This works independently of the LLM provider.
        </p>
        <div className="space-y-3">
          <CodeBlock code="npx devforge cache stats" />
          <CodeBlock code="npx devforge cache clear" />
        </div>
        <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Use <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--bg-code)' }}>--force-detect</code> on
          init to bypass the cache without clearing it.
        </p>
      </motion.section>

      {/* Next steps */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">Next steps</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { href: '/docs/getting-started/installation', title: 'Installation & Quick Start', desc: 'Full setup guide with LLM provider configuration.' },
            { href: '/docs/agentic-workflow#llm-setup', title: 'LLM Provider Setup', desc: 'Add AI enrichment when you are ready.' },
            { href: '/docs/commands#init', title: 'devforge init reference', desc: 'All flags and options in detail.' },
            { href: '/docs/agentic-workflow#cache', title: 'Cache System', desc: 'Understand and manage the detection cache.' },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <div>
                <div className="font-semibold text-sm">{item.title}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</div>
              </div>
              <ArrowRight size={16} style={{ color: 'var(--accent)' }} />
            </Link>
          ))}
        </div>
      </motion.section>

    </div>
  )
}
