'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const pendingAppointments = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    email: 'sarah.m@email.com',
    phone: '+1 (555) 123-4567',
    age: 28,
    height: '5\'6"',
    reason: 'Weight management and nutrition planning',
    requestedDate: '2024-05-20',
    status: 'PENDING',
    notes: 'First-time user, very interested in holistic health approach',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 234-5678',
    age: 35,
    height: '5\'10"',
    reason: 'Sports nutrition and performance optimization',
    requestedDate: '2024-05-19',
    status: 'PENDING',
    notes: 'Active athlete, trains 5 days per week',
  },
  {
    id: 3,
    name: 'Emily Chen',
    email: 'emily.chen@email.com',
    phone: '+1 (555) 345-6789',
    age: 32,
    height: '5\'4"',
    reason: 'Prenatal nutrition guidance',
    requestedDate: '2024-05-18',
    status: 'PENDING',
    notes: '3 months pregnant, prefers vegetarian diet options',
  },
]

export default function ReviewAppointmentsPage() {
  const [appointments, setAppointments] = useState(pendingAppointments)
  const [approving, setApproving] = useState<number | null>(null)
  const [rejecting, setRejecting] = useState<number | null>(null)

  const handleApprove = (id: number) => {
    setApproving(id)
    setTimeout(() => {
      setAppointments(appointments.filter((apt) => apt.id !== id))
      setApproving(null)
    }, 500)
  }

  const handleReject = (id: number) => {
    setRejecting(id)
    setTimeout(() => {
      setAppointments(appointments.filter((apt) => apt.id !== id))
      setRejecting(null)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="page-title">Review Pending Appointments</h1>
        <p className="page-subtitle">
          Review and approve {appointments.length} pending appointment requests
        </p>
      </motion.div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="stat-card text-center py-12"
        >
          <p className="text-muted-foreground">All pending appointments have been reviewed!</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
                  {/* Left: Basic Info */}
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-foreground mb-1">{appointment.name}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.email}</p>
                    <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs">
                        Age: {appointment.age}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Height: {appointment.height}
                      </Badge>
                    </div>
                  </div>

                  {/* Middle: Request Details */}
                  <div className="lg:col-span-2">
                    <p className="text-sm font-medium text-foreground mb-2">Reason</p>
                    <p className="text-sm text-muted-foreground mb-3">{appointment.reason}</p>
                    <p className="text-xs text-muted-foreground italic">{appointment.notes}</p>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex gap-2 lg:flex-col">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={() => handleApprove(appointment.id)}
                        disabled={approving === appointment.id || rejecting === appointment.id}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                        size="sm"
                      >
                        {approving === appointment.id ? (
                          <>
                            <Loader className="h-4 w-4 animate-spin" />
                            Approving...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={() => handleReject(appointment.id)}
                        disabled={approving === appointment.id || rejecting === appointment.id}
                        variant="outline"
                        className="w-full text-accent hover:text-accent border-accent/30 flex items-center gap-2"
                        size="sm"
                      >
                        {rejecting === appointment.id ? (
                          <>
                            <Loader className="h-4 w-4 animate-spin" />
                            Rejecting...
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4" />
                            Reject
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
