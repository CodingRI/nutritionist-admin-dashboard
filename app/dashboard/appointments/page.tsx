'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Calendar, Clock, User, Phone, Plus, MoreHorizontal, CheckCircle, Clock3, XCircle } from 'lucide-react'
import Link from 'next/link'

const mockAppointments = [
  {
    id: 1,
    clientName: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    date: '2024-06-15',
    time: '10:00 AM',
    type: 'Initial Consultation',
    status: 'Confirmed',
    duration: '60 mins'
  },
  {
    id: 2,
    clientName: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    date: '2024-06-15',
    time: '11:30 AM',
    type: 'Follow-up',
    status: 'Confirmed',
    duration: '45 mins'
  },
  {
    id: 3,
    clientName: 'Emily Rodriguez',
    phone: '+1 (555) 345-6789',
    date: '2024-06-16',
    time: '02:00 PM',
    type: 'Initial Consultation',
    status: 'Pending',
    duration: '60 mins'
  },
  {
    id: 4,
    clientName: 'David Kim',
    phone: '+1 (555) 456-7890',
    date: '2024-06-17',
    time: '09:00 AM',
    type: 'Follow-up',
    status: 'Completed',
    duration: '45 mins'
  },
  {
    id: 5,
    clientName: 'Jessica Lee',
    phone: '+1 (555) 567-8901',
    date: '2024-06-17',
    time: '03:30 PM',
    type: 'Initial Consultation',
    status: 'Cancelled',
    duration: '60 mins'
  },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    setFilteredAppointments(
      mockAppointments.filter(apt =>
        apt.clientName.toLowerCase().includes(term) ||
        apt.type.toLowerCase().includes(term)
      )
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Pending':
        return <Clock3 className="h-4 w-4 text-yellow-600" />
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Completed':
        return 'bg-blue-100 text-blue-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">Manage client consultations and bookings</p>
        </div>
        <Link href="/dashboard/appointments/review" className='gap-2'>
        <Button className="gap-2">
          Review and Schedule
        </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6 bg-white border border-border rounded-lg px-4 py-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client name or type..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-0 focus:outline-none focus:ring-0 bg-transparent"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map(apt => (
                <TableRow key={apt.id} className="hover:bg-secondary/5">
                  <TableCell className="font-medium">{apt.clientName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {apt.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(apt.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {apt.time}
                    </div>
                  </TableCell>
                  <TableCell>{apt.type}</TableCell>
                  <TableCell>{apt.duration}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(apt.status)}
                      <Badge className={getStatusColor(apt.status)}>
                        {apt.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
