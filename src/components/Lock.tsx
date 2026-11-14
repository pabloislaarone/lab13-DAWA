'use client';

import { useEffect, useRef, useState } from 'react';

export type LockState = 'reposo' | 'llave' | 'fallo' | 'bloqueada' | 'abierta';

type Props = {
  state: LockState;
  /** Pines alineados en la línea de corte (registro: requisitos cumplidos) */
  set?: boolean[];
  /** Cantidad de pines marcados en rojo (intentos fallidos) */
  failed?: number;
  /** Cambia en cada intento fallido para repetir la animación */
  failKey?: number;
};

const PINS = [92, 150, 208];
const SHEAR = 118; // línea de corte entre el cilindro y la carcasa

// Corte transversal de una cerradura de pines.
// Cada pin tiene un pin de llave (latón) y un pin conductor (acero).
// Si el espacio entre ambos coincide con la línea de corte, el cilindro gira.
export default function Lock({ state, set = [false, false, false], failed = 0, failKey = 0 }: Props) {
  const [shake, setShake] = useState(false);
  const prevState = useRef(state);

  useEffect(() => {
    if (state === 'bloqueada' && prevState.current !== 'bloqueada') {
      setShake(true);
      const t = setTimeout(() => setShake(false), 400);
      prevState.current = state;
      return () => clearTimeout(t);
    }
    prevState.current = state;
  }, [state]);

  const open = state === 'abierta';
  const locked = state === 'bloqueada';
  const keyIn = state === 'llave' || open;

  return (
    <svg
      viewBox="0 0 300 220"
      className={`w-full max-w-lg ${shake ? 'cerrojo-golpe' : ''}`}
      role="img"
      aria-label={
        locked
          ? 'Cerradura bloqueada'
          : open
            ? 'Cerradura abierta'
            : `Cerradura con ${failed} de 3 intentos fallidos`
      }
    >
      <defs>
        <clipPath id="carcasa">
          <rect x="24" y="16" width="252" height="188" rx="20" />
        </clipPath>
      </defs>

      {/* Carcasa */}
      <rect x="24" y="16" width="252" height="188" rx="20" fill="var(--acero-2)" />
      <rect
        x="24" y="16" width="252" height="188" rx="20" fill="none" strokeWidth="3"
        className="pieza"
        stroke={locked ? 'var(--bloqueo)' : open ? 'var(--abierto)' : 'var(--acero-3)'}
      />

      {/* Cámaras de los pines */}
      {PINS.map((x) => (
        <rect key={x} x={x - 13} y="30" width="26" height="100" rx="6" fill="var(--acero)" />
      ))}

      {/* Cilindro (plug) */}
      <g className="pieza" style={{ transform: open ? 'translateX(10px)' : 'translateX(0)' }}>
        <rect x="44" y={SHEAR} width="212" height="64" rx="12" fill="var(--laton)" />
        <rect x="44" y={SHEAR + 26} width="212" height="12" fill="var(--laton-hondo)" opacity="0.55" />
      </g>

      {/* Línea de corte */}
      <line
        x1="36" x2="264" y1={SHEAR} y2={SHEAR}
        strokeWidth="2" strokeDasharray="5 5"
        className="pieza"
        stroke={open ? 'var(--abierto)' : 'var(--acero-3)'}
        opacity={open ? 1 : 0.7}
      />

      {/* Pines */}
      {PINS.map((x, i) => {
        const isFailed = i < failed || locked;
        const isSet = open || set[i];
        // En reposo el pin conductor cruza la línea de corte (cerrado).
        const lift = isSet ? -18 : 0;
        return (
          <g key={`${x}-${isFailed ? failKey : 0}`} className={isFailed && !locked ? 'pin-falla' : ''}>
            <g className="pieza" style={{ transform: `translateY(${lift}px)` }}>
              {/* resorte */}
              <path
                d={`M${x} 34 l-7 6 l14 6 l-14 6 l14 6 l-7 6`}
                fill="none" stroke="var(--acero-3)" strokeWidth="2" strokeLinejoin="round"
              />
              {/* pin conductor */}
              <rect
                x={x - 9} y="72" width="18" height="64" rx="5"
                className="pieza"
                fill={isFailed ? 'var(--bloqueo)' : isSet ? 'var(--abierto)' : '#9fb0c6'}
              />
              {/* pin de llave */}
              <rect x={x - 9} y="138" width="18" height="30" rx="5" fill="var(--laton-hondo)" />
            </g>
          </g>
        );
      })}

      {/* Llave entrando por la izquierda */}
      <g clipPath="url(#carcasa)">
      <g
        className="pieza"
        style={{
          transform: keyIn ? 'translateX(0)' : 'translateX(-230px)',
          opacity: keyIn ? 1 : 0,
        }}
      >
        <path
          d="M46 168 H232 l14 8 l-14 8 H46 Z"
          fill="#e7eef7" stroke="var(--acero-3)" strokeWidth="1.5"
        />
      </g>

      </g>

      {/* Cerrojo que atraviesa el cilindro al bloquearse */}
      <g clipPath="url(#carcasa)">
        <g
          className="pieza"
          style={{
            transform: locked ? 'translateX(0)' : 'translateX(270px)',
            opacity: locked ? 1 : 0,
          }}
        >
          <rect x="30" y={SHEAR + 22} width="240" height="20" rx="10" fill="var(--bloqueo)" />
          <rect x="30" y={SHEAR + 22} width="240" height="6" rx="3" fill="#ffffff" opacity="0.18" />
        </g>
      </g>
    </svg>
  );
}
