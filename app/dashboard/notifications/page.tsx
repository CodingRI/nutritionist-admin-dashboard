'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from "@clerk/nextjs";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Trash2,
  Calendar,
  Bell,
  Loader2,
  RefreshCw,
  CreditCard,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type AdminNotification = {
  id: string
  userId: string
  type: string
  title: string
  message: string
  isRead: boolean
  relatedChatId: string | null
  relatedAppointmentId: string | null
  createdAt: string
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'APPOINTMENT_REQUEST':
    case 'APPOINTMENT_SCHEDULED':
      return Calendar

    case 'PAYMENT_REQUEST':
    case 'PAYMENT_SUCCESS':
      return CreditCard

    case 'CHAT_MESSAGE':
      return MessageSquare

    case 'SUPPORT_QUERY':
      return MessageSquare

    case 'SYSTEM':
      return Bell

    default:
      return AlertCircle
  }
}

function getActionLabel(type: string) {
  switch (type) {
    case 'APPOINTMENT_REQUEST':
      return 'Review Appointment'

    case 'PAYMENT_SUCCESS':
      return 'View Payment'

    case 'PAYMENT_REQUEST':
      return 'View Payment Request'

    case 'APPOINTMENT_SCHEDULED':
      return 'View Schedule'

    case 'CHAT_MESSAGE':
      return 'Open Chat'

    case 'SUPPORT_QUERY':
      return 'View Support Query'

    default:
      return 'View'
  }
}

function getActionHref(notification: AdminNotification) {
  switch (notification.type) {
    case 'APPOINTMENT_REQUEST':
      return '/dashboard/appointments/review'

    case 'APPOINTMENT_SCHEDULED':
      return '/dashboard/appointments'

    case 'PAYMENT_REQUEST':
    case 'PAYMENT_SUCCESS':
      return '/dashboard/payments'

    case 'CHAT_MESSAGE':
      return '/dashboard/chats'

    case 'SUPPORT_QUERY':
      return '/dashboard/support'

    default:
      return '/dashboard'
  }
}

function isToday(dateString: string) {
  const date = new Date(dateString)
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

function formatNotificationTime(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`

  return date.toLocaleDateString()
}



export default function NotificationsPage() {
  const router = useRouter()

  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [isMarkingAll, setIsMarkingAll] = useState(false)

  const {getToken} = useAuth();

  const mainAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL

  const todayNotifications = useMemo(() => {
    return notifications.filter((notification) => isToday(notification.createdAt))
  }, [notifications])

  const earlierNotifications = useMemo(() => {
    return notifications.filter((notification) => !isToday(notification.createdAt))
  }, [notifications])


  async function fetchNotifications() {
    try {
      const token = await getToken()
      setIsLoading(true)
      setError(null)

      if (!mainAppUrl) {
        throw new Error('NEXT_PUBLIC_MAIN_APP_URL is missing in dashboard .env.local')
      }

      const res = await fetch(`${mainAppUrl}/api/admin/notifications`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch notifications.')
      }

      setNotifications(data.notifications || [])
      setUnreadCount(data.unreadCount || 0)
    } catch (err) {
      console.error('FETCH_NOTIFICATIONS_ERROR:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading notifications.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      setProcessingId(notificationId)
      const token = await getToken();
      const res = await fetch(
        `${mainAppUrl}/api/admin/notifications/${notificationId}/read`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to mark notification as read.')
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      )

      setUnreadCount((prev) => Math.max(prev - 1, 0))
    } catch (err) {
      console.error('MARK_NOTIFICATION_READ_ERROR:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to mark notification as read.'
      )
    } finally {
      setProcessingId(null)
    }
  }

  async function handleNotificationAction(notification: AdminNotification) {
    if (!notification.isRead) {
      await markAsRead(notification.id)
    }

    router.push(getActionHref(notification))
  }

  async function markAllAsRead() {
    try {
      const token = await getToken();
      setIsMarkingAll(true)
      setError(null)

      const unreadNotifications = notifications.filter(
        (notification) => !notification.isRead
      )

      await Promise.all(
        unreadNotifications.map((notification) =>
          fetch(`${mainAppUrl}/api/admin/notifications/${notification.id}/read`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          })
        )
      )

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      )

      setUnreadCount(0)
    } catch (err) {
      console.error('MARK_ALL_NOTIFICATIONS_READ_ERROR:', err)
      setError('Failed to mark all notifications as read.')
    } finally {
      setIsMarkingAll(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  function renderNotificationCard(notification: AdminNotification, index: number) {
    const Icon = getNotificationIcon(notification.type)
    const actionLabel = getActionLabel(notification.type)

    return (
      <motion.div
        key={notification.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
      >
        <Card
          className={`p-4 hover:shadow-md transition-all ${
            !notification.isRead ? 'bg-primary/5 border-primary/20' : 'opacity-80'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div
                className={`p-2 rounded-lg ${
                  !notification.isRead ? 'bg-primary/10' : 'bg-muted/10'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    !notification.isRead
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-foreground">
                    {notification.title}
                  </h3>

                  {!notification.isRead && (
                    <Badge variant="outline" className="text-xs border-primary/30">
                      New
                    </Badge>
                  )}

                  <Badge variant="secondary" className="text-xs">
                    {notification.type.replaceAll('_', ' ')}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>

                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatNotificationTime(notification.createdAt)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleNotificationAction(notification)}
                    disabled={processingId === notification.id}
                  >
                    {processingId === notification.id ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Opening...
                      </>
                    ) : (
                      actionLabel
                    )}
                  </Button>

                  {!notification.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => markAsRead(notification.id)}
                      disabled={processingId === notification.id}
                    >
                      <CheckCircle className="mr-2 h-3 w-3" />
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled
              title="Delete notification will be added later"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">
            Stay updated with appointment requests, payments, chats, and support activity.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchNotifications}
            disabled={isLoading}
            className="rounded-full"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={isMarkingAll || unreadCount === 0}
            className="rounded-full"
          >
            {isMarkingAll ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Marking...
              </>
            ) : (
              `Mark all as read${unreadCount > 0 ? ` (${unreadCount})` : ''}`
            )}
          </Button>
        </div>
      </motion.div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="p-4">
              <div className="animate-pulse flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-muted/20" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-48 rounded bg-muted/20" />
                  <div className="h-3 w-72 rounded bg-muted/20" />
                  <div className="h-3 w-28 rounded bg-muted/20" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <Card className="p-6 border-accent/30">
          <p className="text-sm text-accent font-medium">{error}</p>
          <Button onClick={fetchNotifications} variant="outline" className="mt-4">
            Try Again
          </Button>
        </Card>
      )}

      {!isLoading && !error && notifications.length === 0 && (
        <Card className="p-10 text-center">
          <Bell className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium text-foreground">No notifications yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            New appointment requests and payment updates will appear here.
          </p>
        </Card>
      )}

      {!isLoading && !error && notifications.length > 0 && (
        <div className="space-y-6">
          {todayNotifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                Today
              </h2>

              <div className="space-y-2">
                {todayNotifications.map((notification, index) =>
                  renderNotificationCard(notification, index)
                )}
              </div>
            </motion.div>
          )}

          {earlierNotifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                Earlier
              </h2>

              <div className="space-y-2">
                {earlierNotifications.map((notification, index) =>
                  renderNotificationCard(notification, index)
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}