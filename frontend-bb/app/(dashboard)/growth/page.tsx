'use client'
import { useState } from 'react'
import Topbar from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, Users, Eye, MousePointer, Clock } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line
} from 'recharts'

const generateData = (days: number) =>
  Array.from({ length: days }, (_, i) => ({
    date: `Apr ${i + 1}`,
    subscribers: 12000 + Math.floor(Math.random() * 5000) + i * 180,
    views: 40000 + Math.floor(Math.random() * 20000) + i * 400,
    watchTime: 2800 + Math.floor(Math.random() * 1200) + i * 30,
    revenue: 120 + Math.floor(Math.random() * 80) + i * 3,
  }))

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs space-y-1">
      <p className="text-white/40 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="font-medium" style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  )
}

const milestones = [
  { label: '10K Subscribers', date: 'Jan 14, 2026', achieved: true },
  { label: '25K Subscribers', date: 'Mar 2, 2026',  achieved: true },
  { label: '50K Subscribers', date: 'Est. Jul 2026', achieved: false },
  { label: '100K Subscribers', date: 'Est. Jan 2027', achieved: false },
]

const kpis = [
  { label: 'Subscriber Growth', value: '+2,840', delta: '+19.1%', up: true,  icon: Users,       color: 'text-green-400' },
  { label: 'Total Views',       value: '284K',   delta: '+8.7%',  up: true,  icon: Eye,         color: 'text-blue-400' },
  { label: 'Watch Time',        value: '18.2K hrs', delta: '+12.3%', up: true, icon: Clock,     color: 'text-purple-400' },
  { label: 'Click-Through',     value: '4.2%',   delta: '-0.3%',  up: false, icon: MousePointer, color: 'text-red-400' },
]

export default function GrowthPage() {
  const [days, setDays] = useState(30)
  const data = generateData(days)

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Growth" subtitle="Track your channel growth over time" />

      <div className="p-6 space-y-4">

        {/* Period tabs */}
        <div className="flex items-center justify-between">
          <p className="text-white/40 text-sm">
            Showing <span className="text-white">{days}-day</span> growth trend
          </p>
          <Tabs value={String(days)} onValueChange={v => setDays(Number(v))}>
            <TabsList className="bg-white/5 border border-white/5">
              {[['7','7D'],['30','30D'],['90','90D']].map(([v, l]) => (
                <TabsTrigger key={v} value={v}
                  className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/30">
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-4 gap-3">
          {kpis.map(({ label, value, delta, up, icon: Icon, color }) => (
            <Card key={label} className="bg-white/[0.03] border-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/30 text-xs">{label}</p>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <p className="text-white font-bold text-xl mb-1">{value}</p>
              <div className="flex items-center gap-1">
                {up
                  ? <TrendingUp className="w-3 h-3 text-green-400" />
                  : <TrendingDown className="w-3 h-3 text-red-400" />}
                <span className={`text-xs font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>
                  {delta} vs last period
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Subscriber growth area chart */}
        <Card className="bg-white/[0.03] border-white/5 p-5">
          <div className="mb-5">
            <p className="text-white font-semibold text-sm">Subscriber Growth</p>
            <p className="text-white/30 text-xs mt-0.5">Cumulative subscribers over time</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(days / 6)} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)' }} />
              <Area type="monotone" dataKey="subscribers" name="Subscribers" stroke="#22c55e" strokeWidth={2} fill="url(#g1)" dot={false} activeDot={{ r: 3, fill: '#22c55e', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Views + Watch Time */}
        <div className="grid grid-cols-2 gap-4">

          <Card className="bg-white/[0.03] border-white/5 p-5">
            <div className="mb-5">
              <p className="text-white font-semibold text-sm">Daily Views</p>
              <p className="text-white/30 text-xs mt-0.5">Views per day</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={data.slice(-14)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="views" name="Views" fill="#3b82f6" radius={[3, 3, 0, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-white/[0.03] border-white/5 p-5">
            <div className="mb-5">
              <p className="text-white font-semibold text-sm">Watch Time vs Revenue</p>
              <p className="text-white/30 text-xs mt-0.5">Hours watched · Estimated revenue</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <ComposedChart data={data.slice(-14)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="watchTime" name="Watch Time (hrs)" fill="#a855f7" radius={[3, 3, 0, 0]} maxBarSize={16} opacity={0.8} />
                <Line type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Milestones */}
        <Card className="bg-white/[0.03] border-white/5 p-5">
          <p className="text-white font-semibold text-sm mb-4">Milestones</p>
          <div className="flex items-center gap-0">
            {milestones.map((m, i) => (
              <div key={m.label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mb-2 ${
                    m.achieved ? 'bg-green-500 border-green-500' : 'border-white/20 bg-transparent'
                  }`}>
                    {m.achieved && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <p className={`text-xs font-medium text-center ${m.achieved ? 'text-white' : 'text-white/30'}`}>
                    {m.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${m.achieved ? 'text-green-400' : 'text-white/20'}`}>
                    {m.date}
                  </p>
                </div>
                {i < milestones.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-1 ${i < 1 ? 'bg-green-500/50' : 'bg-white/5'}`} />
                )}
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  )
}