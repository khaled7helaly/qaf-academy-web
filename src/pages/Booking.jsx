/**
 * pages/Booking.jsx
 * Booking page:
 * - Reads ?service=<id> from URL
 * - Shows ServiceSummary (sticky sidebar on desktop)
 * - Falls back to a service dropdown if service is missing/invalid
 * - Renders BookingForm (generated from form.config.js)
 * - On submit: POSTs to Apps Script, then shows success state with WhatsApp link
 */

import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Home, AlertCircle, ArrowRight } from "lucide-react";
import siteConfig from "@config/site.config";
import services from "@content/services";
import bookingContent from "@content/booking";
import { submitLead }       from "@utils/submitLead";
import { buildWhatsAppUrl } from "@utils/whatsapp";
import BookingForm          from "@components/booking/BookingForm";
import ServiceSummary       from "@components/booking/ServiceSummary";
import Container            from "@components/ui/Container";
import Button               from "@components/ui/Button";
import Select               from "@components/ui/Select";

// Merge trial service into the selectable list if trial is enabled
const allServices = siteConfig.trial.enabled
  ? [...services, { ...bookingContent.trial }]
  : services;

const serviceOptions = allServices.map((s) => ({ value: s.id, label: s.name }));


export default function Booking() {
  const [searchParams]        = useSearchParams();
  const urlServiceId          = searchParams.get("service") ?? "";
  const [selectedId, setSelectedId] = useState(urlServiceId);
  const [submitState, setSubmitState] = useState("idle");
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const resolvedService = useMemo(
    () => allServices.find((s) => s.id === selectedId) ?? null,
    [selectedId]
  );

  const handleSuccess = async (formData) => {
    const payload = { ...formData, service: selectedId };

    // Block honeypot submissions
    if (formData.website) return;

    await submitLead(payload);
    setSubmittedData(formData);
    setSubmitState("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleError = (err) => {
    console.error("[Booking] submit error", err);
    setErrorMsg(err?.message ?? "خطأ غير معروف");
    setSubmitState("error");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = useMemo(() => {
    if (!submittedData) return "#";
    return buildWhatsAppUrl(submittedData, resolvedService?.name ?? selectedId);
  }, [submittedData, resolvedService, selectedId]);

  return (
    <main
      id="booking-page"
      className="min-h-screen pt-24 pb-16 bg-[var(--color-bg-base)]"
    >
      <Container>
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-8"
        >
          <ArrowRight size={14} />
          {bookingContent.backLink}
        </Link>

        <AnimatePresence mode="wait">
          {/* ── SUCCESS ───────────────────────────────────── */}
          {submitState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h1
                className="text-3xl font-black text-[var(--color-primary)] mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {bookingContent.success.heading}
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                {bookingContent.success.body}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="accent" size="lg">
                    <MessageCircle size={18} />
                    {bookingContent.success.whatsapp}
                  </Button>
                </a>
                <Link to="/">
                  <Button variant="ghost" size="lg">
                    <Home size={18} />
                    {bookingContent.success.backHome}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── ERROR ────────────────────────────────────── */}
          {submitState === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto text-center py-12"
            >
              <AlertCircle size={48} className="mx-auto mb-4 text-[var(--color-error)]" />
              <h1 className="text-2xl font-bold text-[var(--color-error)] mb-2">
                {bookingContent.error.heading}
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-2">{bookingContent.error.body}</p>
              {errorMsg && (
                <p className="text-xs text-[var(--color-text-muted)] mb-6 font-mono">{errorMsg}</p>
              )}
              <Button onClick={() => setSubmitState("idle")}>
                {bookingContent.error.retry}
              </Button>
            </motion.div>
          )}

          {/* ── FORM ─────────────────────────────────────── */}
          {submitState === "idle" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Page header */}
              <div className="mb-8 text-center">
                <h1
                  className="text-3xl md:text-4xl font-black text-[var(--color-primary)] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {bookingContent.pageTitle}
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                  {bookingContent.pageSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Form area */}
                <div className="lg:col-span-2">
                  {/* Service fallback dropdown */}
                  {!resolvedService && (
                    <div className="mb-6">
                      <Select
                        id="service-select"
                        label={bookingContent.fallbackLabel}
                        required
                        options={serviceOptions}
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="bg-[var(--color-bg-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] p-6 md:p-8">
                    <BookingForm
                      serviceId={selectedId}
                      onSuccess={handleSuccess}
                      onError={handleError}
                      submitLabel={bookingContent.submitButton}
                    />
                  </div>
                </div>

                {/* Sidebar summary */}
                <div className="lg:col-span-1">
                  {resolvedService ? (
                    <ServiceSummary service={resolvedService} />
                  ) : (
                    <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-bg-muted)] border border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
                      اختر خدمة لعرض التفاصيل
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
