'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ListChecks, ChevronRight, CheckCircle2, AlertTriangle, Key, Terminal
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

const steps = [
  {
    title: 'Configure AWS Credentials',
    desc: 'Verify that your local deployment machine or runner has active CLI profiles setup.',
    action: 'aws configure'
  },
  {
    title: 'CDK Bootstrapping',
    desc: 'If using AWS CDK, you must initialize the cloud environment assets before running a deploy.',
    action: 'npx cdk bootstrap aws://<account-id>/<aws-region>'
  },
  {
    title: 'Terraform State Backend',
    desc: 'Generated tf files use a local state storage by default. You should refactor provider.tf to point to an S3/DynamoDB bucket for team storage.',
    action: '# Refactor infra/provider.tf backend block'
  }
]

export default function IaCPostStepsPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Infrastructure as Code</span>
          <ChevronRight size={14} />
          <span>Post-Generation Steps</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <ListChecks size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Post-Generation Steps</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Once DevForge outputs verified configurations, some manual actions are required before launching them in production.
        </p>
      </motion.div>

      {/* Manual Actions */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
        <h2 className="text-2xl font-bold mb-2">Required Action Checklist</h2>
        <div className="space-y-6">
          {steps.map((s, idx) => (
            <div key={s.title} className="p-5 rounded-xl border space-y-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                  0{idx + 1}
                </div>
                <h4 className="font-semibold text-sm">{s.title}</h4>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              <CodeBlock code={s.action} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* IAM Permissions */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">IAM Permissions and VPC bounds</h2>
        <div className="p-5 rounded-xl border space-y-3 text-xs leading-relaxed" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <p>
            <strong>Deploying Identity:</strong> Make sure the IAM role executing the scripts has sufficient permissions to build core elements such as AWS ECR repos, ECS clusters, target definitions, and related IAM roles.
          </p>
          <p>
            <strong>VPC Layout:</strong> Generated templates use the default AWS VPC setup for speed. For secure production builds, we recommend modifying the generated HCL or CDK constructs to deploy to custom isolated subnets.
          </p>
        </div>
      </motion.section>

      {/* Environment Settings */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">CLI Environment Configurations</h2>
        <div className="rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--bg-code)' }}>
                <th className="p-3 text-left font-semibold">Env Variable</th>
                <th className="p-3 text-center font-semibold">Default</th>
                <th className="p-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="p-3 font-mono text-xs" style={{ color: 'var(--accent)' }}>DEVFORGE_IAC_MAX_RETRY</td>
                <td className="p-3 text-center font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>2</td>
                <td className="p-3 text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>Max retry loops allowed for code correction if validation fails.</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="p-3 font-mono text-xs" style={{ color: 'var(--accent)' }}>DEVFORGE_USE_LANGGRAPH</td>
                <td className="p-3 text-center font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>enabled</td>
                <td className="p-3 text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>Set to false to disable agentic graph flows.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  )
}
