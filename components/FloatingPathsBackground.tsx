'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingPathsBackgroundProps {
  position: number;
  children: React.ReactNode;
  className?: string;
}

export function FloatingPathsBackground({ position, children, className }: FloatingPathsBackgroundProps) {
  const paths = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div className="pointer-events-none absolute inset-0 text-cyan-700/20">
        <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="none">
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.05 + path.id * 0.006}
            />
          ))}
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
