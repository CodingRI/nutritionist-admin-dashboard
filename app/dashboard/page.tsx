'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Users,
  UserPlus,
  CreditCard,
  Calendar,
  TrendingUp,
  AlertCircle,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/stat-card'
import { RecentAppointments } from '@/components/recent-appointments'
import { RevenueChart } from '@/components/revenue-chart'
import { UserFunnel } from '@/components/user-funnel'
import { ActivityFeed } from '@/components/activity-feed'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DashboardPage() {
  const router = useRouter()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="page-title">Good morning, Dr. Karmakar</h1>
        <p className="page-subtitle">Here&apos;s what needs your attention today.</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">{today}</p>
          <Button 
            onClick={() => router.push('/dashboard/appointments/review')}
            className="bg-primary hover:bg-primary/90"
          >
            Review Appointments
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={Users}
          title="Total Users"
          value="1,248"
          change={12}
          description="Total registered users"
        />
        <StatCard
          icon={UserPlus}
          title="New Signups"
          value="48"
          change={8}
          description="This week"
        />
        <StatCard
          icon={CreditCard}
          title="Paid Users"
          value="340"
          change={-2}
          description="Active subscriptions"
        />
        <StatCard
          icon={Calendar}
          title="Pending Appointments"
          value="12"
          change={5}
          description="Awaiting approval"
        />
      </motion.div>

      {/* Secondary KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={AlertCircle}
          title="Payment Pending"
          value="8"
          change={0}
          description="Awaiting payment"
        />
        <StatCard
          icon={TrendingUp}
          title="Total Revenue"
          value="₹1.2L"
          change={15}
          description="This month"
        />
        <StatCard
          icon={BarChart3}
          title="Support Tickets"
          value="5"
          change={-3}
          description="Open tickets"
        />
        <StatCard
          icon={Calendar}
          title="Scheduled Calls"
          value="24"
          change={4}
          description="This week"
        />
      </motion.div>

      {/* Priority Panel and Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="stat-card lg:col-span-1"
        >
          <h3 className="font-semibold text-foreground mb-4">Needs Attention</h3>
          <div className="space-y-3">
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm font-medium text-accent">2 Pending Requests</p>
              <p className="text-xs text-muted-foreground">Appointment approvals</p>
            </div>
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm font-medium text-accent">1 Failed Payment</p>
              <p className="text-xs text-muted-foreground">Payment verification needed</p>
            </div>
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium text-primary">3 Unread Tickets</p>
              <p className="text-xs text-muted-foreground">Support requests</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="stat-card lg:col-span-2"
        >
          <RecentAppointments />
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="stat-card"
        >
          <h3 className="font-semibold text-foreground mb-4">Revenue Overview</h3>
          <RevenueChart />
        </motion.div>

        {/* User Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="stat-card"
        >
          <h3 className="font-semibold text-foreground mb-4">User Conversion Funnel</h3>
          <UserFunnel />
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="stat-card"
      >
        <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
        <ActivityFeed />
      </motion.div>
    </motion.div>
  )
}
