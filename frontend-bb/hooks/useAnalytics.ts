import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { DashboardSummary, VideoMetric, ChannelSnapshot } from '@/types/analytics'

export const useDashboard = (days = 30) =>
  useQuery<DashboardSummary>({
    queryKey: ['dashboard', days],
    queryFn: () => api.get(`/analytics/dashboard/?days=${days}`).then(r => r.data),
  })

export const useVideos = (sort = 'views') =>
  useQuery<{ results: VideoMetric[] }>({
    queryKey: ['videos', sort],
    queryFn: () => api.get(`/analytics/videos/?sort=${sort}`).then(r => r.data),
  })

export const useGrowth = (days = 30) =>
  useQuery<ChannelSnapshot[]>({
    queryKey: ['growth', days],
    queryFn: () => api.get(`/analytics/growth/?days=${days}`).then(r => r.data),
  })