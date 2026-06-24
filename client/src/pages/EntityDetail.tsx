import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, Globe, Mail, Phone, MapPin, ArrowRight, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GOLD = "#C4622D";
const DARK_BG = "#0a0a0a";
const BORDER = "rgba(255, 255, 255, 0.06)";

export default function EntityDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const entityId = id ? Number(id) : null;

  const { data: entity, isLoading, error } = trpc.directory.getById.useQuery(
    { id: entityId! },
    { enabled: !!entityId }
  );

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      navigate("/directory");
    }
  }, [error, navigate]);

  if (!entityId) {
    return (
      <div style={{ background: DARK_BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>معرّف الجهة غير صحيح</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ background: DARK_BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader2 className="h-8 w-8 text-[#C4622D] animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !entity) {
    return (
      <div style={{ background: DARK_BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#ff6b6b" }}>حدث خطأ في تحميل بيانات الجهة</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse socialLinks if it's a JSON string
  let contactInfo = { contactName: "", contactRole: "", linkedin: "" };
  if (entity.socialLinks) {
    try {
      contactInfo = JSON.parse(entity.socialLinks);
    } catch (e) {
      // Ignore parse errors
    }
  }

  return (
    <div style={{ background: DARK_BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1rem 0" }}>
        <div className="container">
          <button
            onClick={() => navigate("/directory")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: GOLD,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الدليل
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "3rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            {/* Left: Logo & Basic Info */}
            <div>
              {/* Logo */}
              {entity.logoUrl && (
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: `1px solid ${BORDER}`,
                    borderRadius: "1rem",
                    padding: "2rem",
                    marginBottom: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "200px",
                  }}
                >
                  <img
                    src={entity.logoUrl}
                    alt={entity.nameAr}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              {/* Category Badge */}
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: `${GOLD}20`,
                    color: GOLD,
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {entity.category}
                </span>
              </div>

              {/* Entity Type */}
              {entity.entityType && (
                <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  نوع الجهة: <span style={{ color: "white" }}>{entity.entityType}</span>
                </p>
              )}

              {/* City & Country */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
                {entity.city && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255, 255, 255, 0.6)" }}>
                    <MapPin className="h-4 w-4" />
                    {entity.city}
                  </div>
                )}
                {entity.country && (
                  <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    {entity.country}
                  </div>
                )}
              </div>

              {/* Founded Year */}
              {entity.foundedYear && (
                <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "2rem" }}>
                  تأسست عام {entity.foundedYear}
                </p>
              )}
            </div>

            {/* Right: Details */}
            <div>
              {/* Name */}
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                {entity.nameAr}
              </h1>

              {/* English Name */}
              {entity.nameEn && (
                <p
                  style={{
                    fontSize: "1.125rem",
                    color: GOLD,
                    marginBottom: "2rem",
                    direction: "ltr",
                  }}
                >
                  {entity.nameEn}
                </p>
              )}

              {/* Description */}
              {entity.descriptionAr && (
                <div style={{ marginBottom: "2rem" }}>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "white", marginBottom: "1rem" }}>
                    عن الجهة
                  </h2>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.8,
                      fontSize: "1rem",
                    }}
                  >
                    {entity.descriptionAr}
                  </p>
                </div>
              )}

              {/* Tags */}
              {entity.tags && (
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: GOLD, marginBottom: "0.75rem", textTransform: "uppercase" }}>
                    المجالات
                  </h3>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {JSON.parse(entity.tags).map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: `1px solid ${BORDER}`,
                          color: "rgba(255, 255, 255, 0.7)",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.5rem",
                          fontSize: "0.875rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              background: "rgba(255, 255, 255, 0.02)",
              border: `1px solid ${BORDER}`,
              borderRadius: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "white", marginBottom: "1.5rem" }}>
              معلومات التواصل
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {/* Direct Contact */}
              {entity.phone && (
                <div>
                  <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    رقم التواصل المباشر
                  </p>
                  <a
                    href={`tel:${entity.phone}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: GOLD,
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    {entity.phone}
                  </a>
                </div>
              )}

              {/* Email */}
              {entity.contactEmail && (
                <div>
                  <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    البريد الإلكتروني
                  </p>
                  <a
                    href={`mailto:${entity.contactEmail}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: GOLD,
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    <Mail className="h-4 w-4" />
                    {entity.contactEmail}
                  </a>
                </div>
              )}

              {/* Website */}
              {entity.website && (
                <div>
                  <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    الموقع الإلكتروني
                  </p>
                  <a
                    href={entity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: GOLD,
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    <Globe className="h-4 w-4" />
                    زيارة الموقع
                  </a>
                </div>
              )}

              {/* Address */}
              {entity.address && (
                <div>
                  <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    العنوان
                  </p>
                  <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1rem" }}>
                    {entity.address}
                  </p>
                </div>
              )}

              {/* Contact Person */}
              {contactInfo.contactName && (
                <div>
                  <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    جهة التواصل
                  </p>
                  <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1rem" }}>
                    {contactInfo.contactName}
                    {contactInfo.contactRole && ` - ${contactInfo.contactRole}`}
                  </p>
                </div>
              )}

              {/* Social Links */}
              {(entity.instagram || entity.twitter || contactInfo.linkedin) && (
                <div>
                  <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    وسائل التواصل الاجتماعي
                  </p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    {entity.instagram && (
                      <a
                        href={`https://instagram.com/${entity.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: GOLD, textDecoration: "none", fontSize: "0.875rem" }}
                      >
                        Instagram
                      </a>
                    )}
                    {entity.twitter && (
                      <a
                        href={`https://twitter.com/${entity.twitter.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: GOLD, textDecoration: "none", fontSize: "0.875rem" }}
                      >
                        Twitter
                      </a>
                    )}
                    {contactInfo.linkedin && (
                      <a
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: GOLD, textDecoration: "none", fontSize: "0.875rem" }}
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity & Partnership Levels */}
          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {entity.activityLevel && (
              <div
                style={{
                  padding: "1.5rem",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "0.75rem",
                }}
              >
                <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  مستوى النشاط
                </p>
                <p style={{ color: "white", fontSize: "1rem", fontWeight: 500 }}>
                  {entity.activityLevel}
                </p>
              </div>
            )}
            {entity.partnershipLevel && (
              <div
                style={{
                  padding: "1.5rem",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "0.75rem",
                }}
              >
                <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  مستوى الشراكة
                </p>
                <p style={{ color: "white", fontSize: "1rem", fontWeight: 500 }}>
                  {entity.partnershipLevel}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
