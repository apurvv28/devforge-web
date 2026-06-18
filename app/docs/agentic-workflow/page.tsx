'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Brain, ChevronRight, CheckCircle2, Terminal,
  Cpu, Database, Layers, RefreshCw, Key, Info
} from 'lucide-react'

function CodeBlock({ code, label = 'terminal' }: { code: string; label?: string }) {
  return (
    <div className="rounded-xl border font-mono text-sm overflow-x-auto my-3"
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

const graphs = [
  {
    name: 'devForgeGraph (init / update)',
    desc: 'Orchestrates the main pipeline generation flow when executing init or update commands.',
    flow: 'check_enabled ──→ load_last_run ──→ detect_failures ──→ enrich_recommendations ──→ security ──→ report_expected ──→ persist_memory'
  },
  {
    name: 'pipelineDiagnosisGraph (devforge diagnose)',
    desc: 'Runs failure diagnostics by parsing logs to isolate compilation or environment errors.',
    flow: 'load_last_run ──→ detect_failures ──→ enrich_recommendations? ──→ report_expected'
  },
  {
    name: 'securityRemediationGraph (devforge audit --security --fix)',
    desc: 'Runs a security verification loop to scan, prompt, and auto-apply patches to workflows.',
    flow: 'scan ──→ approval ──→ auto_fix ──→ scan (loop, max attempts)'
  }
]

export default function AgenticWorkflowPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Agentic Workflow</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Brain size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Agentic Workflow</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge v2 introduces a state-of-the-art agent-driven workflow layer that orchestrates pipeline generation, compliance checks, and auto-remediation using LangGraph.
        </p>
      </motion.div>

      {/* How the Agent Works */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4" id="how-it-works">How the Agent Works</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>
            The agent coordinates under the <code className="font-mono px-1 rounded text-xs" style={{ background: 'var(--bg-code)' }}>devforge agent</code> command layer and auto-invokes recommendation flows during <code className="font-mono px-1 rounded text-xs" style={{ background: 'var(--bg-code)' }}>devforge init</code>.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Project Context Gathering:</strong> The agent reads your package files, framework configurations, and Git history to build a local context.</li>
            <li><strong>LLM Enrichment:</strong> If a provider is configured, DevForge enriches standard configurations with security recommendations and contextual warnings tailored to your stack.</li>
            <li><strong>Static Fallback:</strong> If offline mode is enabled, the agent relies entirely on a deterministic rule-based engine to complete generation without remote model calls.</li>
          </ul>
        </div>
      </motion.section>

      {/* LangGraph Orchestration */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4" id="langgraph">Agent Graph (LangGraph)</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          DevForge manages complex state transitions using LangGraph, executing specific graphs based on the CLI inputs:
        </p>
        <div className="space-y-6">
          {graphs.map((g) => (
            <div key={g.name} className="p-5 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{g.name}</h3>
              <p className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>{g.desc}</p>
              <div className="p-3 rounded-lg border font-mono text-xs overflow-x-auto" style={{ background: 'var(--bg-code)', borderColor: 'var(--border)', color: 'var(--accent)' }}>
                {g.flow}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Architecture */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="architecture" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4">Architecture</h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          DevForge follows a layered architecture to keep pipeline generation safe, dry-runnable, and verifiable:
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
            <h4 className="font-bold mb-1">CLI Command Layer</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Parses flags, reads workspace signals, and kicks off corresponding LangGraph orchestrator flows.</p>
          </div>
          <div className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
            <h4 className="font-bold mb-1">State Graph Layer</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Executes workflow nodes, processes LLM recommendation enrichment, and handles agent memory checkpoints.</p>
          </div>
          <div className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
            <h4 className="font-bold mb-1">Verification Engine</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Runs isolated toolchain commands to double-check that generated resources compile safely before commits.</p>
          </div>
        </div>
      </motion.section>

      {/* LLM Providers */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4" id="llm-setup">LLM Provider Setup</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          DevForge supports five major LLM providers. Configure the required environment variables:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'Amazon Nova Pro', keys: ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_SESSION_TOKEN (optional)'] },
            { name: 'Amazon Bedrock Runtime', keys: ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'] },
            { name: 'Google Gemini', keys: ['GOOGLE_API_KEY', 'GOOGLE_PROJECT_ID'] },
            { name: 'OpenAI', keys: ['OPENAI_API_KEY'] },
            { name: 'Anthropic', keys: ['ANTHROPIC_API_KEY'] }
          ].map((prov) => (
            <div key={prov.name} className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <h4 className="font-medium text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{prov.name}</h4>
              <div className="space-y-1">
                {prov.keys.map((k) => (
                  <code key={k} className="block text-[11px] px-2 py-0.5 rounded font-mono" style={{ background: 'var(--bg-code)', color: 'var(--text-secondary)' }}>
                    {k}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Cache & Memory Systems */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4" id="cache">Cache & Memory Systems</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Cache */}
          <div className="p-5 rounded-xl border space-y-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2">
              <Layers size={18} style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold text-sm">Cache System</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Caches stack detection results and template metadata locally under <code className="font-mono text-[10px]">.devforge/</code> to accelerate repeat executions.
            </p>
            <div className="space-y-1.5 pt-2">
              <code className="block text-[11px]" style={{ color: 'var(--text-tertiary)' }}>$ devforge cache clear</code>
              <code className="block text-[11px]" style={{ color: 'var(--text-tertiary)' }}>$ devforge cache stats</code>
            </div>
          </div>

          {/* Memory */}
          <div id="memory" className="scroll-mt-24 p-5 rounded-xl border space-y-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2">
              <Database size={18} style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold text-sm">Memory System</h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Cross-session memory is backed by Elasticsearch. Stores prior recommendations and prevents repeating the same feedback on subsequent executions.
            </p>
            <div className="space-y-1.5 pt-2">
              <code className="block text-[11px]" style={{ color: 'var(--text-tertiary)' }}>$ devforge memory:stats</code>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Agent Commands Reference */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold mb-4" id="agent-commands">Agent Commands Reference</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Manage your AI agent configurations, memory states, and caches using these CLI commands:
        </p>
        <div className="space-y-3">
          <CodeBlock code="devforge agent status" label="connectivity status" />
          <CodeBlock code="devforge agent reset" label="reset agent parameters" />
          <CodeBlock code="devforge agent graph status" label="last LangGraph run checkpoint stats" />
          <CodeBlock code="devforge agent graph reset" label="clear checkpoint records" />
        </div>
      </motion.section>
    </div>
  )
}
