'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/stat-card'
import { Users, TrendingUp, Percent, DollarSign } from 'lucide-react'

const chartData = [
  { month: 'Jan', users: 400, revenue: 2400 },
  { month: 'Feb', users: 520, revenue: 2800 },
  { month: 'Mar', users: 680, revenue: 3200 },
  { month: 'Apr', users: 750, revenue: 3600 },
  { month: 'May', users: 890, revenue: 4100 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="page-subtitle">Track user growth, revenue, and conversion metrics</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <StatCard icon={Users} title="Total Users" value="1,248" change={12} description="All registered users" />
        <StatCard icon={Users} title="New Users" value="240" change={18} description="This month" />
        <StatCard icon={Percent} title="Conversion Rate" value="28.4%" change={4} description="Free to paid" />
        <StatCard icon={DollarSign} title="Total Revenue" value="₹4.2L" change={22} description="This month" />
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <h3 className="font-semibold text-foreground mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="var(--primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
        >
          <h3 className="font-semibold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" fill="var(--primary)" stroke="var(--primary)" opacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 stat-card"
      >
        <h3 className="font-semibold text-foreground mb-4">Recent Insights</h3>
        <div className="space-y-3">
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-foreground">Appointment requests increased by 18% this week</p>
          </div>
          <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="text-sm text-foreground">Payment success rate improved to 94.2%</p>
          </div>
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-foreground">Average session duration increased by 12 minutes</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
