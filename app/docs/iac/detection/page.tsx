'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search, ChevronRight, CheckCircle2, FileText, Info
} from 'lucide-react'

const signals = [
  { files: '*.tf or .terraform/ directory', tool: 'Terraform' },
  { files: 'cdk.json or cdk.out/ directory', tool: 'AWS CDK (TypeScript)' },
  { files: 'deploy.py importing boto3', tool: 'boto3 (Python)' },
  { files: 'Pulumi.yaml', tool: 'Pulumi' },
  { files: 'playbook.yml or ansible.cfg', tool: 'Ansible' }
]

export default function IaCDetectionPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Infrastructure as Code</span>
          <ChevronRight size={14} />
          <span>IaC Detection</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Search size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">IaC Detection</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Before generating any configurations, DevForge automatically scans the project workspace to detect existing Infrastructure-as-Code setups.
        </p>
      </motion.div>

      {/* Detection Signals */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Detection Signals</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          The detection scanner searches for specific signatures at your project root:
        </p>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--bg-code)' }}>
                <th className="p-3 text-left font-semibold">Signal Signature</th>
                <th className="p-3 text-left font-semibold">Detected Tool</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((sig) => (
                <tr key={sig.tool} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{sig.files}</td>
                  <td className="p-3 font-semibold" style={{ color: 'var(--accent)' }}>{sig.tool}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* IaCDetectionResult Interface */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">IaCDetectionResult Schema</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          The scanner populates a structured result payload used in subsequent stages:
        </p>
        <div className="p-4 rounded-xl border font-mono text-xs overflow-x-auto"
          style={{ background: 'var(--bg-code)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
          <pre>
{`interface IaCDetectionResult {
  detected: boolean;
  tool: 'terraform' | 'cdk' | 'boto3' | 'pulumi' | 'ansible' | null;
  entryPoints: string[];   // e.g. ["infra/main.tf"]
  isDeployReady: boolean;  // true when local locks / output bundles are present
  configDir: string | null;
}`}
          </pre>
        </div>
      </motion.section>

      {/* isDeployReady Explanation */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Deploy-Ready State</h2>
        <div className="p-5 rounded-xl border flex items-start gap-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <Info size={24} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
          <div>
            <h3 className="font-bold text-sm mb-1">isDeployReady Criterion</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The <code>isDeployReady</code> property is set to <code>true</code> only if local environment artifacts are detected (e.g. <code>.terraform.lock.hcl</code> exists for Terraform, or a <code>cdk.out/</code> directory exists for CDK). If <code>false</code>, DevForge offers to generate or initialize these settings for you during run setup.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
