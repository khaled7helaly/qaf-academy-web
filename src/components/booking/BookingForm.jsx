/**
 * components/booking/BookingForm.jsx
 * Renders a form generated from form.config.js.
 * Schema is built by buildZodSchema(). No field-level code changes needed
 * when adding/removing fields in form.config.js.
 */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import formConfig from "@config/form.config";
import { buildZodSchema } from "@utils/buildZodSchema";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Textarea from "@components/ui/Textarea";
import Button from "@components/ui/Button";

const schema = buildZodSchema();

function renderField(field, register, errors) {
  const { id, label, type, placeholder, required, options, rows, honeypot } = field;
  const error = errors[id]?.message;

  // Honeypot – render off-screen, no label
  if (honeypot) {
    return (
      <div key={id} className="absolute -top-[9999px] -start-[9999px]" aria-hidden="true" tabIndex={-1}>
        <input
          id={`field-${id}`}
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register(id)}
        />
      </div>
    );
  }

  const colClass = field.colSpan === "full" ? "sm:col-span-2" : "";

  let fieldEl;
  switch (type) {
    case "select":
      fieldEl = (
        <Select
          id={`field-${id}`}
          label={label}
          error={error}
          required={required}
          options={options}
          {...register(id)}
        />
      );
      break;
    case "textarea":
      fieldEl = (
        <Textarea
          id={`field-${id}`}
          label={label}
          error={error}
          required={required}
          placeholder={placeholder}
          rows={rows ?? 4}
          {...register(id)}
        />
      );
      break;
    default:
      fieldEl = (
        <Input
          id={`field-${id}`}
          label={label}
          type={type}
          error={error}
          required={required}
          placeholder={placeholder}
          {...register(id)}
        />
      );
  }

  return (
    <div key={id} className={colClass}>
      {fieldEl}
    </div>
  );
}

export default function BookingForm({
  serviceId,
  onSuccess,
  onError,
  submitLabel = "إرسال طلب الحجز",
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { service: serviceId ?? "" },
  });

  /*
   * `defaultValues` is only read once — on mount. When the selected service
   * changes afterwards (URL change, or picking one from the fallback
   * dropdown), it must be pushed into RHF explicitly; otherwise the hidden
   * `service` field stays empty and submit fails with "اختر خدمة".
   */
  useEffect(() => {
    setValue("service", serviceId ?? "", {
      // Only validate when a service is actually set, so the form doesn't
      // show "اختر خدمة" before the user has submitted anything.
      shouldValidate: Boolean(serviceId),
    });
  }, [serviceId, setValue]);

  /* Focus + scroll to the first invalid field on a failed submit */
  const focusFirstError = (formErrors) => {
    const firstKey = Object.keys(formErrors ?? {})[0];
    if (!firstKey) return;

    const el =
      document.getElementById(`field-${firstKey}`) ||
      (firstKey === "service"
        ? document.getElementById("service-select")
        : null);

    if (el && typeof el.focus === "function") {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const onSubmit = async (data) => {
    try {
      await onSuccess(data);
    } catch (err) {
      onError?.(err);
    }
  };

  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit(onSubmit, focusFirstError)}
      noValidate
      aria-label="نموذج الحجز"
    >
      {/* Hidden service field – kept in sync with the selected service */}
      <input type="hidden" id="field-service" {...register("service")} />

      {/* Service-level error (only shown when no service is selected) */}
      {errors.service && (
        <p
          role="alert"
          aria-live="polite"
          className="mb-5 flex items-start gap-2 rounded-[var(--radius-md)] border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 px-3 py-2 text-sm font-medium text-[var(--color-error)]"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          {errors.service.message}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {formConfig.map((field) => renderField(field, register, errors))}
      </div>

      <div className="mt-8">
        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          id="booking-submit-btn"
        >
          {submitLabel}
        </Button>
      </div>

      <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
        بياناتك محمية ولن تُشارَك مع أي طرف ثالث.
      </p>
    </form>
  );
}
