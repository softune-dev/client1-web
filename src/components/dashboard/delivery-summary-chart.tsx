import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface DataPoint {
  time: string;
  value: number;
}

const DATA: DataPoint[] = [
  { time: "6:00 AM", value: 160 },
  { time: "7:00 AM", value: 520 },
  { time: "8:00 AM", value: 700 },
  { time: "9:00 AM", value: 850 },
  { time: "10:00 AM", value: 700 },
  { time: "11:00 AM", value: 600 },
  { time: "12:00 PM", value: 1000 },
  { time: "1:00 PM", value: 920 },
  { time: "2:00 PM", value: 700 },
  { time: "3:00 PM", value: 610 },
  { time: "4:00 PM", value: 700 },
  { time: "5:00 PM", value: 630 },
  { time: "6:00 PM", value: 600 },
  { time: "7:00 PM", value: 200 },
  { time: "8:00 PM", value: 330 },
  { time: "9:00 PM", value: 215 },
];

export function DeliverySummaryChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Configuration
  const svgWidth = 500;
  const svgHeight = 240;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;
  const maxY = 1000;

  // Helper to map values to coordinates
  const getX = (index: number) => paddingLeft + (chartWidth * index) / (DATA.length - 1);
  const getY = (value: number) => paddingTop + chartHeight * (1 - value / maxY);

  // Generate path coordinates
  const points = DATA.map((pt, i) => ({ x: getX(i), y: getY(pt.value) }));
  
  // Construct path string
  const linePath = points.reduce(
    (path, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`),
    ""
  );

  // Construct fill path string (closed loop to bottom of chart)
  const fillPath = `${linePath} L ${getX(DATA.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`;

  // Y-axis grid lines (values 0, 200, 400, 600, 800, 1000)
  const gridValues = [0, 200, 400, 600, 800, 1000];

  // X-axis labels to display (labels are indices: 0 = 6 AM, 3 = 9 AM, 6 = 12 PM, 9 = 3 PM, 12 = 6 PM, 15 = 9 PM)
  const xAxisLabels = [
    { index: 0, text: "6 AM" },
    { index: 3, text: "9 AM" },
    { index: 6, text: "12 PM" },
    { index: 9, text: "3 PM" },
    { index: 12, text: "6 PM" },
    { index: 15, text: "9 PM" },
  ];

  return (
    <div className="flex flex-col h-full rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
          Today's Delivery Summary
        </h3>
        <div className="text-right space-y-0.5">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] dark:text-muted-foreground">
            Total Delivered
          </span>
          <span className="block text-lg font-bold text-[#0F172A] dark:text-foreground">
            1,820 <span className="text-xs font-medium text-[#64748B] dark:text-muted-foreground/80">Cylinders</span>
          </span>
        </div>
      </div>

      <div className="relative mt-6 w-full flex-1">
        {/* Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div
            className="absolute z-10 rounded bg-[#0F172A] px-2 py-1 text-2xs font-semibold text-white shadow-md dark:bg-muted"
            style={{
              left: `${(hoveredIndex / (DATA.length - 1)) * 85 + 6}%`,
              top: `${Math.max(0, (DATA[hoveredIndex].value / maxY) * -120 + 105)}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-[10px] leading-tight">{DATA[hoveredIndex].time}</div>
            <div className="text-[11px] font-bold text-blue-400 dark:text-blue-300">
              {DATA[hoveredIndex].value} Cylinders
            </div>
          </div>
        )}

        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="h-full w-full">
          <defs>
            {/* Gradient Fill under the Line */}
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {gridValues.map((val) => (
            <g key={val}>
              <line
                x1={paddingLeft}
                y1={getY(val)}
                x2={svgWidth - paddingRight}
                y2={getY(val)}
                stroke="#F1F5F9"
                strokeWidth="1"
                className="dark:stroke-border/40"
              />
              <text
                x={paddingLeft - 8}
                y={getY(val) + 4}
                textAnchor="end"
                className="fill-[#94A3B8] text-[10px] font-semibold dark:fill-muted-foreground"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Gradient Area Fill */}
          <path d={fillPath} fill="url(#chartGradient)" />

          {/* Main Chart Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Circle Markers */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                {/* Large transparent catcher for hover accessibility */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="12"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                
                {/* Visible dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? "5" : "3"}
                  fill={isHovered ? "#2563EB" : "#ffffff"}
                  stroke="#2563EB"
                  strokeWidth={isHovered ? "2" : "2"}
                  className="pointer-events-none transition-all duration-150"
                  style={{
                    filter: isHovered ? "drop-shadow(0 0 4px rgba(37,99,235,0.5))" : "none",
                  }}
                />
              </g>
            );
          })}

          {/* X-axis Labels */}
          {xAxisLabels.map((lbl) => (
            <text
              key={lbl.index}
              x={getX(lbl.index)}
              y={svgHeight - 8}
              textAnchor="middle"
              className="fill-[#94A3B8] text-[10px] font-semibold dark:fill-muted-foreground"
            >
              {lbl.text}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
