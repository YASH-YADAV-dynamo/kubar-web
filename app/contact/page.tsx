'use client';

import { FormEvent, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phoneNumber: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your demo request has been submitted successfully. Our team will reach out to you soon.',
        });
        // Reset form
        e.currentTarget.reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit your request. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while submitting your request. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
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
                    <span>Last Name</span>
                    <input name="lastName" type="text" placeholder="Singh" required />
                  </label>
                  <label className="field">
                    <span>First Name</span>
                    <input name="firstName" type="text" placeholder="Asha" required />
                  </label>
                </div>
                <label className="field">
                  <span>Email</span>
                  <input name="email" type="email" placeholder="you@company.com" required />
                </label>
                <label className="field">
                  <span>Phone Number</span>
                  <input name="phone" type="tel" placeholder="9876543210" pattern="[0-9]{10,}" />
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea name="message" rows={4} placeholder="Tell us about your MSME lending workflow."></textarea>
                </label>
                
                {submitStatus.type && (
                  <div className={`form-message ${submitStatus.type === 'success' ? 'success' : 'error'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
              <aside className="contact-info">
                <h2>Need something specific?</h2>
                <p>Partner enquiries: <a href="mailto:partner@navdhan.com">partner@navdhan.com</a></p>
                <p>Support: <a href="mailto:support@navdhan.com">support@navdhan.com</a></p>
                <p>Media: <a href="mailto:press@navdhan.com">press@navdhan.com</a></p>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

