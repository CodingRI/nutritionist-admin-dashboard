'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, MessageSquare, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const notifications = [
  {
    id: 1,
    type: 'APPOINTMENT',
    title: 'New appointment request',
    message: 'Sarah Mitchell requested an appointment',
    time: '2 minutes ago',
    read: false,
    icon: AlertCircle,
  },
  {
    id: 2,
    type: 'PAYMENT',
    title: 'Payment successful',
    message: 'Payment received from John Doe - ₹5,000',
    time: '1 hour ago',
    read: false,
    icon: CheckCircle,
  },
  {
    id: 3,
    type: 'SUPPORT',
    title: 'Support ticket opened',
    message: 'New support ticket from Emily Chen',
    time: '3 hours ago',
    read: true,
    icon: MessageSquare,
  },
  {
    id: 4,
    type: 'USER',
    title: 'New user signed up',
    message: 'Michael Brown completed signup',
    time: '1 day ago',
    read: true,
    icon: AlertCircle,
  },
]

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Stay updated with system notifications</p>
        </div>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </motion.div>

      {/* Grouped Notifications */}
      <div className="space-y-6">
        {/* Today */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Today</h2>
          <div className="space-y-2">
            {notifications.slice(0, 2).map((notif) => {
              const Icon = notif.icon
              return (
                <Card
                  key={notif.id}
                  className={`p-4 hover:shadow-md transition-all cursor-pointer ${
                    !notif.read ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${!notif.read ? 'bg-primary/10' : 'bg-muted/10'}`}>
                        <Icon className={`h-4 w-4 ${!notif.read ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{notif.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notif.time}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </motion.div>

        {/* Earlier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Earlier</h2>
          <div className="space-y-2">
            {notifications.slice(2).map((notif) => {
              const Icon = notif.icon
              return (
                <Card key={notif.id} className="p-4 hover:shadow-md transition-all cursor-pointer opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-muted/10">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{notif.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
