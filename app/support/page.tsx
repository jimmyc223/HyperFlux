"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "q1",
    question: "What is HyperFlux's return policy?",
    answer:
      "We offer a 30-day no-questions-asked return window on all products. Items must be unused and in original packaging. Once we receive your return, refunds are processed within 5–7 business days to your original payment method.",
  },
  {
    id: "q2",
    question: "How long does shipping take?",
    answer:
      "Standard shipping (3–5 business days) is free on all orders over $50. Express shipping (1–2 business days) is available for $12.99. International orders typically arrive within 7–14 business days depending on your location. All orders include a tracking number.",
  },
  {
    id: "q3",
    question: "What does the HyperFlux warranty cover?",
    answer:
      "All HyperFlux products come with a 2-year limited warranty covering manufacturing defects, hardware failures, and material failures under normal use. The warranty does not cover accidental damage, loss, or cosmetic wear. Register your product at registration.hyperflux.co within 30 days of purchase to activate your warranty.",
  },
  {
    id: "q4",
    question: "How do I set up GPS tracking on the Alpine?",
    answer:
      "Download the HyperFlux app (iOS and Android) and create an account. Hold the side button for 3 seconds to enter pairing mode — the LED ring will pulse blue. Open the app and tap 'Add Device'. Pairing completes in under 30 seconds. Your location history is stored for up to 90 days in the app.",
  },
  {
    id: "q5",
    question: "How do I use the self-heating feature on the Forest?",
    answer:
      "Press and hold the temperature button for 2 seconds. Use the + / - buttons to set your target temperature between 40°C and 80°C. The Forest will heat your liquid within 8–12 minutes depending on starting temperature. The LED ring pulses orange while heating and turns solid white when your target temperature is reached.",
  },
  {
    id: "q6",
    question: "Are HyperFlux products dishwasher safe?",
    answer:
      "The Forest bottle body is top-rack dishwasher safe. The lid and heating element cap should be hand-washed only. The Alpine backpack should not be machine-washed — spot clean with a damp cloth and mild soap, then air dry.",
  },
  {
    id: "q7",
    question: "Can I use the Forest at high altitude?",
    answer:
      "Yes. The Forest is tested and certified for use at altitudes up to 8,500 metres. The self-heating system automatically adjusts for reduced air pressure. Battery performance may decrease in temperatures below -20°C.",
  },
  {
    id: "q8",
    question: "Do you ship internationally?",
    answer:
      "Yes — we ship to over 50 countries. International orders may be subject to import duties and taxes which are the responsibility of the recipient. Shipping times and costs vary by destination and are calculated at checkout.",
  },
];

const policies = [
  {
    id: "shipping",
    title: "Shipping",
    icon: "→",
    items: [
      "Free standard shipping on orders over $50",
      "Standard: 3–5 business days",
      "Express: 1–2 business days ($12.99)",
      "International: 7–14 business days",
      "All orders include tracking",
    ],
  },
  {
    id: "returns",
    title: "Returns",
    icon: "↩",
    items: [
      "30-day return window, no questions asked",
      "Items must be unused and in original packaging",
      "Refunds processed within 5–7 business days",
      "Free return label included",
      "Exchanges available for size / colour",
    ],
  },
  {
    id: "warranty",
    title: "Warranty",
    icon: "◎",
    items: [
      "2-year limited warranty on all products",
      "Covers manufacturing and material defects",
      "Register within 30 days of purchase",
      "Does not cover accidental damage",
      "Extended warranty available at checkout",
    ],
  },
];

export default function SupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="px-6 pt-36 pb-16 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">
            Customer Support
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-none">
            How Can
            <br />
            We Help?
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-sm leading-relaxed">
            Browse our help topics below or send us a message — we aim to respond within
            one business day.
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="px-6 pb-16 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {policies.map((policy) => (
            <a
              key={policy.id}
              href={`#${policy.id}`}
              className="group block rounded-2xl border border-border p-6 hover:border-foreground transition-colors"
            >
              <span className="text-2xl text-muted-foreground group-hover:text-foreground transition-colors">
                {policy.icon}
              </span>
              <h3 className="mt-4 text-base font-medium text-foreground">{policy.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {policy.id === "shipping"
                  ? "Delivery times & tracking"
                  : policy.id === "returns"
                  ? "30-day hassle-free returns"
                  : "2-year product warranty"}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-16 border-t border-border md:px-12 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-10">
          Frequently Asked Questions
        </p>
        <div className="max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-base text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Policies */}
      <section className="px-6 py-16 border-t border-border md:px-12 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-12">
          Policies
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {policies.map((policy) => (
            <div key={policy.id} id={policy.id}>
              <h3 className="text-lg font-medium text-foreground mb-5">{policy.title}</h3>
              <ul className="space-y-3">
                {policy.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="text-foreground mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact"
        className="px-6 py-16 border-t border-border md:px-12 lg:px-20"
      >
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Contact Us
          </p>
          <h2 className="text-3xl font-medium text-foreground mb-10">Send Us a Message</h2>

          {submitted ? (
            <div className="rounded-2xl bg-secondary px-8 py-12 text-center">
              <p className="text-2xl font-medium text-foreground mb-2">Message Sent</p>
              <p className="text-sm text-muted-foreground">
                Thanks for reaching out. We&apos;ll be in touch within one business day.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What can we help you with?"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your issue or question in detail..."
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-foreground text-background text-sm font-medium py-3.5 rounded-full hover:opacity-80 transition-opacity"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
