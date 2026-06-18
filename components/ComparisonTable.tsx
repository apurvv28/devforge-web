// components/ComparisonTable.tsx
'use client'

import { motion } from 'framer-motion'

const comparisons = [
  { feature: 'Local project detection', devforge: true, yeoman: 'Limited', workik: false, actionsImporter: false },
  { feature: 'AI Recommendations', devforge: true, yeoman: false, workik: true, actionsImporter: false },
  { feature: 'Compliance Scanning', devforge: true, yeoman: false, workik: false, actionsImporter: false },
  { feature: 'Offline Mode', devforge: true, yeoman: true, workik: false, actionsImporter: true },
  { feature: 'One command setup', devforge: true, yeoman: true, workik: true, actionsImporter: false },
  { feature: 'Deployment provider support', devforge: true, yeoman: 'Via generators', workik: 'Partial', actionsImporter: 'Limited' },
  { feature: 'Docker generation', devforge: true, yeoman: 'Via generators', workik: true, actionsImporter: false },
  { feature: 'Secret guidance', devforge: true, yeoman: false, workik: 'Partial', actionsImporter: false },
  { feature: 'Dry run mode', devforge: true, yeoman: 'Depends', workik: 'Partial', actionsImporter: false },
  { feature: 'Update command', devforge: true, yeoman: false, workik: false, actionsImporter: false },
  { feature: 'Audit mode', devforge: true, yeoman: false, workik: false, actionsImporter: false },
  { feature: 'IaC detection', devforge: true, yeoman: false, workik: false, actionsImporter: false },
  { feature: 'Automated deployment via IaC', devforge: true, yeoman: false, workik: false, actionsImporter: false },
  { feature: 'LLM-assisted IaC generation', devforge: true, yeoman: false, workik: 'Partial', actionsImporter: false },
]

export function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-x-auto rounded-xl border"
      style={{ borderColor: 'var(--border)' }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--bg-code)' }}>
            <th className="p-3 text-left font-semibold">Feature</th>
            <th className="p-3 text-center font-semibold" style={{ color: 'var(--accent)' }}>DevForge</th>
            <th className="p-3 text-center font-semibold">Yeoman</th>
            <th className="p-3 text-center font-semibold">Workik AI</th>
            <th className="p-3 text-center font-semibold">Actions Importer</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((row, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              className="border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <td className="p-3 font-medium" style={{ color: 'var(--text-primary)' }}>{row.feature}</td>
              <td className="p-3 text-center">
                {row.devforge === true ? '✅' : row.devforge === false ? '—' : row.devforge}
              </td>
              <td className="p-3 text-center" style={{ color: 'var(--text-secondary)' }}>
                {row.yeoman === true ? '✅' : row.yeoman === false ? '—' : row.yeoman}
              </td>
              <td className="p-3 text-center" style={{ color: 'var(--text-secondary)' }}>
                {row.workik === true ? '✅' : row.workik === false ? '—' : row.workik}
              </td>
              <td className="p-3 text-center" style={{ color: 'var(--text-secondary)' }}>
                {row.actionsImporter === true ? '✅' : row.actionsImporter === false ? '—' : row.actionsImporter}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}