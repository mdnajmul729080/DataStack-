import { useState, useEffect, useCallback } from 'react';

export function useVconMetrics(refreshIntervalMs = 3000) {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
        setError(null);
      } else {
        setError('Failed to fetch metrics');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    const timer = setInterval(fetchMetrics, refreshIntervalMs);
    return () => clearInterval(timer);
  }, [fetchMetrics, refreshIntervalMs]);

  return { metrics, loading, error, refetch: fetchMetrics };
}
