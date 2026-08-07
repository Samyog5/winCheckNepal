"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "1. What is the Nepal IRD Taxpayer Incentive Lottery?",
    answer:
      "The Nepal IRD Taxpayer Incentive Lottery is a government initiative that rewards consumers who make eligible purchases from PAN-registered businesses. Eligible transactions receive a coupon number, which can be selected during official prize draws conducted by the Inland Revenue Department (IRD).",
  },
  {
    question: "2. How do I check if my coupon has won?",
    answer:
      "You can verify your coupon in two simple ways:\n• Enter your coupon number manually.\n• Upload a screenshot containing one or more coupon numbers.\nOur system automatically compares your coupon(s) with the latest officially published IRD winner list.",
  },
  {
    question: "3. Is this website an official IRD website?",
    answer:
      "No. This website is an independent verification platform created to help users quickly check their coupon numbers. Winner information is synchronized from publicly available IRD data.",
  },
  {
    question: "4. When are IRD lottery winners announced?",
    answer:
      "The IRD typically publishes winner lists twice every month. One draw covers eligible transactions from the first half of the month, while the other covers transactions from the second half. Always refer to the latest published draw for current results.",
  },
  {
    question: "5. Can I upload a screenshot instead of typing my coupon number?",
    answer:
      "Yes. You can upload a screenshot from supported payment apps or any image containing your coupon number. Our OCR system automatically detects the coupon number(s) and checks each one against the latest winner database.",
  },
  {
    question: "6. Can I check multiple coupon numbers at once?",
    answer:
      "Yes. If your screenshot contains multiple coupon numbers, the system will detect all available coupons and verify each individually.",
  },
  {
    question: "7. Which payment apps are supported?",
    answer:
      "Any payment app or invoice that clearly displays the IRD coupon number can be checked. As long as the coupon number is visible, our OCR system attempts to extract and verify it.",
  },
  {
    question: "8. Why wasn't my coupon detected?",
    answer:
      "Coupon detection may fail if:\n• The image is blurry.\n• The coupon number is cropped.\n• The screenshot quality is too low.\n• The coupon number is hidden or partially covered.\nUploading a clearer image usually improves detection accuracy.",
  },
  {
    question: "9. Why does my coupon show as \"Not Found\"?",
    answer:
      "A \"Not Found\" result usually means that your coupon is not included in the latest published IRD winner list currently stored in our database. It does not necessarily mean your coupon will never win, as future draws may still be pending.",
  },
  {
    question: "10. How often is the winner database updated?",
    answer:
      "Our system automatically synchronizes the latest published winner information after new IRD results become available, helping ensure that verification uses the most recent official data.",
  },
  {
    question: "11. Does this website store my uploaded screenshots?",
    answer:
      "Uploaded images are processed only for coupon verification. Images are not permanently stored after processing unless explicitly stated in our privacy policy.",
  },
  {
    question: "12. Is my personal information safe?",
    answer:
      "Yes. This website only verifies coupon numbers. We do not require sensitive financial information or payment credentials to perform a lottery check.",
  },
  {
    question: "13. Can the OCR make mistakes?",
    answer:
      "OCR technology is highly accurate for clear screenshots, but poor image quality may occasionally affect recognition. If the extracted coupon number looks incorrect, you can manually enter the coupon number for verification.",
  },
  {
    question: "14. What prizes are available in the IRD Taxpayer Incentive Program?",
    answer:
      "Prize categories are determined by the official IRD draw. Depending on the published results, prizes may include bumper prizes and regular prizes announced during each draw.",
  },
  {
    question: "15. Is this lottery checker free to use?",
    answer:
      "Yes. You can verify your coupon numbers online without paying any fee.",
  },
  {
    question: "16. Can I verify old coupon numbers?",
    answer:
      "Yes. If the corresponding draw exists in our synchronized database, you can check older coupon numbers as well as the latest published results.",
  },
  {
    question: "17. Why should I use this website instead of checking manually?",
    answer:
      "Our platform saves time by:\n• Detecting coupon numbers from screenshots.\n• Checking multiple coupons at once.\n• Comparing them instantly with the latest published winner database.\n• Eliminating the need to search through winner lists manually.",
  },
  {
    question: "18. How can I claim a prize if my coupon wins?",
    answer:
      "If your coupon appears in the official winner list, you should follow the claim procedure announced by the Inland Revenue Department. Claim eligibility, required documents, and deadlines are determined by the official IRD notice.",
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
            Everything you need to know about checking your IRD Coupon Lottery status with WinCheck Nepal.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-slate-800/50 mt-1 pt-3 animate-in fade-in duration-200">
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
