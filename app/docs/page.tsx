'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Rocket, Zap, Brain, ShieldCheck, Building2, Package,
  Lightbulb, BookOpen, GitCommitHorizontal, Handshake,
  ShieldAlert, ArrowRight, Terminal, CheckCircle2,
} from 'lucide-react'

const sections = [
  {
    icon: Rocket,
    title: 'Getting Started',
    desc: 'Install DevForge, run your first pipeline, and configure offline mode.',
    links: [
      { label: 'Installation & Quick Start', href: '/docs/getting-started/installation' },
      { label: 'Offline Mode', href: '/docs/getting-started/offline-mode' },
    ],
  },
  {
    icon: Zap,
    title: 'Core Commands',
    desc: 'Init, update, preview, and rollback — the core DevForge CLI workflow.',
    links: [
      { label: 'devforge init', href: '/docs/commands/init' },
      { label: 'devforge update', href: '/docs/commands/update' },
      { label: 'devforge preview', href: '/docs/commands/preview' },
      { label: 'devforge rollback', href: '/docs/commands/rollback' },
    ],
  },
  {
    icon: Brain,
    title: 'Agent System',
    desc: 'LLM providers, LangGraph orchestration, cache, and cross-session memory.',
    links: [
      { label: 'How the Agent Works', href: '/docs/agent/how-it-works' },
      { label: 'LLM Provider Setup', href: '/docs/agent/llm-setup' },
      { label: 'Agent Graph (LangGraph)', href: '/docs/agent/graph' },
      { label: 'Memory System', href: '/docs/agent/memory' },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    desc: 'NIST SP 800-53, ISO 27001 scanning, auto-fix, and Trivy integration.',
    links: [
      { label: 'Security Model', href: '/docs/security/model' },
      { label: 'Compliance Agent', href: '/docs/security/compliance' },
      { label: 'devforge audit', href: '/docs/security/audit' },
      { label: 'Auto-Fix Capabilities', href: '/docs/security/auto-fix' },
    ],
  },
  {
    icon: Building2,
    title: 'Infrastructure as Code',
    desc: 'Detect, execute, or generate Terraform, CDK, Pulumi, and Ansible configs.',
    links: [
      { label: 'IaC Detection', href: '/docs/iac/detection' },
      { label: 'IaC Generation Loop', href: '/docs/iac/generation' },
      { label: 'Verification Steps', href: '/docs/iac/verification' },
      { label: 'Deployment Targets', href: '/docs/iac/targets' },
    ],
  },
  {
    icon: Package,
    title: 'Deployment & Diagnostics',
    desc: 'Automate AWS deployments and diagnose pipeline failures.',
    links: [
      { label: 'devforge deploy', href: '/docs/deployment/deploy' },
      { label: 'devforge diagnose', href: '/docs/deployment/diagnose' },
    ],
  },
  {
    icon: Lightbulb,
    title: 'Recommendations',
    desc: 'View, manage, and dismiss AI-generated pipeline recommendations.',
    links: [
      { label: 'devforge recommendations', href: '/docs/recommendations/list' },
      { label: 'Dismissing Recommendations', href: '/docs/recommendations/dismiss' },
    ],
  },
  {
    icon: BookOpen,
    title: 'CLI Reference',
    desc: 'Complete reference for every DevForge command and flag.',
    links: [
      { label: 'Full Command Reference', href: '/docs/cli-reference' },
    ],
  },
]

const highlights = [
  { icon: CheckCircle2, text: 'Amazon Nova Pro, Gemini, OpenAI, Anthropic & Bedrock' },
  { icon: CheckCircle2, text: 'NIST SP 800-53 & ISO 27001 compliance scanning' },
  { icon: CheckCircle2, text: 'Terraform, CDK, Pulumi & Ansible IaC generation' },
  { icon: CheckCircle2, text: 'Fully functional in air-gapped / offline environments' },
  { icon: CheckCircle2, text: 'Transactional file writes with rollback on failure' },
  { icon: CheckCircle2, text: 'LangGraph stateful orchestration with cross-session memory' },
]

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-xl border font-mono text-sm"
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

export default function DocsOverviewPage() {
  return (
    <div className="max-w-4xl py-4 space-y-16">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 border"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)', borderColor: 'var(--accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Documentation
        </div>
        <h1 className="text-4xl font-bold mb-4">DevForge Overview</h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          DevForge is an agentic AI-powered CLI that detects your project stack, generates
          production-ready CI/CD pipelines, scans for compliance issues, and automates infrastructure
          deployment — all from a single command.
        </p>
      </motion.div>

      {/* Quick install */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4">Quick install</h2>
        <div className="space-y-3">
          <CodeBlock code="npm install -g @apurvv28/devforge" />
          <CodeBlock code="npx devforge init" />
        </div>
        <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          No LLM required — pass <code className="font-mono px-1 rounded text-xs"
            style={{ background: 'var(--bg-code)', color: 'var(--accent)' }}>--no-agent</code> to run fully offline.
          See the <Link href="/docs/getting-started/installation" className="underline"
            style={{ color: 'var(--accent)' }}>Installation guide</Link> for full setup.
        </p>
      </motion.section>

      {/* Highlights */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-6">What DevForge does</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {highlights.map((h) => (
            <div key={h.text} className="flex items-start gap-3 p-3 rounded-lg border"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <h.icon size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{h.text}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Doc sections grid */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-6">Explore the docs</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl border"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--accent-light)' }}>
                  <section.icon size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-semibold">{section.title}</h3>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {section.desc}
              </p>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
                      style={{ color: 'var(--accent)' }}>
                      <ArrowRight size={13} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer links */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: GitCommitHorizontal, title: 'Changelog', desc: 'See what changed in each release.', href: '/docs/changelog' },
            { icon: Handshake, title: 'Contributing', desc: 'Help improve DevForge.', href: '/docs/contributing' },
            { icon: ShieldAlert, title: 'Security Policy', desc: 'Report vulnerabilities responsibly.', href: '/docs/security-policy' },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center justify-between p-4 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <item.icon size={16} style={{ color: 'var(--accent)' }} />
                <div>
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</div>
                </div>
              </div>
              <ArrowRight size={14} style={{ color: 'var(--accent)' }} />
            </Link>
          ))}
        </div>
      </motion.section>

    </div>
  )
}
