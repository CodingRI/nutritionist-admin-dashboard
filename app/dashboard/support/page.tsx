'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Clock, MessageSquare, Phone } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const tickets = [
  {
    id: 1,
    subject: 'Payment failed for appointment',
    category: 'Payment Issue',
    priority: 'HIGH',
    status: 'OPEN',
    user: 'Sarah Mitchell',
    created: '2 hours ago',
  },
  {
    id: 2,
    subject: 'Cannot reschedule appointment',
    category: 'Appointment Issue',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    user: 'John Doe',
    created: '4 hours ago',
  },
  {
    id: 3,
    subject: 'Profile verification issue',
    category: 'Account Issue',
    priority: 'LOW',
    status: 'RESOLVED',
    user: 'Emily Chen',
    created: '1 day ago',
  },
]

const priorityColors = {
  LOW: 'bg-primary/10 text-primary',
  MEDIUM: 'bg-accent/10 text-accent',
  HIGH: 'bg-red-500/10 text-red-600',
}

const statusIcons = {
  OPEN: AlertCircle,
  IN_PROGRESS: Clock,
  RESOLVED: CheckCircle,
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="page-title">Support Tickets</h1>
        <p className="page-subtitle">Manage user support requests and issues</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">8</p>
          <p className="text-xs text-muted-foreground mt-1">Open Tickets</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-accent">2</p>
          <p className="text-xs text-muted-foreground mt-1">Urgent</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">24</p>
          <p className="text-xs text-muted-foreground mt-1">Resolved</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">2.4h</p>
          <p className="text-xs text-muted-foreground mt-1">Avg Response</p>
        </Card>
      </motion.div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket, index) => {
          const StatusIcon = statusIcons[ticket.status as keyof typeof statusIcons]
          return (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <StatusIcon className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold text-foreground">{ticket.subject}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {ticket.category}
                      </Badge>
                      <Badge className={`text-xs ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{ticket.user}</span> • {ticket.created}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-4">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
