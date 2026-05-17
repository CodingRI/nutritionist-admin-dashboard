'use client'

import { motion } from 'framer-motion'
import {
  UserPlus,
  CheckCircle,
  CreditCard,
  Calendar,
  MessageSquare,
} from 'lucide-react'

const activities = [
  {
    id: 1,
    icon: UserPlus,
    action: 'New user signed up',
    user: 'Sarah Johnson',
    time: '2 minutes ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    icon: CreditCard,
    action: 'Payment successful',
    user: 'John Doe',
    time: '15 minutes ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 3,
    icon: Calendar,
    action: 'Appointment requested',
    user: 'Emily Chen',
    time: '1 hour ago',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    icon: CheckCircle,
    action: 'Profile completed',
    user: 'Michael Brown',
    time: '3 hours ago',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 5,
    icon: MessageSquare,
    action: 'Support ticket opened',
    user: 'Lisa Wong',
    time: '5 hours ago',
    color: 'bg-orange-100 text-orange-600',
  },
]

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity, idx) => {
        const Icon = activity.icon
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-start gap-4 p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors"
          >
            <div className={`p-2 rounded-lg flex-shrink-0 ${activity.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.user}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
