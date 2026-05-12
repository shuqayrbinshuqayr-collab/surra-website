/* ============================================================
   Store Page — سُرّة | SURRAH
   Design: Minimalist premium store — Apple/Tesla aesthetic
   Products sourced from:
     - hobal.sa/categories/1287039/canescollection (عصاك اللي ماتعصاك)
     - hobal.sa/categories/1325839/مجموعة-تيماء (مجموعة تيماء)
   ============================================================ */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'ManchetteFine', sans-serif";
const GOLD = "#C4622D";

type Product = {
  id: number;
  name: string;
  nameEn: string;
  price: string;
  currency: string;
  image: string;
  href: string;
  outOfStock: boolean;
  category: "canes" | "tayma";
  tag?: string;
};

const products: Product[] = [
  // ── مجموعة عصاك اللي ماتعصاك ──
  {
    id: 1,
    name: "عصا الصفصاف",
    nameEn: "Safsaf Cane",
    price: "800",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/873b5530-3f04-48c7-8ac4-c4ba2627372b-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D8%B9%D8%AA%D9%85-4",
    outOfStock: true,
    category: "canes",
    tag: "خشب الصفصاف",
  },
  {
    id: 2,
    name: "عصا العتم",
    nameEn: "Atam Cane",
    price: "780",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/8f93acc3-e150-46cb-b282-bb4e6004e218-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D8%B9%D8%AA%D9%85-3",
    outOfStock: true,
    category: "canes",
    tag: "خشب العتم",
  },
  {
    id: 3,
    name: "عصا العتم",
    nameEn: "Atam Cane",
    price: "550",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/864b8092-3eb9-4c55-bc57-34dc85654ff4-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D8%B9%D8%AA%D9%85-2",
    outOfStock: true,
    category: "canes",
    tag: "خشب العتم",
  },
  {
    id: 4,
    name: "عصا العتم",
    nameEn: "Atam Cane",
    price: "750",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/fa7c6b5c-8b38-4b77-b4bd-32c514eb54a1-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D8%B9%D8%AA%D9%85",
    outOfStock: true,
    category: "canes",
    tag: "خشب العتم",
  },
  {
    id: 5,
    name: "عصا اللوز المر",
    nameEn: "Bitter Almond Cane",
    price: "306",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/bf565109-740c-48cd-8272-a285dbc85bf9-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D9%84%D9%88%D8%B2-%D8%A7%D9%84%D9%85%D8%B1-3",
    outOfStock: true,
    category: "canes",
    tag: "خشب اللوز المر",
  },
  {
    id: 6,
    name: "عصا اللوز المر",
    nameEn: "Bitter Almond Cane",
    price: "306",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/f63f67a6-4e66-4704-bc0d-8cd5b0d472cf-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D9%84%D9%88%D8%B2-%D8%A7%D9%84%D9%85%D8%B1-2",
    outOfStock: true,
    category: "canes",
    tag: "خشب اللوز المر",
  },
  {
    id: 7,
    name: "عصا اللوز المر",
    nameEn: "Bitter Almond Cane",
    price: "306",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/050075e1-4772-4fb1-b3b7-a352d27481c2-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D9%84%D9%88%D8%B2-%D8%A7%D9%84%D9%85%D8%B1-1",
    outOfStock: true,
    category: "canes",
    tag: "خشب اللوز المر",
  },
  {
    id: 8,
    name: "عصا اللوز المر",
    nameEn: "Bitter Almond Cane",
    price: "306",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/f96eece0-3adb-48a5-9367-74aabc3b9e05-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D9%84%D9%88%D8%B2-%D8%A7%D9%84%D9%85%D8%B1",
    outOfStock: true,
    category: "canes",
    tag: "خشب اللوز المر",
  },
  {
    id: 9,
    name: "عصا العتم",
    nameEn: "Atam Cane",
    price: "400",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/3689dd93-9062-4380-ac28-7e5bb981698a-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D8%B9%D8%AA%D9%85-1",
    outOfStock: true,
    category: "canes",
    tag: "خشب العتم",
  },
  // ── مجموعة تيماء ──
  {
    id: 10,
    name: "حامل أوراق",
    nameEn: "Paper Holder",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/0a27f5a4-3266-4685-b029-1f448a30e1b2-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D8%AD%D8%A7%D9%85%D9%84-%D8%A3%D9%88%D8%B1%D8%A7%D9%82-2",
    outOfStock: false,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 11,
    name: "Cane",
    nameEn: "Cane",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/dfc5b467-ed59-4c51-9a79-fd3857ebf9eb-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/cane",
    outOfStock: false,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 12,
    name: "قواعد أكواب",
    nameEn: "Cup Coasters",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/f1a7b6a5-e8c0-4432-8d20-3ae04bfa8c5d-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D9%82%D9%88%D8%A7%D8%B9%D8%AF-%D8%A3%D9%83%D9%88%D8%A7%D8%A8",
    outOfStock: false,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 13,
    name: "لوحة",
    nameEn: "Wall Art",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/778c2b64-f60a-4cf7-8675-d4aaa7f47fab-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D9%84%D9%88%D8%AD%D8%A9-2",
    outOfStock: false,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 14,
    name: "بِساط مكتبي",
    nameEn: "Desk Mat",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/41f4b592-0db7-4bc8-abd7-1b64d5333753-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D8%A8%D8%B3%D8%A7%D8%B7-%D9%85%D9%83%D8%AA%D8%A8%D9%8A",
    outOfStock: false,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 15,
    name: "حامل أوراق",
    nameEn: "Paper Holder",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/11bc3f41-8bbf-4f44-92cd-a3b9bd48038c-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D8%AD%D8%A7%D9%85%D9%84-%D8%A3%D9%88%D8%B1%D8%A7%D9%82-1",
    outOfStock: false,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 16,
    name: "لوحة",
    nameEn: "Wall Art",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/b2cc6166-8201-49e0-ab70-3d1659c2f203-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D9%84%D9%88%D8%AD%D8%A9-1",
    outOfStock: false,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 17,
    name: "لوحة",
    nameEn: "Wall Art",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/15e8ed42-8052-413f-9427-7911b7096836-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D9%84%D9%88%D8%AD%D8%A9",
    outOfStock: false,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 18,
    name: "حامل أقلام",
    nameEn: "Pen Holder",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/a60f4f08-6875-4d6b-82ea-18af42dcce75-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D8%AD%D8%A7%D9%85%D9%84-%D8%A3%D9%82%D9%84%D8%A7%D9%85",
    outOfStock: true,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
  {
    id: 19,
    name: "حامل أوراق",
    nameEn: "Paper Holder",
    price: "",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/f6802cc2-e57b-4e31-9346-fc3f7d2caa4a-thumbnail-1000x1000-70.jpg",
    href: "https://hobal.sa/products/%D8%AD%D8%A7%D9%85%D9%84-%D8%A3%D9%88%D8%B1%D8%A7%D9%82",
    outOfStock: true,
    category: "tayma",
    tag: "مجموعة تيماء",
  },
];

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: "var(--surrah-section-bg)",
        border: `1px solid ${hovered ? "rgba(196,98,45,0.4)" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#111" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: product.outOfStock ? "grayscale(30%)" : "none",
          }}
          loading="lazy"
        />
        {/* Category badge */}
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: product.category === "tayma" ? "rgba(196,98,45,0.9)" : "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          padding: "3px 10px",
          fontSize: "0.65rem",
          fontFamily: F,
          fontWeight: 600,
          color: "var(--surrah-text-primary)",
          letterSpacing: "0.05em",
        }}>
          {product.tag}
        </div>
        {/* Out of stock overlay */}
        {product.outOfStock && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: F,
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.15em",
              background: "rgba(0,0,0,0.6)",
              padding: "6px 16px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              نفدت الكمية
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: "1.25rem" }}>
        <h3 style={{
          fontFamily: F,
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--surrah-text-primary)",
          marginBottom: "0.4rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {product.price ? (
            <span style={{
              fontFamily: F,
              fontSize: "0.95rem",
              fontWeight: 700,
              color: GOLD,
            }}>
              {product.price} {product.currency}
            </span>
          ) : (
            <span style={{
              fontFamily: F,
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.05em",
            }}>
              السعر عند الطلب
            </span>
          )}
          <span style={{
            fontFamily: F,
            fontSize: "0.7rem",
            color: hovered ? GOLD : "rgba(255,255,255,0.3)",
            transition: "color 0.2s",
            letterSpacing: "0.05em",
          }}>
            {product.outOfStock ? "—" : "اطلب الآن ↗"}
          </span>
        </div>
      </div>
    </a>
  );
}

const FILTERS = [
  { key: "all", label: "الكل" },
  { key: "canes", label: "عصاك اللي ماتعصاك" },
  { key: "tayma", label: "مجموعة تيماء" },
];

export default function Store() {
  const [activeFilter, setActiveFilter] = useState<"all" | "canes" | "tayma">("all");

  const filtered = activeFilter === "all" ? products : products.filter(p => p.category === activeFilter);

  return (
    <div style={{ background: "var(--surrah-page-bg)", minHeight: "100vh", direction: "rtl" }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position: "relative",
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "96px",
      }}>
        {/* Background gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(196,98,45,0.12) 0%, transparent 70%), #000000",
        }} />
        {/* Subtle grid lines */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 1rem" }}>
          <p style={{
            fontFamily: F,
            fontSize: "0.7rem",
            fontWeight: 600,
            color: GOLD,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            SURRAH × HOBAL
          </p>
          <h1 style={{
            fontFamily: F,
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--surrah-text-primary)",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            متجر سُرّة
          </h1>
          <p style={{
            fontFamily: F,
            fontWeight: 400,
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "560px",
            margin: "0 auto 2rem",
            lineHeight: 1.9,
          }}>
            منتجات مختارة بعناية من شركائنا في هُوبَال — تجمع بين الأصالة السعودية والتصميم المعاصر.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://hobal.sa/categories/1287039/canescollection"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: F,
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                letterSpacing: "0.1em",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "0.6rem 1.4rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              عصاك اللي ماتعصاك ↗
            </a>
            <a
              href="https://hobal.sa/categories/1325839/%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9-%D8%AA%D9%8A%D9%85%D8%A7%D8%A1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: F,
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                letterSpacing: "0.1em",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "0.6rem 1.4rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              مجموعة تيماء ↗
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section style={{ background: "var(--surrah-page-bg)", padding: "4rem 0 7rem" }}>
        <div className="container">
          {/* Filter Tabs */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key as typeof activeFilter)}
                style={{
                  fontFamily: F,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: activeFilter === f.key ? "#000000" : "rgba(255,255,255,0.5)",
                  background: activeFilter === f.key ? GOLD : "transparent",
                  border: `1px solid ${activeFilter === f.key ? GOLD : "rgba(255,255,255,0.15)"}`,
                  padding: "0.5rem 1.4rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== f.key) {
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== f.key) {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  }
                }}
              >
                {f.label}
              </button>
            ))}
            <span style={{
              marginRight: "auto",
              fontFamily: F,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.3)",
            }}>
              {filtered.length} منتج
            </span>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: "4rem",
            padding: "2rem",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "var(--surrah-section-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <div>
              <p style={{ fontFamily: F, fontSize: "0.9rem", fontWeight: 600, color: "var(--surrah-text-primary)", marginBottom: "0.25rem" }}>
                هُوبَال — Hobal
              </p>
              <p style={{ fontFamily: F, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>
                صُمم وصُنع في المملكة العربية السعودية · جميع حقوق المنتجات محفوظة لهُوبَال
              </p>
            </div>
            <a
              href="https://hobal.sa"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: F,
                fontSize: "0.8rem",
                fontWeight: 600,
                color: GOLD,
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              hobal.sa ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
