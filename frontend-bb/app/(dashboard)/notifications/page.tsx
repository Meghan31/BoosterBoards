'use client'
import { useState } from 'react'
import Topbar from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import {
  Trophy, Lightbulb, AlertCircle,
  RefreshCw, TrendingUp, CheckCheck, Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'

const MOCK = [
  { id: 1,  type: 'milestone', title: '🎉 25K Subscribers Reached!',        message: 'You just crossed 25,000 subscribers. Your channel is growing 19% faster than average in your niche.', is_read: false, created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: 2,  type: 'insight',   title: 'New AI Insight Available',           message: 'Your latest video "Next.js 15 Full Course" is outperforming your average CTR by 2.4%. Consider using similar thumbnail style.', is_read: false, created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
  { id: 3,  type: 'alert',     title: 'Engagement Drop Detected',           message: 'Your last 3 videos show a 12% drop in average view duration. AI analysis suggests shorter intros could help.', is_read: false, created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 4,  type: 'sync',      title: 'YouTube Data Synced',                message: 'Successfully synced 47 videos and updated channel statistics. All dashboards are up to date.', is_read: true,  created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: 5,  type: 'tip',       title: 'Growth Tip: Best Time to Post',      message: 'Based on your audience activity, posting on Tuesdays at 2pm EST could increase your first-hour views by up to 23%.', is_read: true,  created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 6,  type: 'milestone', title: '100K Views This Month!',             message: 'You hit 100,000 views this month for the first time. Your best performing content is developer tutorials.', is_read: true,  created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() },
  { id: 7,  type: 'insight',   title: 'Top Video Opportunity',              message: '"Django REST API in 1 Hour" has a 94% audience retention rate. Creating a Part 2 could generate 40K+ views based on comment demand.', is_read: true,  created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { id: 8,  type: 'alert',     title: 'CTR Below Benchmark',                message: 'Your click-through rate of 3.4% is below the 4.5% benchmark for tech channels. Consider A/B testing thumbnail text.', is_read: true,  created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
]

const typeConfig = {
  milestone: { icon: Trophy,      color: 'text-yellow-400', bg: 'bg-yellow-400/10', badge: 'Milestone' },
  insight:   { icon: Lightbulb,   color: 'text-blue-400',   bg: 'bg-blue-400/10',   badge: 'AI Insight' },
  alert:     { icon: AlertCircle, color: 'text-red-400',    bg: 'bg-red-400/10',    badge: 'Alert' },
  sync:      { icon: RefreshCw,   color: 'text-green-400',  bg: 'bg-green-400/10',  badge: 'Sync' },
  tip:       { icon: TrendingUp,  color: 'text-purple-400', bg: 'bg-purple-400/10', badge: 'Tip' },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter(n => !n.is_read).length

  const markRead = (id: number) =>
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, is_read: true } : n))

  const markAllRead = () =>
    setNotifications(ns => ns.map(n => ({ ...n, is_read: true })))

  const displayed = filter === 'unread'
    ? notifications.filter(n => !n.is_read)
    : notifications

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Notifications" subtitle="Stay on top of your channel activity" />

      <div className="p-6 space-y-4">

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-lg transition-all',
                filter === 'all'
                  ? 'bg-white/10 text-white'
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5',
                filter === 'unread'
                  ? 'bg-white/10 text-white'
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              )}
            >
              Unread
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllRead}
              className="text-white/30 hover:text-white text-xs h-7 gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notification list */}
        {displayed.length === 0 ? (
          <Card className="bg-white/[0.03] border-white/5 p-12 flex flex-col items-center justify-center gap-3">
            <Bell className="w-10 h-10 text-white/10" />
            <p className="text-white/20 text-sm">No notifications</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {displayed.map(n => {
              const cfg = typeConfig[n.type as keyof typeof typeConfig]
              const Icon = cfg.icon
              return (
                <Card
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={cn(
                    'border-white/5 p-4 cursor-pointer transition-all hover:border-white/10',
                    n.is_read
                      ? 'bg-white/[0.02]'
                      : 'bg-white/[0.04] border-l-2 border-l-red-500/50'
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5', cfg.bg)}>
                      <Icon className={cn('w-4 h-4', cfg.color)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={cn('text-sm font-medium', n.is_read ? 'text-white/60' : 'text-white')}>
                            {n.title}
                          </p>
                          <Badge
                            variant="outline"
                            className={cn('text-xs border-0', cfg.bg, cfg.color)}
                          >
                            {cfg.badge}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!n.is_read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                          )}
                          <span className="text-white/20 text-xs whitespace-nowrap">
                            {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      <p className={cn('text-xs leading-relaxed', n.is_read ? 'text-white/25' : 'text-white/40')}>
                        {n.message}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}