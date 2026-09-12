/**
 * Viewport-fixed halftone field (Style Guide 01). Rendered once at the shell
 * so the field holds still while content scrolls; content must stack above
 * it at a higher z-index.
 *
 * Two variants: "default" (variant A) everywhere, "dye" (variant B, the
 * halftone over a faint mottled dye) for long reading surfaces -- guide
 * entries and project logs, per the style guide.
 */
export function Ground({ variant = "default" }: { variant?: "default" | "dye" }) {
  return (
    <div
      className={`app-ground fixed inset-0 z-0 ${variant === "dye" ? "app-ground--dye" : ""}`}
      aria-hidden="true"
    >
      <div className="app-ground__fine" />
      <div className="app-ground__coarse" />
    </div>
  );
}
