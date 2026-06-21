'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Terminal, ChevronRight, CheckCircle2, AlertCircle,
  Zap, Brain, Shield, ArrowRight, Info,
} from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'Install DevForge',
    description: 'Install globally via npm to access the CLI from anywhere.',
    code: 'npm install -g @apurvv28/devforge',
  },
  {
    step: '02',
    title: 'Navigate to your project',
    description: 'Move into your existing project directory.',
    code: 'cd your-project',
  },
  {
    step: '03',
    title: 'Run init',
    description: 'DevForge detects your stack, prompts for preferences, and generates your pipeline.',
    code: 'npx devforge init',
  },
]

const flags = [
  { flag: '--dry-run', desc: 'Simulate generation without writing any files.' },
  { flag: '--force-detect', desc: 'Skip detection cache and re-run project detection.' },
  { flag: '--preview', desc: 'Show generated file contents before writing.' },
  { flag: '--timing', desc: 'Show execution duration per phase.' },
  { flag: '--no-agent', desc: 'Skip LLM logic entirely — run in offline/rule-based mode.' },
  { flag: '--no-report', desc: 'Skip printing the expected pipeline output report.' },
]

const providers = [
  {
    name: 'Amazon Nova Pro',
    envVars: ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_SESSION_TOKEN (optional)'],
  },
  {
    name: 'Amazon Bedrock',
    envVars: ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'],
  },
  {
    name: 'Gemini',
    envVars: ['GOOGLE_API_KEY', 'GOOGLE_PROJECT_ID'],
  },
  {
    name: 'OpenAI',
    envVars: ['OPENAI_API_KEY'],
  },
  {
    name: 'Anthropic',
    envVars: ['ANTHROPIC_API_KEY'],
  },
]

function CodeBlock({ code, label = 'terminal' }: { code: string; label?: string }) {
  return (
    <div className="rounded-xl border font-mono text-sm overflow-x-auto"
      style={{ background: 'var(--bg-code)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <Terminal size={13} style={{ color: 'var(--accent)' }} />
        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
      </div>
      <pre className="px-4 py-3 m-0 border-none" style={{ background: 'transparent' }}>
        <code style={{ color: 'var(--text-primary)' }}>
          <span style={{ color: 'var(--text-tertiary)' }}>$ </span>{code}
        </code>
      </pre>
    </div>
  )
}

export default function InstallationPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Getting Started</Link>
          <ChevronRight size={14} />
          <span>Installation & Quick Start</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Installation & Quick Start</h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Get DevForge running in your project in under two minutes. One command detects your stack,
          configures your LLM provider, and generates a production-ready CI/CD pipeline.
        </p>
      </motion.div>

      {/* Prerequisites */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Node.js 18+', note: 'Required for the CLI runtime' },
            { label: 'npm or npx', note: 'For installation and execution' },
            { label: 'A project directory', note: 'DevForge reads your package.json and config files' },
            { label: 'LLM provider credentials', note: 'Optional — skip with --no-agent for offline mode' },
          ].map((req) => (
            <div key={req.label} className="flex items-start gap-3 p-3 rounded-lg border"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <div>
                <span className="font-medium">{req.label}</span>
                <span className="ml-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>{req.note}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Quick Start Steps */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background: 'var(--accent)', color: 'white' }}>
                  {s.step}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ background: 'var(--border)' }} />
                )}
              </div>
              <div className="flex-1 pb-6">
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{s.description}</p>
                <CodeBlock code={s.code} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* What happens during init */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">What happens during <code className="text-base px-2 py-0.5 rounded"
          style={{ background: 'var(--bg-code)', color: 'var(--accent)' }}>devforge init</code></h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Zap, title: 'Stack Detection', desc: 'Reads package.json, config files, and lockfiles to identify your framework, runtime, and deployment needs.' },
            { icon: Brain, title: 'LLM Enrichment', desc: 'If a provider is configured, the agent enriches the pipeline with recommendations and actionable findings.' },
            { icon: Shield, title: 'File Generation', desc: 'Writes workflow YAML, Dockerfile, and a SECRETS_REQUIRED.md — all guarded by transactional rollback.' },
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

      {/* Flags */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">Init flags</h2>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--bg-code)' }}>
                <th className="p-3 text-left font-semibold">Flag</th>
                <th className="p-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {flags.map((f) => (
                <tr key={f.flag} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3">
                    <code className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{ background: 'var(--bg-code)', color: 'var(--accent)' }}>
                      {f.flag}
                    </code>
                  </td>
                  <td className="p-3" style={{ color: 'var(--text-secondary)' }}>{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-start gap-2 text-sm p-3 rounded-lg border"
          style={{ background: 'var(--accent-light)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          <Info size={15} className="mt-0.5 shrink-0" />
          <span>Use <code className="font-mono">--preview --timing</code> together for a detailed dry run with performance metrics before committing files to disk.</span>
        </div>
      </motion.section>

      {/* LLM Providers */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-2">LLM Provider Setup</h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          During <code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: 'var(--bg-code)' }}>devforge init</code> you'll be prompted to choose a provider.
          Set the required environment variables beforehand.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {providers.map((p) => (
            <div key={p.name} className="p-4 rounded-xl border"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <p className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
              <div className="space-y-1">
                {p.envVars.map((v) => (
                  <code key={v} className="block text-xs px-2 py-1 rounded font-mono"
                    style={{ background: 'var(--bg-code)', color: 'var(--text-secondary)' }}>
                    {v}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 text-sm p-3 rounded-lg border"
          style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <AlertCircle size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
          <span style={{ color: 'var(--text-secondary)' }}>
            Optionally set <code className="font-mono text-xs px-1 rounded"
              style={{ background: 'var(--bg-code)' }}>ELASTICSEARCH_URL</code> and <code className="font-mono text-xs px-1 rounded"
              style={{ background: 'var(--bg-code)' }}>ELASTICSEARCH_API_KEY</code> to enable cross-session memory.
          </span>
        </div>
      </motion.section>

      {/* Next steps */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">Next steps</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { href: '/docs/getting-started/offline-mode', title: 'Offline Mode', desc: 'Run DevForge without any LLM in air-gapped environments.' },
            { href: '/docs/commands#init', title: 'Full Init Reference', desc: 'Every flag and option for devforge init.' },
            { href: '/docs/agentic-workflow#llm-setup', title: 'LLM Setup Guide', desc: 'Deep-dive into each provider configuration.' },
            { href: '/docs/commands#audit', title: 'Audit & Compliance', desc: 'Scan generated workflows for NIST and ISO violations.' },
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
