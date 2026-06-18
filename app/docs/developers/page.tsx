'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronRight, Users, GraduationCap, BookOpen, Camera, Globe
} from 'lucide-react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

// Custom SVG implementations for brand icons since they aren't in this version of lucide-react
const LinkedinIcon = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GithubIcon = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const InstagramIcon = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

interface Developer {
  name: string
  initials: string
  role: string
  institution: string
  department: string
  // description: string
  image?: string
  socials: {
    github: string
    linkedin: string
    instagram: string
    portfolio?: string
  }
}

const developers: Developer[] = [
  {
    name: 'Apurv Saktepar',
    initials: 'AS',
    role: 'Student Developer',
    institution: 'VIT Pune',
    department: 'Computer Science and Engineering (Artificial Intelligence)',
    //description: '[Brief description about Apurv and their contributions to DevForge. You can edit this text to describe their role, experience, and background.]',
    image: '/developers/dev-apurv.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/apurv-saktepar-054a17281/',
      github: 'https://github.com/apurvv28',
      instagram: 'https://www.instagram.com/apurvvvv.28/',
      portfolio: 'https://www.apurvv.vercel.app'
    }
  },
  {
    name: 'Omkar Patil',
    initials: 'OP',
    role: 'Student Developer',
    institution: 'VIT Pune',
    department: 'Artificial Intelligence and Data Science',
    //description: '[Brief description about Omkar and their contributions to DevForge. You can edit this text to describe their role, experience, and background.]',
    image: '/developers/dev-omkar.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/omkar-patil-a73907326',
      github: 'https://www.github.com/omkarP-bit',
      instagram: 'https://www.instagram.com/omkarpatilhere?igsh=aG40YmJiNGd2NjV5'
    }
  },
  {
    name: 'Kushal Kurkure',
    initials: 'KK',
    role: 'Student Developer',
    institution: 'VIT Pune',
    department: 'Artificial Intelligence and Data Science',
    //description: '[Brief description about Kushal and their contributions to DevForge. You can edit this text to describe their role, experience, and background.]',
    image: '/developers/dev-kushal.jpeg', // Add this when photo is available
    socials: {
      linkedin: 'https://www.linkedin.com/in/kushalkurkure/',
      github: 'https://github.com/theqxmlkushal',
      instagram: 'https://www.instagram.com/kushhaaalllll/'
    }
  }
]

export default function DevelopersPage() {
  return (
    <div className="max-w-4xl py-4 space-y-12">
      {/* Breadcrumb & Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Developers</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Users size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Our Developers</h1>
        </div>
        <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Meet the core creators of DevForge. We are student developers dedicated to building
          modern, open-source automation utilities that simplify DevOps workflows.
        </p>
      </motion.div>

      {/* Developer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {developers.map((dev, idx) => (
          <motion.div
            key={dev.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="flex flex-col rounded-2xl border transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
            style={{
              background: 'var(--bg-glass)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Top decorative accent glow line */}
            <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)'
              }}
            />

            {/* Full Width Photo Area with Faded Black Overlay from Bottom */}
            <div className="aspect-[3/4] w-full relative overflow-hidden bg-gradient-to-tr from-slate-950 to-slate-900 flex-shrink-0">
              {dev.image ? (
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                /* Fallback sleek code-themed gradient background for missing image */
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-900 to-sky-950 relative">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                  <span className="text-4xl font-extrabold tracking-wider select-none bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
                    {dev.initials}
                  </span>
                </div>
              )}

              {/* Faded Black Overlay from Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent flex flex-col justify-end p-5 z-10">
                <h3 className="text-xl font-bold tracking-tight text-white mb-0.5 group-hover:text-[var(--accent)] transition-colors duration-250">
                  {dev.name}
                </h3>
                <span className="text-xs font-semibold text-sky-400 tracking-wide">
                  {dev.role}
                </span>
              </div>

              {/* Photo space micro-overlay on hover */}
              {/* <div className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 p-2 rounded-xl text-white transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer flex items-center gap-1.5 border border-white/10 z-20">
                <Camera size={14} className="text-[var(--accent)]" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Photo Space</span>
              </div> */}
            </div>

            {/* Card Body - Details below the photo */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              {/* Institution and Department */}
              <div className="space-y-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={16} className="shrink-0 text-[var(--accent)]" />
                  <div className="truncate">
                    <span className="font-semibold block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-0.5">Institution</span>
                    <span className="font-medium text-xs text-[var(--text-primary)]">{dev.institution}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <BookOpen size={16} className="shrink-0 text-[var(--accent)]" />
                  <div className="truncate">
                    <span className="font-semibold block text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-0.5">Department</span>
                    <span className="font-medium text-xs text-[var(--text-primary)]">{dev.department}</span>
                  </div>
                </div>
              </div>

              {/* Description
              <p className="text-xs leading-relaxed italic mt-4 mb-5 text-[var(--text-tertiary)] flex-1">
                {dev.description}
              </p> */}

              {/* Social Handles */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-dashed"
                style={{ borderColor: 'var(--border)' }}
              >
                {dev.socials.linkedin && (
                  <a
                    href={dev.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-[var(--text-secondary)] hover:text-white hover:scale-110"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)'
                    }}
                    title={`Connect with ${dev.name} on LinkedIn`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0a66c2'
                      e.currentTarget.style.borderColor = '#0a66c2'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    <LinkedinIcon size={16} />
                  </a>
                )}

                {dev.socials.github && (
                  <a
                    href={dev.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-[var(--text-secondary)] hover:text-white hover:scale-110"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)'
                    }}
                    title={`View ${dev.name} on GitHub`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#181717'
                      e.currentTarget.style.borderColor = '#181717'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    <GithubIcon size={16} />
                  </a>
                )}

                {dev.socials.instagram && (
                  <a
                    href={dev.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-[var(--text-secondary)] hover:text-white hover:scale-110"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)'
                    }}
                    title={`Follow ${dev.name} on Instagram`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e1306c'
                      e.currentTarget.style.borderColor = '#e1306c'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}

                {dev.socials.portfolio && (
                  <a
                    href={dev.socials.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-[var(--text-secondary)] hover:text-white hover:scale-110"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)'
                    }}
                    title={`Follow ${dev.name} on Instagram`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(128, 48, 225, 1)'
                      e.currentTarget.style.borderColor = 'rgba(128, 48, 225, 1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    <Globe size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
