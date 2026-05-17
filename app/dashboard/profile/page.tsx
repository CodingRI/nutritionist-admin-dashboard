'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Mail, Phone, MapPin, Save, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Anderson',
    email: 'sarah@nourishwell.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Certified Nutritionist with 8+ years of experience in personalized health coaching.',
    specialties: ['Weight Management', 'Sports Nutrition', 'Prenatal Nutrition'],
    experience: '8 years',
    certifications: ['RDN', 'ISSN-SNS', 'INHC'],
  })

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="page-title">Admin Profile</h1>
          <p className="page-subtitle">Manage your account settings and preferences</p>
        </motion.div>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="p-8">
            <div className="flex flex-col sm:flex-row gap-8 mb-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">SA</span>
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">{profile.name}</h2>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-foreground mb-4">Professional Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full mt-2 p-3 bg-input border border-border rounded-lg text-foreground resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-2 text-sm text-foreground">{profile.bio}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experience</label>
                    {isEditing ? (
                      <Input
                        value={profile.experience}
                        onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                        className="mt-2 bg-input border-border"
                      />
                    ) : (
                      <p className="mt-2 text-sm text-foreground">{profile.experience}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Specialties</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Certifications</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-border">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="text-accent hover:text-accent ml-auto flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Security Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Security</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-center text-sm">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-center text-sm">
                  Two-Factor Auth
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Preferences Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Email Notifications</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Appointment Alerts</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Payment Alerts</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </label>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
