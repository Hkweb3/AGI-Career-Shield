'use client';

export function Section({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <section
      style={{
        width: '100%',
        padding: '96px 20px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{ maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
        {children}
      </div>
    </section>
  );
}

export function Container({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto', width: '100%', ...style }}>
      {children}
    </div>
  );
}
