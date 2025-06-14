import React, { useState } from 'react';
import Heading1 from '../Headings/Heading1';

// Static data stored outside the component for performance
const faqs = [
    {
        question: "How do I create an alumni account?",
        answer: "To create an alumni account, navigate to the registration page, provide your email address and credentials, complete the verification process, and log in. Upon successful authentication, you can create and personalize your alumni profile with your professional details and achievements.",
        id: "faq-1"
    },
    {
        question: "Who is eligible for an alumni account?",
        answer: "Alumni accounts are exclusively available for verified graduates and former faculty/staff members of our institution. Each registration undergoes a thorough administrative verification process to ensure authenticity and maintain the integrity of our alumni network.",
        id: "faq-2"
    },
    {
        question: "What advantages does an alumni account provide?",
        answer: "An alumni account grants you access to our exclusive network where you can connect with peers across various industries, explore detailed professional profiles, publish thought leadership content, post career opportunities, participate in mentorship programs, and contribute meaningfully to our growing alumni community.",
        id: "faq-3"
    },
    {
        question: "What features does the alumni portal offer?",
        answer: "Our comprehensive alumni portal provides a sophisticated platform for professional networking, event discovery and registration, content sharing, career advancement opportunities, and receiving personalized updates about fellow alumni achievements and institutional developments.",
        id: "faq-4"
    },
    {
        question: "How frequently are alumni events scheduled?",
        answer: "We curate and organize multiple strategic events throughout the calendar year, including networking sessions, professional development workshops, industry panels, and social gatherings designed to strengthen community bonds and foster valuable career advancement opportunities.",
        id: "faq-5"
    },
    {
        question: "Can alumni contribute to enhancing the portal?",
        answer: "We actively encourage alumni participation in the continuous improvement of our platform. Your strategic suggestions, constructive feedback, and collaborative proposals are invaluable as we systematically evolve the portal to better serve our alumni community's diverse and changing needs.",
        id: "faq-6"
    }
];

const Faq = () => {
    const [activeId, setActiveId] = useState(null);

    const toggleFaq = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section className="relative bg-white text-white py-24 px-6 sm:px-8 lg:px-12 rounded-2xl w-full mx-auto shadow-xl overflow-hidden">
            <BackgroundElements />
            <div className="relative z-10">
                <Heading1
                    text1="Frequently Asked"
                    text2="Questions"
                    details="Curated responses to common inquiries about our alumni platform. For additional assistance, please contact our support team."
                />
                <div className="mt-14 space-y-5">
                    {faqs.map((faq) => (
                        <FaqItem
                            key={faq.id}
                            faq={faq}
                            isActive={activeId === faq.id}
                            onToggle={() => toggleFaq(faq.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FaqItem = ({ faq, isActive, onToggle }) => {
    const { question, answer, id } = faq;

    return (
        <div className="border border-slate-700/70 rounded-lg bg-slate-800 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/90 shadow-md">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
                aria-expanded={isActive}
                aria-controls={`faq-answer-${id}`}
            >
                <h3 className="text-lg font-semibold text-slate-100">{question}</h3>
                <span className="flex-shrink-0 ml-4">
                    <svg
                        className={`w-6 h-6 text-indigo-400 transform transition-transform duration-500 ease-in-out ${isActive ? 'rotate-180' : 'rotate-0'
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div
                id={`faq-answer-${id}`}
                className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-300 leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
};

const BackgroundElements = () => (
    <>
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -left-36 w-80 h-80 rounded-full bg-indigo-600/20 filter blur-3xl animate-slow-float"
        />
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 -right-24 w-96 h-96 rounded-full bg-purple-600/20 filter blur-3xl animate-slow-float animation-delay-3s"
        />
        <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-600/10 filter blur-3xl animate-slow-float animation-delay-5s"
        />
    </>
);

export default Faq;