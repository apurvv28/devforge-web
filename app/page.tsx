'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'
import {
  Brain, ShieldCheck, GitGraph, Building2, Zap, Undo2,
  ArrowRight, BookOpen, ExternalLink, Package, SunMedium, MoonStar,
  Terminal, ChevronRight, BotMessageSquare,
} from 'lucide-react'

const features = [
  { icon: Brain, title: 'Multi-LLM Support', description: 'Amazon Nova Pro, Gemini, OpenAI, Anthropic & Bedrock.' },
  { icon: ShieldCheck, title: 'Security & Compliance', description: 'NIST SP 800-53 and ISO 27001 scanning with auto-fix.' },
  { icon: GitGraph, title: 'LangGraph Orchestration', description: 'Stateful agent graphs for init, diagnosis, and remediation.' },
  { icon: Building2, title: 'IaC Generation', description: 'Terraform, CDK, Pulumi, Ansible with verification loops.' },
  { icon: Zap, title: 'One-Command Setup', description: 'From zero to a production-ready pipeline in seconds.' },
  { icon: Undo2, title: 'Rollback Safety', description: 'Transactional writes with full rollback on any failure.' },
]

const stats = [
  { label: 'Pipeline Targets', value: '10+' },
  { label: 'LLM Providers', value: '5' },
  { label: 'Compliance Standards', value: '2' },
  { label: 'IaC Frameworks', value: '4+' },
]

function LandingNavbar() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-3.5 flex items-center justify-between"
      style={{
        background: 'var(--navbar-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight hover:opacity-80 transition-opacity select-none">
        <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={theme === 'dark' ? '/logo_icon_light.png' : '/logo_icon_dark.png'}
            alt="DevForge Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span style={{ color: 'var(--text-primary)' }}>DevForge</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <a href="#features" className="hover:opacity-80 transition-opacity">Features</a>
        <a href="#install" className="hover:opacity-80 transition-opacity">Install</a>
        <a
          href="https://github.com/apurvv28/DevForge"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          GitHub
        </a>
      </nav>

      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-xl transition-all hover:scale-105"
          style={{ color: 'var(--accent)', background: 'var(--accent-light)' }}
          title="AI Assistant"
        >
          <BotMessageSquare size={18} />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl transition-all hover:scale-105"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border)' }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            whileTap={{ scale: 0.85 }}
            transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
          >
            {theme === 'dark' ? <SunMedium size={17} /> : <MoonStar size={17} />}
          </motion.div>
        </button>
        <Link
          href="/docs"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          style={{ background: 'var(--accent)', color: '#0a0f1a', boxShadow: '0 0 16px var(--accent-glow)' }}
        >
          <BookOpen size={14} />
          Docs
        </Link>
      </div>
    </header>
  )
}

export default function LandingPage() {
  const { theme } = useTheme()
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <LandingNavbar />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, var(--accent-glow), transparent 70%)', filter: 'blur(40px)', opacity: 0.6 }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08), transparent)', filter: 'blur(30px)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08), transparent)', filter: 'blur(30px)' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(12px)',
              color: 'var(--accent)',
              border: '1px solid var(--border-strong)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px #4ade80' }} />
            Agentic AI · Self-Healing Pipelines
          </motion.div>

          <h1 className="mb-6 flex justify-center">
            <img
              src={theme === 'dark' ? '/logo_top_right.png' : '/logo_bottom_left.png'}
              alt="DevForge Logo"
              className="h-20 md:h-28 object-contain select-none transition-all duration-300"
            />
          </h1>

          <p className="text-xl md:text-2xl mb-4 font-medium" style={{ color: 'var(--text-primary)' }}>
            Automated Secure DevOps Pipeline Generator
          </p>

          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            One command to detect your stack, generate production-ready CI/CD pipelines,
            scan for compliance issues, and deploy infrastructure — powered by your choice of LLM.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/docs"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105"
              style={{
                background: 'var(--accent)',
                color: '#0a0f1a',
                boxShadow: '0 0 32px var(--accent-glow)',
              }}
            >
              <BookOpen size={20} />
              See Documentation
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/docs/getting-started/installation"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105"
              style={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              Get Started
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* Install pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            id="install"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-mono text-sm"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text-secondary)',
            }}
          >
            <Terminal size={16} style={{ color: 'var(--accent)' }} />
            <span style={{ color: 'var(--text-tertiary)' }}>$</span>
            <span style={{ color: 'var(--text-primary)' }}>npm install -g @apurvv28/devforge</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section
        className="py-12 border-y"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-glass)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-1" style={{ color: 'var(--accent)' }}>{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              From pipeline generation to compliance — DevForge handles the full DevOps lifecycle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-2xl transition-all"
                style={{
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--accent-light)', border: '1px solid var(--border-strong)' }}
                >
                  <f.icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 text-center"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 0 60px var(--accent-glow)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, var(--accent-glow), transparent 65%)' }}
            />
            <h2 className="text-4xl font-bold mb-4 relative z-10">Ready to automate your DevOps?</h2>
            <p className="text-lg mb-8 relative z-10" style={{ color: 'var(--text-secondary)' }}>
              Explore the full documentation to set up DevForge in minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Link
                href="/docs"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
                style={{ background: 'var(--accent)', color: '#0a0f1a', boxShadow: '0 0 24px var(--accent-glow)' }}
              >
                <BookOpen size={18} />
                See Documentation
              </Link>
              <a
                href="https://github.com/apurvv28/DevForge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
                style={{
                  background: 'var(--bg-elevated)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                <ExternalLink size={18} />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-6" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3 select-none">
            <div className="w-7 h-10 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={theme === 'dark' ? '/logo_top_left.png' : '/logo_top_left.png'}
                alt="DevForge Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>DevForge</span>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                Agentic AI DevOps Pipeline Generator · MIT License
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Link href="/docs" className="hover:underline flex items-center gap-1.5">
              <BookOpen size={13} />Docs
            </Link>
            <a
              href="https://github.com/apurvv28/DevForge"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1.5"
            >
              <ExternalLink size={13} />GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@apurvv28/devforge"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1.5"
            >
              <Package size={13} />npm
            </a>
            <Link href="/docs/security-policy" className="hover:underline">Security</Link>
            <Link href="/docs/contributing" className="hover:underline">Contributing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
