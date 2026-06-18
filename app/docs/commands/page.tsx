'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Terminal, ChevronRight, Info, AlertCircle, ArrowRight } from 'lucide-react'

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

function Flag({ flag, desc }: { flag: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
      <code className="shrink-0 px-2 py-0.5 rounded text-xs font-mono mt-0.5"
        style={{ background: 'var(--bg-code)', color: 'var(--accent)' }}>
        {flag}
      </code>
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{desc}</span>
    </div>
  )
}

function Note({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' }) {
  const Icon = type === 'warning' ? AlertCircle : Info
  return (
    <div className="flex items-start gap-2 text-sm p-3 rounded-lg border mt-3"
      style={{
        background: type === 'warning' ? 'var(--bg-elevated)' : 'var(--accent-light)',
        borderColor: type === 'warning' ? 'var(--border)' : 'var(--accent)',
        color: type === 'warning' ? 'var(--text-secondary)' : 'var(--accent)',
      }}>
      <Icon size={15} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

function Section({ id, title, badge, children }: { id: string; title: string; badge?: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="scroll-mt-24 pt-10 border-t first:border-0 first:pt-0"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {badge && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </motion.section>
  )
}

const commands = [
  { id: 'init', label: 'devforge init' },
  { id: 'update', label: 'devforge update' },
  { id: 'preview', label: 'devforge preview' },
  { id: 'rollback', label: 'devforge rollback' },
  { id: 'audit', label: 'devforge audit' },
  { id: 'deploy', label: 'devforge deploy' },
  { id: 'diagnose', label: 'devforge diagnose' },
  { id: 'recommendations', label: 'devforge recommendations' },
]

export default function CommandsPage() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [])

  return (
    <div className="max-w-3xl py-4">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Commands</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Commands</h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Complete reference for every DevForge CLI command. Click any command in the sidebar to jump directly to it.
        </p>

        {/* On-page nav */}
        <div className="mt-6 flex flex-wrap gap-2">
          {commands.map((cmd) => (
            <a key={cmd.id} href={`#${cmd.id}`}
              className="px-3 py-1 rounded-lg text-xs font-mono border transition-all hover:scale-105"
              style={{ background: 'var(--bg-code)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              {cmd.label}
            </a>
          ))}
        </div>
      </motion.div>

      <div className="space-y-0">

        {/* init */}
        <Section id="init" title="devforge init" badge="Core">
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Detects your project stack, collects deployment preferences, and generates CI/CD workflow files.
          </p>
          <CodeBlock code="npx devforge init" />
          <div className="mt-5 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ background: 'var(--bg-code)', color: 'var(--text-tertiary)' }}>FLAGS</div>
            <div className="px-4">
              <Flag flag="--dry-run" desc="Simulate generation without writing any files." />
              <Flag flag="--force-detect" desc="Skip detection cache and re-run project detection." />
              <Flag flag="--preview" desc="Show generated file contents before writing to disk." />
              <Flag flag="--timing" desc="Show execution duration per phase." />
              <Flag flag="--no-agent" desc="Skip LLM logic entirely — run in offline/rule-based mode." />
              <Flag flag="--no-report" desc="Skip printing the expected pipeline output report." />
            </div>
          </div>
          <Note type="info">
            Use <code className="font-mono text-xs">--preview --timing</code> together for a full dry run with per-phase performance metrics.
          </Note>
        </Section>

        {/* update */}
        <Section id="update" title="devforge update" badge="Core">
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Refreshes existing DevForge-managed workflows against the latest templates while preserving manually maintained sections.
          </p>
          <CodeBlock code="npx devforge update" />
          <div className="mt-5 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ background: 'var(--bg-code)', color: 'var(--text-tertiary)' }}>FLAGS</div>
            <div className="px-4">
              <Flag flag="--dry-run" desc="Print the diff without writing files." />
              <Flag flag="--no-report" desc="Skip printing the expected pipeline output report." />
            </div>
          </div>
          <Note type="info">
            Fails if there is no previous DevForge run to compare against. Always run <code className="font-mono text-xs">devforge init</code> first.
          </Note>
        </Section>

        {/* preview */}
        <Section id="preview" title="devforge preview" badge="Core">
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Shows a rendered preview of the files that would be generated — no disk writes ever occur.
          </p>
          <CodeBlock code="npx devforge preview" />
          <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Outputs generated file contents with line numbers and summarizes how many files are ready to generate.
          </p>
        </Section>

        {/* rollback */}
        <Section id="rollback" title="devforge rollback" badge="Core">
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Rolls back a previous code generation transaction, restoring the workspace to its exact prior state.
          </p>
          <CodeBlock code="npx devforge rollback" />
          <div className="mt-5 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ background: 'var(--bg-code)', color: 'var(--text-tertiary)' }}>FLAGS</div>
            <div className="px-4">
              <Flag flag="--tx <file>" desc="Path to a specific transaction log file. Defaults to the latest under .devforge/transactions." />
              <Flag flag="--dry-run" desc="Show what would be restored without touching disk." />
            </div>
          </div>
          <Note type="warning">
            Rollback will overwrite or delete generated files to restore the prior state. Verify before running without <code className="font-mono text-xs">--dry-run</code>.
          </Note>
        </Section>

        {/* audit */}
        <Section id="audit" title="devforge audit" badge="Security">
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Inspects <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--bg-code)' }}>.github/workflows</code> and
            reports security, performance, and compliance issues. Supports NIST SP 800-53 and ISO 27001 scanning.
          </p>
          <CodeBlock code="npx devforge audit --security --fix --yes" />
          <div className="mt-5 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ background: 'var(--bg-code)', color: 'var(--text-tertiary)' }}>FLAGS</div>
            <div className="px-4">
              <Flag flag="--fix" desc="Apply deterministic auto-fixes for security violations." />
              <Flag flag="--security" desc="Run NIST SP 800-53 + ISO 27001 compliance scan via SecurityComplianceAgent." />
              <Flag flag="--yes" desc="Auto-approve security fixes — required for non-interactive CI environments." />
            </div>
          </div>
          <Note type="info">
            Returns a non-zero exit code when high or critical issues are present — safe to use as a CI gate.
          </Note>
        </Section>

        {/* deploy */}
        <Section id="deploy" title="devforge deploy" badge="Deployment">
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Automates the execution of AWS deployment steps from the local workspace when the AWS CLI is authenticated.
          </p>
          <CodeBlock code="npx devforge deploy --yes" />
          <div className="mt-5 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ background: 'var(--bg-code)', color: 'var(--text-tertiary)' }}>FLAGS</div>
            <div className="px-4">
              <Flag flag="--dry-run" desc="Show deployment commands that would run without executing them." />
              <Flag flag="--yes" desc="Auto-approve all non-destructive deployment steps." />
              <Flag flag="--plan <file>" desc="Path to a custom deployment plan. Defaults to .devforge/deploy-plan.json." />
            </div>
          </div>
          <Note type="warning">
            Runs real AWS CLI, Docker, and kubectl commands against your current environment. Ensure IAM credentials and required binaries are present.
          </Note>
        </Section>

        {/* diagnose */}
        <Section id="diagnose" title="devforge diagnose" badge="Diagnostics">
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Runs pipeline failure diagnosis by parsing logs to pinpoint build or deploy failures without regenerating any files.
          </p>
          <CodeBlock code="npx devforge diagnose" />
          <div className="mt-5 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-4 py-2 text-xs font-semibold" style={{ background: 'var(--bg-code)', color: 'var(--text-tertiary)' }}>FLAGS</div>
            <div className="px-4">
              <Flag flag="--no-agent" desc="Use deterministic failure detection only, bypassing LLM-based graphs." />
              <Flag flag="--json" desc="Print machine-readable JSON output instead of human-friendly console output." />
            </div>
          </div>
        </Section>

        {/* recommendations */}
        <Section id="recommendations" title="devforge recommendations" badge="Agent">
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Lists all stored pipeline recommendations produced by the Recommendation Agent. Dismiss individual items to suppress them from future runs.
          </p>
          <CodeBlock code="npx devforge recommendations" />
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Dismiss a recommendation</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              Pass the recommendation ID to permanently suppress it from future reports.
            </p>
            <CodeBlock code="npx devforge recommendations dismiss rec_01h87b927a" />
          </div>
          <Note type="info">
            Dismissed recommendations are stored in <code className="font-mono text-xs">.devforge/</code> and survive across sessions.
          </Note>
        </Section>

      </div>

      {/* Next steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-12 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-xl font-bold mb-4">Related</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { href: '/docs/agent/how-it-works', title: 'Agent System', desc: 'How the LLM agent enriches each command.' },
            { href: '/docs/security/model', title: 'Security Model', desc: 'What DevForge reads and never touches.' },
            { href: '/docs/iac/detection', title: 'IaC Detection', desc: 'How deploy detects and executes infrastructure code.' },
            { href: '/docs/getting-started/offline-mode', title: 'Offline Mode', desc: 'Run all commands without an LLM provider.' },
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
      </motion.div>

    </div>
  )
}
