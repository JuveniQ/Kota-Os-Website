import { useState } from "react";
import { CONTACT_INFO } from "@/data/site-config";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [error, setError] = useState("");

  function onChange<K extends keyof FormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    if (!values.name || !values.email || !values.subject || !values.message) {
      return "Please complete all fields before sending.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validate();
    setError(validation);
    if (validation) return;

    const body = `Name: ${values.name}%0D%0AEmail: ${values.email}%0D%0A%0D%0A${encodeURIComponent(
      values.message
    )}`;
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
      values.subject
    )}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-brand-border bg-white p-6 shadow-card">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-brand-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          className="focus-ring min-h-12 w-full rounded-xl border border-brand-border px-3 text-base"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-brand-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => onChange("email", event.target.value)}
          className="focus-ring min-h-12 w-full rounded-xl border border-brand-border px-3 text-base"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1 block text-sm font-semibold text-brand-foreground"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={(event) => onChange("subject", event.target.value)}
          className="focus-ring min-h-12 w-full rounded-xl border border-brand-border px-3 text-base"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-semibold text-brand-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => onChange("message", event.target.value)}
          className="focus-ring w-full rounded-xl border border-brand-border px-3 py-2 text-base"
        />
      </div>

      {error ? <p className="text-sm text-brand-destructive">{error}</p> : null}

      <button type="submit" className="btn-primary w-full">
        Send Message
      </button>
    </form>
  );
}
