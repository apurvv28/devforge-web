// components/VersionBadge.tsx
'use client'

import { useState, useEffect } from 'react'
import { Calendar, Download, FileText } from 'lucide-react'

interface PackageData {
  version: string
  date: string
  downloads: number
  license: string
}

export function VersionBadge() {
  const [data, setData] = useState<PackageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, downloadsRes] = await Promise.all([
          fetch('https://registry.npmjs.org/@apurvv28/devforge/latest'),
          fetch('https://api.npmjs.org/downloads/point/last-week/@apurvv28/devforge'),
        ])

        const pkg = await pkgRes.json()
        const downloads = await downloadsRes.json()

        setData({
          version: pkg.version,
          date: new Date(pkg.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          downloads: downloads.downloads || 0,
          license: pkg.license || 'MIT',
        })
      } catch (error) {
        console.error('Failed to fetch package data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className="h-6 w-20 rounded animate-pulse" style={{ background: 'var(--bg-code)' }} />
        <div className="h-6 w-24 rounded animate-pulse" style={{ background: 'var(--bg-code)' }} />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="flex items-center gap-4 flex-wrap justify-center text-sm">
      <span className="px-3 py-1 rounded-full font-mono" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
        v{data.version}
      </span>
      <span style={{ color: 'var(--text-secondary)' }}>
        <Calendar size={14} className="inline mr-1" />{data.date}
      </span>
      <span style={{ color: 'var(--text-secondary)' }}>
        <Download size={14} className="inline mr-1" />{data.downloads.toLocaleString()} weekly downloads
      </span>
      <span style={{ color: 'var(--text-secondary)' }}>
        <FileText size={14} className="inline mr-1" />{data.license}
      </span>
    </div>
  )
}