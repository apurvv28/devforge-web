// components/FeatureGrid.tsx
'use client'

import { motion } from 'framer-motion'
import { Brain, Lightbulb, ShieldCheck, GitGraph, Building2, WifiOff, Undo2, Database } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Brain,
    title: 'Multi-LLM Provider Support',
    description: 'Amazon Nova Pro, Gemini, OpenAI, Anthropic, and Bedrock with full offline mode support.',
  },
  {
    icon: Lightbulb,
    title: 'Recommendation Agent',
    description: 'Auto-invoked on init, flags pipeline issues with actionable recommendations.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance Agent',
    description: 'NIST SP 800-53 and ISO 27001 scanning with auto-fix capabilities.',
  },
  {
    icon: GitGraph,
    title: 'LangGraph Orchestration',
    description: 'Stateful agent graphs for init, diagnosis, and security remediation loops.',
  },
  {
    icon: Building2,
    title: 'IaC Detection & Generation',
    description: 'Terraform, CDK, boto3, Pulumi, Ansible with verification loops.',
  },
  {
    icon: WifiOff,
    title: 'Offline Mode',
    description: 'Fully functional without AI — ideal for air-gapped environments.',
  },
  {
    icon: Undo2,
    title: 'Rollback Safety',
    description: 'Transactional file writes with rollback support for all generation operations.',
  },
  {
    icon: Database,
    title: 'Cross-Session Memory',
    description: 'Backed by Amazon Elastic for persistent recommendation tracking.',
  },
]

export function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="p-6 rounded-xl border transition-all"
          style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
        >
          <div className="mb-3" style={{ color: 'var(--accent)' }}><feature.icon size={28} /></div>
          <h3 className="font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}