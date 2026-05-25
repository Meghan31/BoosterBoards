'use client'
import { useState } from 'react'
import Topbar from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Lightbulb, Sparkles, TrendingUp, Type,
  RefreshCw, Zap, ChevronRight
} from 'lucide-react'

// ─── Mock AI responses for demo ───────────────────────────────────────────────
const mockSummary = `Your channel shows strong momentum with consistent engagement above 4% — well above the 2-3% platform average. Your tutorial-style content on developer tools is clearly resonating, with "How I Built a SaaS in 30 Days" driving 3x your average views. The biggest opportunity lies in improving your click-through rate from 4.2% to 5%+ by testing more curiosity-driven thumbnail copy.`

const mockRecommendations = `1. **Double down on "challenge" and "I tried" formats** — your two highest-performing videos use this framing. Viewers respond to personal experiments with clear outcomes in the title.\n\n2. **Post on Tuesdays and Thursdays** — your engagement data shows peak audience activity mid-week. Shifting from weekend uploads could add 15-20% more initial velocity.\n\n3. **Add chapter markers to all videos over 8 minutes** — your average view duration of 4:32 suggests viewers are dropping off. Chapters help retention and boost the video in search rankings.`

const mockTitles = `1. I Built a Full SaaS in 30 Days (Here's Everything)\n2. Building a SaaS From Zero to Launch in 30 Days\n3. What 30 Days of SaaS Building Actually Taught Me\n4. SaaS in 30 Days: The Honest Results\n5. I Challenged Myself to Launch a SaaS in a Month`

function InsightCard({
  icon: Icon, title, badge, children, onGenerate, loading, color = 'red'
}: {
  icon: any, title: string, badge: string, children: React.ReactNode,
  onGenerate?: () => void, loading?: boolean, color?: string
}) {
  const colors: Record<string, string> = {
    red:    'bg-red-500/10 text-red-400',
    blue:   'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
  }

  return (
    <Card className="bg-white/[0.03] border-white/5 p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{title}</p>
            <Badge variant="outline" className="text-white/20 border-white/10 text-xs mt-0.5">{badge}</Badge>
          </div>
        </div>
        {onGenerate && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onGenerate}
            disabled={loading}
            className="text-white/30 hover:text-white text-xs h-7 px-2 gap-1.5"
          >
            {loading
              ? <RefreshCw className="w-3 h-3 animate-spin" />
              : <Sparkles className="w-3 h-3" />
            }
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        )}
      </div>
      {children}
    </Card>
  )
}

function MarkdownText({ text }: { text: string }) {
  // Simple bold + newline renderer
  return (
    <div className="space-y-2">
      {text.split('\n\n').map((para, i) => (
        <p key={i} className="text-white/60 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: para.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-semibold">$1</span>')
          }}
        />
      ))}
    </div>
  )
}

export default function InsightsPage() {
  const [summary, setSummary]               = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [titles, setTitles]                 = useState<string | null>(null)
  const [loadingSummary, setLoadingSummary]   = useState(false)
  const [loadingRecs, setLoadingRecs]         = useState(false)
  const [loadingTitles, setLoadingTitles]     = useState(false)

  const simulateGenerate = async (
    setter: (v: string) => void,
    setLoading: (v: boolean) => void,
    mock: string
  ) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setter(mock)
    setLoading(false)
  }

  const titleList = titles?.split('\n').filter(Boolean) ?? []

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="AI Insights" subtitle="OpenAI-powered analysis and recommendations" />

      <div className="p-6 space-y-4">

        {/* Header Banner */}
        <div className="rounded-xl bg-gradient-to-r from-red-950/40 to-purple-950/40 border border-red-500/10 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-white font-semibold">AI-Powered Creator Intelligence</p>
              <p className="text-white/40 text-xs mt-0.5">Powered by GPT-4o-mini · Connect your YouTube channel for personalized insights</p>
            </div>
          </div>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/20 text-xs">Beta</Badge>
        </div>

        {/* Row 1 — Summary + Recommendations */}
        <div className="grid grid-cols-2 gap-4">

          {/* Channel Summary */}
          <InsightCard
            icon={Lightbulb} title="Channel Summary" badge="AI Generated" color="red"
            onGenerate={() => simulateGenerate(setSummary, setLoadingSummary, mockSummary)}
            loading={loadingSummary}
          >
            {loadingSummary ? (
              <div className="space-y-2">
                <Skeleton className="h-3 w-full bg-white/5" />
                <Skeleton className="h-3 w-5/6 bg-white/5" />
                <Skeleton className="h-3 w-4/6 bg-white/5" />
              </div>
            ) : summary ? (
              <p className="text-white/60 text-sm leading-relaxed">{summary}</p>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 gap-2">
                <Lightbulb className="w-8 h-8 text-white/10" />
                <p className="text-white/20 text-xs">Click Generate to analyze your channel</p>
              </div>
            )}
          </InsightCard>

          {/* Recommendations */}
          <InsightCard
            icon={TrendingUp} title="Growth Recommendations" badge="Top 3 Actions" color="blue"
            onGenerate={() => simulateGenerate(setRecommendations, setLoadingRecs, mockRecommendations)}
            loading={loadingRecs}
          >
            {loadingRecs ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <Skeleton className="w-4 h-4 rounded-full bg-white/5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-full bg-white/5" />
                      <Skeleton className="h-3 w-4/5 bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recommendations ? (
              <MarkdownText text={recommendations} />
            ) : (
              <div className="flex flex-col items-center justify-center py-6 gap-2">
                <TrendingUp className="w-8 h-8 text-white/10" />
                <p className="text-white/20 text-xs">Click Generate for personalized recommendations</p>
              </div>
            )}
          </InsightCard>
        </div>

        {/* Row 2 — Title Suggestions */}
        <InsightCard
          icon={Type} title="Title Suggestions" badge="SEO Optimized" color="purple"
          onGenerate={() => simulateGenerate(setTitles, setLoadingTitles, mockTitles)}
          loading={loadingTitles}
        >
          {loadingTitles ? (
            <div className="grid grid-cols-5 gap-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg bg-white/5" />
              ))}
            </div>
          ) : titleList.length > 0 ? (
            <div className="grid grid-cols-5 gap-3">
              {titleList.map((title, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-lg p-3 cursor-pointer transition-all group"
                >
                  <span className="text-white/20 text-xs font-mono block mb-1.5">0{i + 1}</span>
                  <p className="text-white/60 text-xs leading-relaxed group-hover:text-white transition-colors">
                    {title.replace(/^\d+\.\s*/, '')}
                  </p>
                  <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-white/40 mt-2 transition-colors" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 gap-2">
              <Type className="w-8 h-8 text-white/10" />
              <p className="text-white/20 text-xs">Generate AI-optimized title variations for your top video</p>
            </div>
          )}
        </InsightCard>

      </div>
    </div>
  )
}