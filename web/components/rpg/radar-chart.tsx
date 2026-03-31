import type { RadarScore } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

interface RadarChartProps {
  categories: RadarScore[];
  size?: number;
  className?: string;
}

export function RadarChart({
  categories,
  size = 240,
  className,
}: RadarChartProps) {
  const n = categories.length;
  if (n < 3) return null;

  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38; // leave room for labels
  const levels = 4; // number of concentric polygons

  // Calculate angle for each axis (start from top, go clockwise)
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2; // start from top

  // Get x,y for a point at given angle and radius
  const getPoint = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  // Build concentric grid polygons
  const gridPolygons = Array.from({ length: levels }, (_, levelIdx) => {
    const radius = (maxRadius / levels) * (levelIdx + 1);
    const points = Array.from({ length: n }, (_, i) => {
      const angle = startAngle + i * angleStep;
      const p = getPoint(angle, radius);
      return `${p.x},${p.y}`;
    }).join(" ");
    return points;
  });

  // Build axis lines
  const axisLines = Array.from({ length: n }, (_, i) => {
    const angle = startAngle + i * angleStep;
    const end = getPoint(angle, maxRadius);
    return { x1: cx, y1: cy, x2: end.x, y2: end.y };
  });

  // Build data polygon
  const dataPoints = categories.map((cat, i) => {
    const angle = startAngle + i * angleStep;
    const radius = (cat.score / 100) * maxRadius;
    const p = getPoint(angle, radius);
    return `${p.x},${p.y}`;
  }).join(" ");

  // Label positions (slightly beyond max radius)
  const labelRadius = maxRadius + 20;
  const labels = categories.map((cat, i) => {
    const angle = startAngle + i * angleStep;
    const p = getPoint(angle, labelRadius);

    // Text anchor based on position
    let textAnchor: "middle" | "start" | "end" = "middle";
    const normalizedX = Math.cos(angle);
    if (normalizedX > 0.1) textAnchor = "start";
    else if (normalizedX < -0.1) textAnchor = "end";

    // Vertical offset
    let dy = "0.35em";
    const normalizedY = Math.sin(angle);
    if (normalizedY < -0.5) dy = "0em";
    else if (normalizedY > 0.5) dy = "0.7em";

    return {
      x: p.x,
      y: p.y,
      text: cat.category,
      score: cat.score,
      textAnchor,
      dy,
    };
  });

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        role="img"
        aria-label="能力雷達圖"
      >
        {/* Grid polygons */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={`grid-${i}`}
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-slate-700"
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={`axis-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-slate-700"
          />
        ))}

        {/* Data polygon fill */}
        <polygon
          points={dataPoints}
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
          className="text-indigo-400"
        />

        {/* Data points */}
        {categories.map((cat, i) => {
          const angle = startAngle + i * angleStep;
          const radius = (cat.score / 100) * maxRadius;
          const p = getPoint(angle, radius);
          return (
            <circle
              key={`point-${i}`}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="currentColor"
              className="text-indigo-500"
            />
          );
        })}

        {/* Labels */}
        {labels.map((label, i) => (
          <text
            key={`label-${i}`}
            x={label.x}
            y={label.y}
            textAnchor={label.textAnchor}
            dy={label.dy}
            className="fill-muted-foreground text-[11px]"
            style={{ fontFamily: "var(--font-body), var(--font-cjk), system-ui, sans-serif" }}
          >
            {label.text}
          </text>
        ))}
      </svg>
    </div>
  );
}
