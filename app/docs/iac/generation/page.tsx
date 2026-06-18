'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Sparkles, ChevronRight, CheckCircle2, RotateCw, AlertTriangle
} from 'lucide-react'

export default function IaCGenerationPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Infrastructure as Code</span>
          <ChevronRight size={14} />
          <span>IaC Generation Loop</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Sparkles size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">IaC Generation Loop</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          When no IaC configuration is detected, DevForge runs a self-correcting AI generation loop to create infrastructure manifests from verified blueprints.
        </p>
      </motion.div>

      {/* Generation Prompt */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Interactive Setup Prompt</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          If a target deployment configuration is found that requires infrastructure provisioning (e.g. AWS EC2, ECS, or EKS), DevForge prompts you:
        </p>
        <div className="p-4 rounded-xl border font-mono text-xs" style={{ background: 'var(--bg-code)', borderColor: 'var(--border)' }}>
          <p style={{ color: 'var(--text-primary)' }}>Which IaC tool do you want DevForge to generate?</p>
          <p className="mt-1" style={{ color: 'var(--accent)' }}>  ● Terraform (recommended for AWS)</p>
          <p style={{ color: 'var(--text-secondary)' }}>  ○ AWS CDK (TypeScript)</p>
          <p style={{ color: 'var(--text-secondary)' }}>  ○ boto3 (Python)</p>
          <p style={{ color: 'var(--text-secondary)' }}>  ○ Skip IaC generation</p>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Note: This prompt is automatically bypassed for managed serverless hosting (e.g. Vercel, Railway, Render, Firebase) as they do not require custom cloud resources.
        </p>
      </motion.section>

      {/* Generation Loop */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Self-Remediation Generation Loop</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          DevForge executes an automated verification and patch loop:
        </p>
        <div className="p-5 rounded-xl border flex flex-col md:flex-row gap-6 items-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <div className="flex-1 space-y-3">
            <div className="flex gap-2.5">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <strong>Generate (iac_generate):</strong> The agent builds configuration files using its core template library combined with model parameters.
              </p>
            </div>
            <div className="flex gap-2.5">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <strong>Verify (iac_verify):</strong> Local tool compilers (e.g. <code>terraform validate</code> or <code>cdk synth</code>) execute natively on the generated code.
              </p>
            </div>
            <div className="flex gap-2.5">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                <strong>Correct Loop:</strong> If errors are found, they are piped back to the generation agent with context logs. The loop retries (up to a max of 2 times) until validation passes.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center justify-center p-4 rounded-xl border" style={{ background: 'var(--bg-code)', borderColor: 'var(--border)' }}>
            <RotateCw size={48} className="animate-spin text-sky-500 duration-1000" style={{ color: 'var(--accent)' }} />
          </div>
        </div>
      </motion.section>

      {/* Progress logs */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Console Output Progress</h2>
        <div className="p-4 rounded-xl border font-mono text-xs" style={{ background: 'var(--bg-code)', borderColor: 'var(--border)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>⟳ Generating Terraform configuration (attempt 1/2)...</p>
          <p className="text-red-400 mt-0.5">✗ Verification failed: invalid resource reference in main.tf</p>
          <p style={{ color: 'var(--text-secondary)' }}>⟳ Regenerating with error context (attempt 2/2)...</p>
          <p className="text-green-400">✓ Terraform configuration verified successfully</p>
          <p className="text-green-400">✓ Generated 4 IaC files:</p>
          <p style={{ color: 'var(--text-tertiary)' }}>  - infra/provider.tf</p>
          <p style={{ color: 'var(--text-tertiary)' }}>  - infra/variables.tf</p>
          <p style={{ color: 'var(--text-tertiary)' }}>  - infra/main.tf</p>
          <p style={{ color: 'var(--text-tertiary)' }}>  - infra/outputs.tf</p>
        </div>
      </motion.section>
    </div>
  )
}
