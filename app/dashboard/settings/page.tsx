'use client'

import { motion } from 'framer-motion'
import { Save, Lock, Bell, Palette, LogOut } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'business', label: 'Business', icon: 'Briefcase' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ]

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and application preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="p-2 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-primary/5'
                }`}
              >
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </Card>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="font-semibold text-foreground mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <Input defaultValue="Dr. Sarah Anderson" className="mt-2 bg-input border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input defaultValue="sarah@nourishwell.com" className="mt-2 bg-input border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <Input defaultValue="+1 (555) 123-4567" className="mt-2 bg-input border-border" />
                </div>
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Business Settings */}
          {activeTab === 'business' && (
            <Card className="p-6">
              <h2 className="font-semibold text-foreground mb-6">Business Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Brand Name</label>
                  <Input defaultValue="NourishWell" className="mt-2 bg-input border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Appointment Price</label>
                  <Input defaultValue="₹2,500" className="mt-2 bg-input border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                  <Input defaultValue="IST (UTC+5:30)" className="mt-2 bg-input border-border" />
                </div>
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h2 className="font-semibold text-foreground mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive email updates' },
                  { label: 'Appointment Alerts', desc: 'Alerts for new appointments' },
                  { label: 'Payment Alerts', desc: 'Alerts for payments' },
                  { label: 'Support Alerts', desc: 'Alerts for support tickets' },
                ].map((item) => (
                  <label key={item.label} className="flex items-start gap-3 p-3 hover:bg-primary/5 rounded-lg">
                    <input type="checkbox" defaultChecked className="mt-1 rounded" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </label>
                ))}
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90">Save Preferences</Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="font-semibold text-foreground mb-6">Security & Privacy</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start text-accent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout from all devices
                </Button>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
