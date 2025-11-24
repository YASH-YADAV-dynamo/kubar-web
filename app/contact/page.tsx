'use client';

import { FormEvent, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<{ state: SubmissionState; message: string | null }>({
    state: 'idle',
    message: null,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      lastName: (formData.get('lastName') ?? '').toString().trim(),
      firstName: (formData.get('firstName') ?? '').toString().trim(),
      email: (formData.get('email') ?? '').toString().trim(),
      phone: (formData.get('phone') ?? '').toString().trim(),
      message: (formData.get('message') ?? '').toString().trim(),
    };

    setStatus({ state: 'loading', message: 'Sending your request…' });

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result?.success) {
        throw new Error(result?.error ?? 'Unable to submit your demo request.');
      }

      form.reset();
      setStatus({
        state: 'success',
        message: 'Thanks for reaching out! Our team will contact you shortly with a tailored walkthrough.',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit your demo request right now.';
      setStatus({ state: 'error', message });
    }
  };

  return (
    <>
      <Header />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <h1>Book a Demo</h1>
            <p>Share a few details and our team will reach out with a tailored NavDhan walkthrough.</p>
          </div>
        </section>

        <section className="contact-form" id="contact-form">
          <div className="container">
            <div className="form-card">
              <form onSubmit={handleSubmit}>
                <div className="field-row">
                  <label className="field">
                    <span>First Name</span>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Asha"
                      required
                      maxLength={100}
                    />
                  </label>
                  <label className="field">
                    <span>Last Name</span>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Singh"
                      required
                      maxLength={100}
                    />
                  </label>
                </div>
                <label className="field">
                  <span>Email</span>
                  <input name="email" type="email" placeholder="you@company.com" required maxLength={255} />
                </label>
                <label className="field">
                  <span>Phone Number</span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    required
                    inputMode="tel"
                    pattern="[0-9]{10,}"
                    maxLength={20}
                  />
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your MSME lending workflow."
                    required
                    maxLength={2000}
                  ></textarea>
                </label>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status.state === 'loading'}
                  aria-busy={status.state === 'loading'}
                >
                  {status.state === 'loading' ? 'Sending…' : 'Submit'}
                </button>
                {status.state !== 'idle' && status.message && (
                  <p
                    className={`form-status ${status.state}`}
                    role={status.state === 'error' ? 'alert' : undefined}
                    aria-live={status.state === 'error' ? 'assertive' : 'polite'}
                  >
                    {status.message}
                  </p>
                )}
              </form>
              <aside className="contact-info">
                <h2>Need something specific?</h2>
                <p>Partner enquiries: <a href="mailto:partner@kubar.tech">partner@kubar.tech</a></p>
                <p>Support: <a href="mailto:support@kubar.tech">support@kubar.tech</a></p>
                <p>Media: <a href="mailto:press@kubar.tech">press@kubar.tech</a></p>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

