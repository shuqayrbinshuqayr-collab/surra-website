/* ============================================================
   Store Page — سُرّة | SURRAH
   Design: Minimalist premium store — Apple/Tesla aesthetic
   Products sourced from hobal.sa/categories/1287039/canescollection
   ============================================================ */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'ManchetteFine', sans-serif";
const GOLD = "#C4622D";

const products = [
  {
    id: 1,
    name: "عصا الصفصاف",
    nameEn: "Safsaf Cane",
    price: "800",
    currency: "ر.س",
    image: "https://media.zid.store/thumbs/63758265-3f10-4f41-823d-e71819b4a9ad/873b5530-3f04-48c7-8ac4-c4ba2627372b-thumbnail-1000x1000.png",
    href: "https://hobal.sa/products/%D8%B9%D8%B5%D8%A7-%D8%A7%D9%84%D8%B9%D8%AA%D9%85-4",
    outOfStock: true,
    wood: "خشب الصفصاف",
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
    wood: "خشب العتم",
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
    wood: "خشب العتم",
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
    wood: "خشب العتم",
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
    wood: "خشب اللوز المر",
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
    wood: "خشب اللوز المر",
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
    wood: "خشب اللوز المر",
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
    wood: "خشب اللوز المر",
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
    wood: "خشب العتم",
  },
];

function ProductCard({ product }: { product: typeof products[0] }) {
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
        background: "#0d0d0d",
        border: `1px solid ${hovered ? "rgba(196,98,45,0.4)" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "0 2px 12px rgba(0,0,0,0.3)",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#f5f0ea" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            padding: "1.5rem",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {product.outOfStock && (
          <div style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(0,0,0,0.75)",
            color: "rgba(255,255,255,0.7)",
            fontFamily: F,
            fontSize: "0.7rem",
            fontWeight: 600,
            padding: "4px 10px",
            letterSpacing: "0.05em",
          }}>
            نفدت الكمية
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
        <p style={{
          fontFamily: F,
          fontSize: "0.65rem",
          fontWeight: 600,
          color: GOLD,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "0.4rem",
        }}>
          {product.wood}
        </p>
        <h3 style={{
          fontFamily: F,
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "0.75rem",
          whiteSpace: "nowrap",
        }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: F,
            fontSize: "1.1rem",
            fontWeight: 700,
            color: product.outOfStock ? "rgba(255,255,255,0.35)" : "#ffffff",
          }}>
            {product.price} {product.currency}
          </span>
          <span style={{
            fontFamily: F,
            fontSize: "0.75rem",
            fontWeight: 500,
            color: hovered ? GOLD : "rgba(255,255,255,0.45)",
            transition: "color 0.2s",
            letterSpacing: "0.05em",
          }}>
            عرض التفاصيل ←
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Store() {
  return (
    <div style={{ background: "#000000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          paddingTop: "160px",
          paddingBottom: "80px",
          background: "#000000",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Decorative background text */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: F,
          fontSize: "clamp(6rem, 18vw, 18rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.02)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.02em",
        }}>
          STORE
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
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
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            عصاك اللي ماتعصاك
          </h1>
          <p style={{
            fontFamily: F,
            fontWeight: 400,
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "520px",
            margin: "0 auto 2rem",
            lineHeight: 1.9,
          }}>
            مجموعة عصي يدوية الصنع من أجود أخشاب المملكة العربية السعودية — صُنعت بأيدٍ سعودية وتحمل روح الأصالة.
          </p>
          <a
            href="https://hobal.sa/categories/1287039/canescollection"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: F,
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              letterSpacing: "0.1em",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "0.6rem 1.5rem",
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
            زيارة المتجر الرسمي على هُوبَال
            <span style={{ fontSize: "0.75rem" }}>↗</span>
          </a>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ background: "#000000", padding: "5rem 0 7rem" }}>
        <div className="container">
          {/* Section label */}
          <div style={{ marginBottom: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ width: "40px", height: "2px", background: GOLD, marginBottom: "1rem" }} />
              <h2 style={{
                fontFamily: F,
                fontWeight: 900,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                color: "#ffffff",
              }}>
                المجموعة الكاملة
              </h2>
            </div>
            <p style={{
              fontFamily: F,
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 400,
            }}>
              {products.length} منتج · جميع المنتجات تُشحن من المتجر الرسمي هُوبَال
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: "4rem",
            padding: "2rem",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <div>
              <p style={{ fontFamily: F, fontSize: "0.9rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.25rem" }}>
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
