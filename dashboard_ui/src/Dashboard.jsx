import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    throughput: 480,
    oversizePercent: 8.7,
    cubicity: 86,
    wearRate: 1.7,
    alerts: []
  });

  const [history, setHistory] = useState([
    { time: '10:00', throughput: 460 },
    { time: '10:15', throughput: 470 },
    { time: '10:30', throughput: 480 },
    { time: '10:45', throughput: 495 },
    { time: '11:00', throughput: 500 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/metrics')
        .then(res => res.json())
        .then(data => setMetrics(data));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Crushing Dashboard</h1>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div><h2>Throughput</h2><p>{metrics.throughput} T/hr</p></div>
        <div><h2>Oversize %</h2><p>{metrics.oversizePercent}%</p></div>
        <div><h2>Cubicity</h2><p>{metrics.cubicity}%</p></div>
        <div><h2>Wear Rate</h2><p>{metrics.wearRate} mm/week</p></div>
      </div>
      <h3>History</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="throughput" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
