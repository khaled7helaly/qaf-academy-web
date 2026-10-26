/**
 * components/booking/BookingForm.jsx
 * Renders a form generated from form.config.js.
 * Schema is built by buildZodSchema(). No field-level code changes needed
 * when adding/removing fields in form.config.js.
 */

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function BookingForm({ serviceId, onSuccess, onError, submitLabel = "إرسال طلب الحجز" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { service: serviceId ?? "" },
  });

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
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="نموذج الحجز"
    >
      {/* Hidden service field */}
      <input type="hidden" {...register("service")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {formConfig.map((field) => renderField(field, register, errors))}
      </div>

      {/* General form error */}
      {errors.service && (
        <p role="alert" className="mt-3 text-sm text-[var(--color-error)]">
          {errors.service.message}
        </p>
      )}

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
