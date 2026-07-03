// Zero-JS pattern definitions shared by every CrossHatchOverlay instance.
// stroke uses the theme CSS var so the same pattern works in both themes.
export function SketchDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="crosshatch" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0,0 L8,8 M8,0 L0,8" stroke="var(--line-color)" strokeWidth="1" />
        </pattern>
      </defs>
    </svg>
  );
}
