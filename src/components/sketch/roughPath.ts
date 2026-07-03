/** SVG path `d` string for a rounded rectangle, radius clamped so it also covers full pill shapes. */
export function roundedRectPath(width: number, height: number, radius: number): string {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  return [
    `M ${r} 0`,
    `L ${width - r} 0`,
    `A ${r} ${r} 0 0 1 ${width} ${r}`,
    `L ${width} ${height - r}`,
    `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
    `L ${r} ${height}`,
    `A ${r} ${r} 0 0 1 0 ${height - r}`,
    `L 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    "Z",
  ].join(" ");
}

/** SVG path `d` string for a horizontal line through the vertical center — rough.js's own roughness gives it the hand-drawn wobble. */
export function horizontalLinePath(width: number, height: number): string {
  const y = height / 2;
  return `M 0 ${y} L ${width} ${y}`;
}
