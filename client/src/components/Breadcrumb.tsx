/* ============================================================
   Breadcrumb — مسار التنقل — سُرّة
   Fixed bar that always sits directly below the fixed Navbar (96px).
   Pages must add paddingTop: "140px" (96 navbar + 44 breadcrumb) to their
   first content section so content doesn't hide behind both bars.
   ============================================================ */

import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <>
      {/* Fixed breadcrumb bar — sits below the fixed Navbar */}
      <nav
        aria-label="مسار التنقل"
        dir="rtl"
        style={{
          position: "fixed",
          top: "96px",
          right: 0,
          left: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.35rem",
          padding: "0.6rem 1.5rem",
          background: "rgba(8,8,8,0.97)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(196,98,45,0.3)",
          fontFamily: "'ManchetteFine', sans-serif",
          fontSize: "clamp(0.78rem, 2vw, 0.9rem)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span
              key={index}
              style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
            >
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
              {isLast || !item.href ? (
                <span style={{ color: "#C4622D", fontWeight: 600 }}>
                  {item.label}
                </span>
              ) : (
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
                    ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.72)")
                  }
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
      {/* Spacer: pushes page content below both fixed bars (96px navbar + ~44px breadcrumb) */}
      <div style={{ height: "140px" }} aria-hidden="true" />
    </>
  );
}
