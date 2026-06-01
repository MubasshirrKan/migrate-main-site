import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

type Block = { h: string; p?: string[]; ul?: string[] };

function goHome() {
  window.history.pushState({}, "", "/");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function LegalLayout({ title, intro, blocks }: { title: string; intro: string; blocks: Block[] }) {
  return (
    <div className="bg-zinc-950 text-white font-sans antialiased min-h-screen overflow-x-hidden">
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <button onClick={goHome} className="flex items-center gap-2 font-bold text-white text-lg tracking-widest uppercase">
          <img src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1778939459/logo_icon_eaiu4c.png" alt="Logo" className="w-7 h-7 object-contain" />
          Migrate<span className="font-light">Properly</span>
        </button>
        <button onClick={goHome} className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </nav>

      <article className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[#60A5FA] text-xs font-bold uppercase tracking-[0.3em] mb-4">MigrateProperly</p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6">{title}</h1>
          <p className="text-white/55 leading-relaxed mb-12">{intro}</p>
        </motion.div>

        <div className="space-y-10">
          {blocks.map((b, i) => (
            <section key={i}>
              <h2 className="text-lg md:text-xl font-bold text-white mb-3">{b.h}</h2>
              {b.p?.map((para, j) => (
                <p key={j} className="text-white/55 leading-relaxed mb-3 text-sm md:text-base">{para}</p>
              ))}
              {b.ul && (
                <ul className="space-y-2 mt-2">
                  {b.ul.map((li, j) => (
                    <li key={j} className="flex gap-3 text-white/55 text-sm md:text-base leading-relaxed">
                      <span className="text-[#60A5FA] shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="text-white/30 text-xs mt-16 pt-8 border-t border-white/5">
          Questions? Reach us through the contact form or live chat on our website.
        </p>
      </article>
    </div>
  );
}

// ─── Privacy Policy ───────────────────────────────────────────────────────────
const PRIVACY: Block[] = [
  { h: "1. Introduction", p: [
    'MigrateProperly ("MigrateProperly", "we", "us", or "our") is committed to protecting the privacy and personal information of the students, parents, guardians, and visitors ("you", "your", or "User") who use our website, applications, and services (collectively, the "Services").',
    "This Privacy Policy explains what information we collect, how we use and protect it, the circumstances in which we may share it, and the rights available to you. By accessing or using our Services, you acknowledge that you have read and understood this Privacy Policy.",
    "If you do not agree with the practices described here, please do not use our Services.",
  ]},
  { h: "2. Who We Are", p: [
    'MigrateProperly is the entity responsible for your personal information (the "data controller"). We are a study-abroad agency operating in Bangladesh.',
    "For any questions about this Privacy Policy or your personal information, you can reach us through the contact form or live chat on our website.",
  ]},
  { h: "3. Information We Collect", p: ["Depending on how you interact with us, we may collect:"], ul: [
    "Identity and contact details (name, date of birth, gender, nationality, email, phone, address).",
    "Academic information (educational history, transcripts, grades, test scores such as IELTS, degrees, certificates).",
    "Immigration and identity documents (passport details, national identity information, visa history).",
    "Financial information relevant to your application or payment (proof of funds, bank statements, payment details).",
    "Career and personal background, including statements of purpose, work experience, and goals.",
    "Communications you send us, including messages, support requests, and chat interactions.",
    "Responses to our quizzes, matching assessments, and interactive tools.",
    "Technical and usage data (IP address, device/browser type, pages visited, interaction patterns) and cookies.",
    "Information from educational institutions, partner agencies, or service providers where relevant.",
  ]},
  { h: "4. How We Use Your Information", ul: [
    "To provide our Services — assessing your profile, matching destinations and institutions, supporting applications.",
    "To generate documents and recommendations, including AI-assisted drafts, and facilitate optional human expert review.",
    "To communicate with you regarding enquiries, applications, appointments, and updates.",
    "To process payments for paid services.",
    "To operate, maintain, secure, and improve our website and Services.",
    "To send information, offers, and promotions where you have consented (you may opt out any time).",
    "To comply with legal, regulatory, and institutional requirements.",
    "To detect, prevent, and address fraud, misuse, or security issues.",
  ]},
  { h: "5. Automated Processing and Artificial Intelligence", p: [
    "Our Services use AI and automated tools to support research, destination and program matching, and the drafting of documents.",
  ], ul: [
    "AI-assisted outputs support and inform your decisions — they do not replace professional judgment, official institutional guidance, or government immigration authorities.",
    "We do not make legally or similarly significant decisions about you solely by automated means without appropriate human involvement or your consent.",
    "You may request a human review of AI-assisted outputs where such an option is offered.",
  ]},
  { h: "6. Legal Bases for Processing", ul: [
    "Performance of a contract — to deliver the Services you request.",
    "Consent — e.g. for marketing or sensitive information; you may withdraw consent at any time.",
    "Legitimate interests — to operate, secure, and improve our Services.",
    "Legal obligation — to comply with applicable laws and regulatory requirements.",
  ]},
  { h: "7. How We Share Your Information", p: ["We do not sell your personal information. We may share it only as described below:"], ul: [
    "Educational institutions and their representatives, with your authorization.",
    "Government, immigration, and visa authorities, where required to facilitate processes you request.",
    "Service providers and partners (hosting, payments, communications, analytics) under confidentiality obligations.",
    "Technology and AI service providers that help deliver matching and document-drafting features.",
    "Legal and regulatory disclosures, where required by law or to protect rights.",
    "Business transfers, in connection with a merger, acquisition, or reorganization.",
  ]},
  { h: "8. International Transfers", p: [
    "Because our Services involve studying and migrating abroad, your information may be transferred to, stored in, or accessed from countries outside Bangladesh, including the country to which you intend to apply. We take reasonable steps to ensure it is treated securely and in accordance with this Privacy Policy and applicable law.",
  ]},
  { h: "9. Data Retention", p: [
    "We retain your personal information only for as long as necessary to fulfil the purposes described here, comply with legal obligations, resolve disputes, and enforce our agreements. When no longer required, we delete or anonymize it securely.",
  ]},
  { h: "10. Data Security", p: [
    "We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, loss, misuse, or alteration. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
  ]},
  { h: "11. Cookies and Similar Technologies", p: [
    "We use cookies and similar technologies to operate our website, remember preferences, analyze usage, and improve your experience. You can manage or disable cookies through your browser settings, although some features may not function properly as a result.",
  ]},
  { h: "12. Your Rights", p: ["Subject to applicable law, you may have the right to:"], ul: [
    "Access the personal information we hold about you.",
    "Request correction of inaccurate or incomplete information.",
    "Request deletion of your information.",
    "Object to or restrict certain processing.",
    "Withdraw consent where processing is based on consent.",
    "Request a copy of your information in a portable format.",
    "Lodge a complaint with a relevant supervisory authority.",
  ]},
  { h: "13. Minors", p: [
    "Some Users may be under 18. Where a User is a minor, we expect a parent or legal guardian to provide consent and supervise use of our Services. If you believe we have collected information from a minor without appropriate consent, please contact us.",
  ]},
  { h: "14. Third-Party Links", p: [
    "Our Services may contain links to third-party websites or services that we do not operate or control. We are not responsible for their privacy practices and encourage you to review their policies.",
  ]},
  { h: "15. Contact Us", p: [
    "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us through the contact form or live chat on our website, and our team will respond as soon as reasonably possible.",
  ]},
];

// ─── Terms of Service ───────────────────────────────────────────────────────
const TERMS: Block[] = [
  { h: "1. Agreement to Terms", p: [
    'These Terms of Service ("Terms") govern your access to and use of the website, applications, and services provided by MigrateProperly (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms and by our Privacy Policy. If you do not agree, you must not use the Services.',
  ]},
  { h: "2. Definitions", ul: [
    '"Services" means our website, AI-assisted matching and research tools, document-drafting features, guidance, and related products or support.',
    '"AI-Assisted Output" means any recommendation, draft, document, or content generated wholly or partly through automated or AI tools.',
    '"Content" means any text, documents, information, or materials made available through the Services.',
  ]},
  { h: "3. Eligibility", p: [
    "You must be capable of forming a legally binding contract to use the Services. If you are under 18, you may use the Services only with the involvement and consent of a parent or legal guardian, who agrees to be bound by these Terms on your behalf.",
  ]},
  { h: "4. Our Services", p: [
    "MigrateProperly provides study-abroad guidance and support, including AI-assisted research, destination and program matching, document drafting, and, where offered, optional human expert review.",
    "Our Services are advisory and supportive in nature. We are an independent agency and are not a government body, immigration authority, or educational institution. We do not make admission or visa decisions.",
  ]},
  { h: "5. No Guarantee of Outcomes", p: ["While we work diligently to support your goals, you acknowledge and agree that:"], ul: [
    "We do not and cannot guarantee admission, the grant of any visa, the award of any scholarship, or any specific outcome.",
    "Admission, visa, and funding decisions are made entirely by third parties at their sole discretion.",
    "Our recommendations, including AI-Assisted Output, are based on available information and general practice, and may not reflect the most current requirements of every institution or authority.",
  ]},
  { h: "6. AI-Assisted Output", ul: [
    "AI-Assisted Output is intended to assist and inform you and may contain errors, omissions, or content not suitable for your specific circumstances.",
    "You are responsible for reviewing, verifying, and approving any AI-Assisted Output before relying on or submitting it.",
    "AI-Assisted Output does not constitute legal, immigration, financial, or professional advice.",
    "A human expert review option, where offered, is supplementary and does not transfer to us responsibility for the accuracy or success of any application.",
  ]},
  { h: "7. Fees and Payments", ul: [
    "Certain features are free; others, such as human expert review, may require payment of the fees stated at the point of purchase.",
    "All fees are payable in the currency and methods specified at checkout, exclusive of any applicable taxes unless stated.",
    "Unless expressly stated or required by law, fees paid are non-refundable. Specific refund/cancellation terms will be made available at purchase.",
    "We may change our fees and the features included in any paid service at any time, applying to future purchases.",
  ]},
  { h: "8. Promotions, Quizzes, and Discounts", p: [
    "From time to time we may offer quizzes, promotions, or discounts (for example, a discount for completing a quiz). Such offers are subject to their own terms, may be limited in time or quantity, cannot be exchanged for cash unless stated, and may be modified or withdrawn at our discretion.",
  ]},
  { h: "9. Your Responsibilities", p: ["You agree to:"], ul: [
    "Provide accurate, complete, and current information, and update it as necessary.",
    "Submit only information and documents that are genuine, lawful, and that you are authorized to share.",
    "Not misrepresent your identity, qualifications, or circumstances, or submit fraudulent or misleading documents.",
    "Use the Services only for lawful purposes and in compliance with all applicable laws and institutional requirements.",
    "Keep account credentials confidential and accept responsibility for activity under your account.",
  ]},
  { h: "10. Intellectual Property", p: [
    "All Content, software, design, text, graphics, and other materials forming part of the Services, other than your own information and documents, are owned by or licensed to MigrateProperly and protected by intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from our materials without our prior written consent, except as necessary for your own personal use of the Services.",
  ]},
  { h: "11. User Content", p: [
    'You retain ownership of the information and documents you submit ("User Content"). By submitting User Content, you grant us a non-exclusive, royalty-free license to use, process, and share it as necessary to provide the Services and as described in our Privacy Policy. You are responsible for ensuring you have the right to share any User Content you provide.',
  ]},
  { h: "12. Third-Party Services and Institutions", p: [
    "The Services may reference or connect you with third parties, including educational institutions, government authorities, and service providers. We do not control and are not responsible for the acts, omissions, decisions, requirements, fees, or policies of any third party.",
  ]},
  { h: "13. Disclaimers", p: [
    'To the fullest extent permitted by law, the Services are provided "as is" and "as available" without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or secure.',
  ]},
  { h: "14. Limitation of Liability", p: [
    "To the fullest extent permitted by law, MigrateProperly and its directors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, opportunities, savings, data, or goodwill. Where liability cannot be excluded, our total aggregate liability shall not exceed the amount of fees you paid for the specific service giving rise to the claim.",
  ]},
  { h: "15. Indemnification", p: [
    "You agree to indemnify and hold harmless MigrateProperly and its directors, employees, and partners from any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or related to your use of the Services, your User Content, or your breach of these Terms.",
  ]},
  { h: "16. Suspension and Termination", p: [
    "We may suspend or terminate your access to the Services at any time, with or without notice, if we reasonably believe you have breached these Terms, provided false information, or engaged in unlawful or fraudulent conduct. You may stop using the Services at any time. Provisions that by their nature should survive termination will continue to apply.",
  ]},
  { h: "17. Governing Law and Dispute Resolution", p: [
    "These Terms are governed by the laws of the People's Republic of Bangladesh, without regard to conflict-of-law principles. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of Dhaka, Bangladesh, unless otherwise required by applicable law.",
  ]},
  { h: "18. Changes to These Terms", p: [
    'We may update these Terms from time to time. When we make material changes, we will update the "Last updated" date and, where appropriate, provide additional notice. Your continued use of the Services after the changes take effect constitutes acceptance of the revised Terms.',
  ]},
  { h: "19. Contact Us", p: [
    "For questions about these Terms, please contact us through the contact form or live chat on our website, and our team will respond as soon as reasonably possible.",
  ]},
];

export function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="This Privacy Policy explains what information we collect, how we use and protect it, when we may share it, and the rights available to you."
      blocks={PRIVACY}
    />
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="These Terms govern your access to and use of MigrateProperly's website, applications, and services. Please read them carefully."
      blocks={TERMS}
    />
  );
}
