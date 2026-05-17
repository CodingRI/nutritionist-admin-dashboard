'use client'

import { motion } from 'framer-motion'
import { Briefcase, FileText, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const workspaceClients = [
  { id: 1, name: 'Sarah Mitchell', status: 'New', date: '2024-05-20' },
  { id: 2, name: 'John Doe', status: 'In Review', date: '2024-05-18' },
  { id: 3, name: 'Emily Chen', status: 'Diet Plan Pending', date: '2024-05-15' },
]

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="page-title">Diagnosis Workspace</h1>
        <p className="page-subtitle">Organize and manage client health data and diagnosis planning</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Client List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="p-4">
            <Input placeholder="Search clients..." className="mb-4 bg-input border-border" />
            <div className="space-y-2">
              {workspaceClients.map((client) => (
                <div
                  key={client.id}
                  className="p-3 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors border border-transparent hover:border-primary/20"
                >
                  <p className="text-sm font-medium text-foreground">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.status}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Main Workspace */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Client Workspace
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Diagnosis Notes</label>
                  <textarea
                    placeholder="Add your diagnosis notes here..."
                    className="w-full mt-2 p-3 bg-input border border-border rounded-lg text-foreground resize-none focus:ring-primary focus:border-primary"
                    rows={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-primary hover:bg-primary/90">Save Draft</Button>
                  <Button variant="outline">Mark as Reviewed</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Health Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground">Metric</th>
                      <th className="text-left py-2 text-muted-foreground">Current</th>
                      <th className="text-left py-2 text-muted-foreground">Target</th>
                      <th className="text-left py-2 text-muted-foreground">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { metric: 'Weight', current: '72kg', target: '65kg', priority: 'High' },
                      { metric: 'BMI', current: '26.2', target: '23.5', priority: 'High' },
                      { metric: 'Water Intake', current: '1.5L', target: '3L', priority: 'Medium' },
                    ].map((row) => (
                      <tr key={row.metric} className="border-b border-border hover:bg-primary/5">
                        <td className="py-3 text-foreground">{row.metric}</td>
                        <td className="py-3 text-foreground">{row.current}</td>
                        <td className="py-3 text-foreground">{row.target}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 text-xs rounded bg-accent/10 text-accent">
                            {row.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Right Panel - Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Follow-up Tasks</h3>
            <div className="space-y-2">
              {[
                { title: 'Prepare diet chart', done: false },
                { title: 'Review medical history', done: true },
                { title: 'Confirm payment', done: false },
                { title: 'Schedule follow-up', done: false },
              ].map((task) => (
                <label key={task.title} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-primary/5 rounded">
                  <input type="checkbox" defaultChecked={task.done} className="rounded" />
                  <span className={`text-sm ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </span>
                </label>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
