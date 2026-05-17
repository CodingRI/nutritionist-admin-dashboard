'use client'

import { motion } from 'framer-motion'

const funnelData = [
  { label: 'Signed Up', value: 1248, percentage: 100 },
  { label: 'Completed Profile', value: 945, percentage: 76 },
  { label: 'Requested Appointment', value: 562, percentage: 45 },
  { label: 'Paid', value: 340, percentage: 27 },
  { label: 'Scheduled', value: 285, percentage: 23 },
]

export function UserFunnel() {
  return (
    <div className="space-y-4">
      {funnelData.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="text-sm text-muted-foreground">{item.value}</p>
          </div>
          <div className="h-8 bg-background rounded-lg overflow-hidden border border-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.percentage}%` }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-end pr-3"
            >
              <span className="text-xs font-semibold text-primary-foreground">
                {item.percentage}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
