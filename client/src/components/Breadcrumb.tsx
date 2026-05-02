/* ============================================================
   Breadcrumb — مسار التنقل — سُرّة
   Shows the full navigation path so users can go back to any previous page.
   Example: الرئيسية ← مجتمعاتنا ← بصر
   Theme: Black background, white text, orange accent #C4622D
   ============================================================ */

import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href?: string; // if omitted, this is the current (non-clickable) page
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="مسار التنقل"
      dir="rtl"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.35rem",
        padding: "0.6rem 1.5rem",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(196,98,45,0.18)",
        fontFamily: "'ManchetteFine', sans-serif",
        fontSize: "clamp(0.78rem, 2vw, 0.92rem)",
        position: "relative",
        zIndex: 10,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
          >
            {/* Separator arrow — shown before every item except the first */}
            {index > 0 && (
              <span
                style={{
                  color: "rgba(196,98,45,0.6)",
                  fontSize: "0.75rem",
                  userSelect: "none",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                ←
              </span>
            )}

            {/* Current page: plain text, highlighted */}
            {isLast || !item.href ? (
              <span
                style={{
                  color: "#C4622D",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                {item.label}
              </span>
            ) : (
              /* Ancestor page: clickable link */
              <Link
                href={item.href}
                style={{
                  color: "rgba(255,255,255,0.72)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#C4622D")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.72)")
                }
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
