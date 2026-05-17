'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const appointments = [
  {
    id: 1,
    name: 'Sarah Johnson',
    date: 'Today',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 2,
    name: 'John Doe',
    date: 'Jan 15',
    status: 'Approved',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: 3,
    name: 'Emily Chen',
    date: 'Jan 14',
    status: 'Payment Pending',
    statusColor: 'bg-orange-100 text-orange-800',
  },
  {
    id: 4,
    name: 'Michael Brown',
    date: 'Jan 13',
    status: 'Scheduled',
    statusColor: 'bg-blue-100 text-blue-800',
  },
]

export function RecentAppointments() {
  return (
    <div>
      <h3 className="font-semibold text-foreground mb-4">Recent Appointment Requests</h3>
      <div className="space-y-3">
        {appointments.map((appt, idx) => (
          <motion.div
            key={appt.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{appt.name}</p>
              <p className="text-xs text-muted-foreground">{appt.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={appt.statusColor}>{appt.status}</Badge>
              <Button variant="ghost" size="sm" className="text-xs">
                View
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
