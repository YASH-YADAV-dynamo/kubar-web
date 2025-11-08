'use client';

import { FormEvent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic can be added here
    alert('Form submitted! (This is a demo - form submission needs to be implemented)');
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
                  <input name="phone" type="tel" placeholder="9876543210" required pattern="[0-9]{10,}" />
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea name="message" rows={4} placeholder="Tell us about your MSME lending workflow." required></textarea>
                </label>
                <button type="submit" className="btn btn-primary">Submit</button>
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

