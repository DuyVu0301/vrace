import { useEffect, useState } from "react";

export interface Registration {
  id: string;
  race_id: string;
  race_name: string;
  distance_goal: number;
  current_distance: number;
  registered_at: string;
}

export const useRegistrations = (userId: string | undefined) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchRegistrations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/registrations?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch registrations");
        const data = await response.json();
        setRegistrations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [userId]);

  return { registrations, loading, error };
};
