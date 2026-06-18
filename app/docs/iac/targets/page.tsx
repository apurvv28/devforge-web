'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Grid, ChevronRight, CheckCircle2, AlertCircle, HelpCircle
} from 'lucide-react'

const targets = [
  { name: 'AWS ECS (Fargate)', tf: '✓', cdk: '✓', boto3: '✓', needed: 'Yes' },
  { name: 'AWS EKS', tf: '✓', cdk: '—', boto3: '—', needed: 'Yes' },
  { name: 'AWS EC2', tf: '✓', cdk: '—', boto3: '✓', needed: 'Yes' },
  { name: 'Docker (generic)', tf: '✓', cdk: '—', boto3: '—', needed: 'Yes' },
  { name: 'Vercel', tf: '—', cdk: '—', boto3: '—', needed: 'No' },
  { name: 'Railway', tf: '—', cdk: '—', boto3: '—', needed: 'No' },
  { name: 'Render', tf: '—', cdk: '—', boto3: '—', needed: 'No' },
  { name: 'Firebase', tf: '—', cdk: '—', boto3: '—', needed: 'No' }
]

export default function IaCTargetsPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Infrastructure as Code</span>
          <ChevronRight size={14} />
          <span>Deployment Targets</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Grid size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Deployment Targets</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge maps specific deployment targets to compatible Infrastructure-as-Code platforms to automate setup pipelines.
        </p>
      </motion.div>

      {/* Target Table */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Compatibility Matrix</h2>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--bg-code)' }}>
                <th className="p-3 text-left font-semibold">Deployment Target</th>
                <th className="p-3 text-center font-semibold">Terraform</th>
                <th className="p-3 text-center font-semibold">CDK</th>
                <th className="p-3 text-center font-semibold">boto3</th>
                <th className="p-3 text-center font-semibold">IaC Required?</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((t) => (
                <tr key={t.name} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3 font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</td>
                  <td className="p-3 text-center font-semibold" style={{ color: t.tf === '✓' ? 'var(--accent)' : 'var(--text-tertiary)' }}>{t.tf}</td>
                  <td className="p-3 text-center font-semibold" style={{ color: t.cdk === '✓' ? 'var(--accent)' : 'var(--text-tertiary)' }}>{t.cdk}</td>
                  <td className="p-3 text-center font-semibold" style={{ color: t.boto3 === '✓' ? 'var(--accent)' : 'var(--text-tertiary)' }}>{t.boto3}</td>
                  <td className="p-3 text-center" style={{ color: 'var(--text-secondary)' }}>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${t.needed === 'Yes' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}`}>
                      {t.needed}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Matrix notes */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Targeting Details</h2>
        <div className="p-5 rounded-xl border flex items-start gap-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <HelpCircle size={24} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
          <div className="space-y-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p><strong>AWS Managed Services:</strong> Recommended structures target ECS and Fargate for simple microservice builds. Complex distributed layouts are directed to Terraform-backed EKS stacks.</p>
            <p><strong>Platform-as-a-Service (PaaS):</strong> Host destinations such as Vercel or Railway bypass local IaC checks as configuration options are set inside their deployment console or dashboard settings.</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
