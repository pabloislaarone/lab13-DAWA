'use client';

import { useEffect, useState } from 'react';

// Cuenta regresiva hasta que la cuenta se desbloquea
export default function Countdown({ until, onDone }: { until: number; onDone?: () => void }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = Math.max(0, Math.round((until - now) / 1000));

  useEffect(() => {
    if (left === 0) onDone?.();
  }, [left, onDone]);
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, '0');

  return (
    <span className="tabular-nums">
      {left > 0 ? `${mm}:${ss}` : 'ya puedes intentar'}
    </span>
  );
}
