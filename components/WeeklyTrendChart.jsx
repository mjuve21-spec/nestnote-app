"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ label: DAY_LABELS[d.getDay()], date: d.toISOString().slice(0, 10) });
  }
  return days;
}

function average(values) {
  const valid = values.filter(v => v !== null);
  if (!valid.length) return "—";
  return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
}

export function WeeklyTrendChart({ familyId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
     
      const { supabase } = await import("@/lib/supabase");
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const { data: checkIns } = await supabase
        .from("checkins")
        .select("created_at, mood, pain")
        .eq("family_id", familyId)
        .gte("created_at", sevenDaysAgo.toISOString());

      const byDate = {};
      (checkIns || []).forEach(ci => {
        const date = ci.created_at.slice(0, 10);
        if (!byDate[date]) byDate[date] = { moods: [], pains: [] };
        if (ci.mood != null) byDate[date].moods.push(ci.mood);
        if (ci.pain != null) byDate[date].pains.push(ci.pain);
      });

      const points = getLast7Days().map(({ label, date }) => {
        const b = byDate[date];
        return {
          day: label,
          mood: b?.moods.length ? +(b.moods.reduce((a, c) => a + c, 0) / b.moods.length).toFixed(1) : null,
          pain: b?.pains.length ? +(b.pains.reduce((a, c) => a + c, 0) / b.pains.length).toFixed(1) : null,
        };
      });

      setData(points);
      setLoading(false);
    }
    fetchTrends();
  }, [familyId]);

  if (loading) return <div className="h-48 animate-pulse bg-muted rounded-xl" />;

  return (
    <div className="rounded-xl border p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium">Weekly trends</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" />Mood</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-400 inline-block rounded" />Pain</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v, name) => [v ?? "—", name]} />
          <Line type="monotone" dataKey="mood" name="Mood" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} connectNulls={false} />
          <Line type="monotone" dataKey="pain" name="Pain" stroke="#fb7185" strokeWidth={2} strokeDasharray="5 4" dot={{ r: 4 }} connectNulls={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-muted/50 rounded-lg p-2"><p className="text-xs text-muted-foreground">Avg mood</p><p className="font-medium">{average(data.map(d => d.mood))}</p></div>
        <div className="bg-muted/50 rounded-lg p-2"><p className="text-xs text-muted-foreground">Avg pain</p><p className="font-medium">{average(data.map(d => d.pain))}</p></div>
        <div className="bg-muted/50 rounded-lg p-2"><p className="text-xs text-muted-foreground">Check-ins</p><p className="font-medium">{data.filter(d => d.mood || d.pain).length}</p></div>
      </div>
    </div>
  );
}