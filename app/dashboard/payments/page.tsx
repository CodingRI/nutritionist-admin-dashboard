'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CreditCard, DollarSign, Search, Plus, MoreHorizontal, Download, CheckCircle, Clock3, AlertCircle } from 'lucide-react'

const mockPayments = [
  {
    id: 1,
    transactionId: 'TXN-2024-001',
    clientName: 'Sarah Johnson',
    amount: '$299.00',
    date: '2024-06-10',
    type: 'Premium Plan',
    status: 'Completed',
    method: 'Credit Card'
  },
  {
    id: 2,
    transactionId: 'TXN-2024-002',
    clientName: 'Michael Chen',
    amount: '$149.00',
    date: '2024-06-12',
    type: 'Standard Plan',
    status: 'Completed',
    method: 'Debit Card'
  },
  {
    id: 3,
    transactionId: 'TXN-2024-003',
    clientName: 'Emily Rodriguez',
    amount: '$99.00',
    date: '2024-06-14',
    type: 'Starter Plan',
    status: 'Pending',
    method: 'PayPal'
  },
  {
    id: 4,
    transactionId: 'TXN-2024-004',
    clientName: 'David Kim',
    amount: '$299.00',
    date: '2024-06-15',
    type: 'Premium Plan',
    status: 'Completed',
    method: 'Credit Card'
  },
  {
    id: 5,
    transactionId: 'TXN-2024-005',
    clientName: 'Jessica Lee',
    amount: '$149.00',
    date: '2024-06-16',
    type: 'Standard Plan',
    status: 'Failed',
    method: 'Credit Card'
  },
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPayments, setFilteredPayments] = useState(mockPayments)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    setFilteredPayments(
      mockPayments.filter(payment =>
        payment.clientName.toLowerCase().includes(term) ||
        payment.transactionId.toLowerCase().includes(term) ||
        payment.type.toLowerCase().includes(term)
      )
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Pending':
        return <Clock3 className="h-4 w-4 text-yellow-600" />
      case 'Failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalRevenue = mockPayments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '')), 0)

  const completedPayments = mockPayments.filter(p => p.status === 'Completed').length
  const pendingPayments = mockPayments.filter(p => p.status === 'Pending').length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">Track transactions and revenue</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-semibold">${totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-green-600 mt-2">From completed payments</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Completed</p>
              <p className="text-3xl font-semibold">{completedPayments}</p>
              <p className="text-xs text-green-600 mt-2">Successful transactions</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Pending</p>
              <p className="text-3xl font-semibold">{pendingPayments}</p>
              <p className="text-xs text-yellow-600 mt-2">Awaiting confirmation</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock3 className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6 bg-white border border-border rounded-lg px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client name, transaction ID, or type..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-0 focus:outline-none focus:ring-0 bg-transparent"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(payment => (
                <TableRow key={payment.id} className="hover:bg-secondary/5">
                  <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                  <TableCell className="font-medium">{payment.clientName}</TableCell>
                  <TableCell className="font-semibold text-primary">{payment.amount}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      {payment.method}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
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
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Refund</DropdownMenuItem>
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
