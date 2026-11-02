import { useCallback } from 'react';
import type { DashboardData } from '@/types/dashboard';
import { loadDashboard } from '@/services/api';
import { EMPTY_DASHBOARD } from '@/constants/dashboard';
import { useAsyncData } from './useAsyncData';

export function useDashboard() {
  const load = useCallback(() => loadDashboard(), []);
  const { data, loading, error, reload } = useAsyncData<DashboardData>(load, EMPTY_DASHBOARD);

  return { dashboard: data, loading, error, reload };
}
