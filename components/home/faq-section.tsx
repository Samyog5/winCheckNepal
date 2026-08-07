"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I check if my coupon number has won?",
    answer:
      "Enter your coupon number (e.g. IRD-88219) into the Manual Coupon Check box or upload your coupon screenshot to instantly query official IRD published winner records.",
  },
  {
    question: "Where can I find my coupon number?",
    answer:
      "Your coupon number is printed on your official IRD taxpayer incentive receipt issued during qualifying transactions.",
  },
  {
    question: "How long do I have to claim my cash prize if I win?",
    answer:
      "Winners must present their winning coupon and citizenship certificate to their local IRD office within 35 days of official draw result publication.",
  },
  {
    question: "Can I upload a screenshot of my coupon ticket?",
    answer:
      "Yes! You can drag and drop or browse your coupon image (PNG, JPG, JPEG up to 5MB) under the Upload Screenshot tab.",
  },
  {
    question: "What documents are required to claim my prize?",
    answer:
      "You will need the original physical or verified coupon ticket, Nepali Citizenship Certificate (नागरिकता), PAN Card, and your bank account details for direct transfer.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <HelpCircle className="h-3.5 w-3.5 text-sky-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about checking your IRD Coupon Lottery status.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-base font-bold text-slate-900 dark:text-slate-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 mt-2 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
