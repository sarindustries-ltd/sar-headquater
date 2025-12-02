import React, { useState, useRef, useEffect } from 'react';

interface DataPoint {
  label: string;
  income: number;
  expense: number;
}

interface ChartProps {
  data: DataPoint[];
  type: 'area' | 'bar';
}

export const FinanceChart: React.FC<ChartProps> = ({ data, type }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const height = 300;
  const padding = 40;

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  if (width === 0) return <div ref={containerRef} className="h-[300px] w-full" />;

  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxVal = Math.max(...data.map(d => Math.max(d.income, d.expense))) * 1.1;

  const getX = (index: number) => padding + (index * (chartWidth / (data.length - 1)));
  const getY = (val: number) => height - padding - (val / maxVal) * chartHeight;
  
  // Bar chart specifics
  const barWidth = (chartWidth / data.length) * 0.4;
  const getBarX = (index: number) => padding + (index * (chartWidth / data.length)) + (chartWidth / data.length / 2);

  const formatYAxis = (val: number) => {
    if (val >= 1000000) return `BDT ${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `BDT ${(val / 1000).toFixed(0)}k`;
    return `BDT ${val}`;
  };

  return (
    <div ref={containerRef} className="w-full h-[300px] relative select-none">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
          const y = height - padding - (tick * chartHeight);
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <text x={padding - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-gray-500 font-mono">
                {formatYAxis(maxVal * tick)}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, i) => {
            const x = type === 'area' ? getX(i) : getBarX(i);
            return (
                <text key={i} x={x} y={height - 10} textAnchor="middle" className="text-[10px] fill-gray-500 font-medium">
                    {d.label}
                </text>
            );
        })}

        {/* AREA CHART MODE */}
        {type === 'area' && (
          <>
            {/* Income Area */}
            <path
              d={`
                M ${getX(0)} ${getY(data[0].income)}
                ${data.map((d, i) => `L ${getX(i)} ${getY(d.income)}`).join(' ')}
                L ${getX(data.length - 1)} ${height - padding}
                L ${getX(0)} ${height - padding}
                Z
              `}
              fill="url(#incomeGradient)"
            />
            <path
              d={`M ${getX(0)} ${getY(data[0].income)} ${data.map((d, i) => `L ${getX(i)} ${getY(d.income)}`).join(' ')}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            
             {/* Expense Area (Overlay) */}
             <path
              d={`
                M ${getX(0)} ${getY(data[0].expense)}
                ${data.map((d, i) => `L ${getX(i)} ${getY(d.expense)}`).join(' ')}
                L ${getX(data.length - 1)} ${height - padding}
                L ${getX(0)} ${height - padding}
                Z
              `}
              fill="url(#expenseGradient)"
              className="opacity-50"
            />
            <path
              d={`M ${getX(0)} ${getY(data[0].expense)} ${data.map((d, i) => `L ${getX(i)} ${getY(d.expense)}`).join(' ')}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4 2"
              className="opacity-50"
            />

            {/* Vertical Cursor Line (Area Chart) */}
            {hoveredIndex !== null && (
                <line
                    x1={getX(hoveredIndex)}
                    y1={padding}
                    x2={getX(hoveredIndex)}
                    y2={height - padding}
                    stroke="rgba(255,255,255,0.1)"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    pointerEvents="none"
                />
            )}

            {/* Interactive Points */}
            {data.map((d, i) => (
              <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className="cursor-crosshair">
                <circle 
                  cx={getX(i)} 
                  cy={getY(d.income)} 
                  r={hoveredIndex === i ? 6 : 4} 
                  className={`fill-emerald-500 transition-all duration-200 ${hoveredIndex === i ? 'stroke-white stroke-2' : ''}`} 
                />
                <circle 
                  cx={getX(i)} 
                  cy={getY(d.expense)} 
                  r={hoveredIndex === i ? 6 : 4} 
                  className={`fill-red-500 transition-all duration-200 ${hoveredIndex === i ? 'stroke-white stroke-2' : ''}`} 
                />
                {/* Hit Area */}
                <rect x={getX(i) - 10} y={padding} width={20} height={chartHeight} fill="transparent" />
              </g>
            ))}
          </>
        )}

        {/* BAR CHART MODE */}
        {type === 'bar' && data.map((d, i) => {
            const xCenter = getBarX(i);
            const incomeHeight = chartHeight * (d.income / maxVal);
            const expenseHeight = chartHeight * (d.expense / maxVal);
            
            return (
                <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                    {/* Income Bar */}
                    <rect 
                        x={xCenter - barWidth - 2} 
                        y={height - padding - incomeHeight} 
                        width={barWidth} 
                        height={incomeHeight} 
                        fill="#10b981" 
                        rx={4}
                        className={`transition-all ${hoveredIndex === i ? 'opacity-100' : 'opacity-80'}`}
                    />
                    {/* Expense Bar */}
                    <rect 
                        x={xCenter + 2} 
                        y={height - padding - expenseHeight} 
                        width={barWidth} 
                        height={expenseHeight} 
                        fill="#ef4444" 
                        rx={4}
                        className={`transition-all ${hoveredIndex === i ? 'opacity-100' : 'opacity-80'}`}
                    />
                     {/* Invisible Hover Hitbox */}
                     <rect 
                        x={xCenter - barWidth - 10} 
                        y={padding} 
                        width={barWidth * 2 + 20} 
                        height={chartHeight} 
                        fill="transparent" 
                    />
                </g>
            );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div 
          className="absolute bg-gray-900/95 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-2xl z-20 pointer-events-none transition-all duration-75 min-w-[140px]"
          style={{ 
            left: type === 'area' ? getX(hoveredIndex) : getBarX(hoveredIndex),
            top: padding, 
            transform: 'translate(-50%, -120%)' 
          }}
        >
          <p className="text-gray-300 text-xs font-bold mb-2 border-b border-white/10 pb-1">{data[hoveredIndex].label}</p>
          <div className="flex flex-col gap-1.5">
              <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    Income
                  </div>
                  <div className="text-emerald-400 font-bold font-mono text-xs">BDT {data[hoveredIndex].income.toLocaleString()}</div>
              </div>
              <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Expense
                  </div>
                  <div className="text-red-400 font-bold font-mono text-xs">BDT {data[hoveredIndex].expense.toLocaleString()}</div>
              </div>
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 bottom-[-4px] w-2 h-2 bg-gray-900 border-r border-b border-white/20 transform -translate-x-1/2 rotate-45"></div>
        </div>
      )}
    </div>
  );
};