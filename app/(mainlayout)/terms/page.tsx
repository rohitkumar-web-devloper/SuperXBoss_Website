"use client"
import { FiCheckCircle } from "react-icons/fi"

const TermsAndConditions = () => {
    return (
        <div className="px-4 sm:px-6 md:px-16 py-8 max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Terms & Conditions</h1>
                <p className="text-gray-600 text-sm sm:text-base">Last updated: August 10, 2025</p>
            </div>

            {[
                {
                    title: "1. Introduction",
                    content: "Welcome to our e-commerce platform. These Terms & Conditions govern your use of our website and services. By accessing or using our service, you agree to be bound by these terms."
                },
                {
                    title: "2. User Responsibilities",
                    items: [
                        "You must provide accurate information when creating an account",
                        "You are responsible for maintaining the confidentiality of your account",
                        "Any misuse or fraudulent activity will result in account termination"
                    ]
                },
                {
                    title: "3. Orders & Payments",
                    subsections: [
                        {
                            title: "3.1 Order Acceptance",
                            content: "All orders are subject to availability and confirmation of the order price. We reserve the right to refuse any order."
                        },
                        {
                            title: "3.2 Pricing",
                            content: "Prices are subject to change without notice. The price displayed at the time of order confirmation is final."
                        }
                    ]
                },
                {
                    title: "4. Returns & Refunds",
                    content: "Our return policy lasts 30 days from delivery. Items must be unused and in original packaging. Refunds are processed within 14 business days."
                }
            ].map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-6 last:mb-0">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">{section.title}</h2>

                    {section.content && (
                        <p className="text-gray-700 text-sm sm:text-base mb-4 last:mb-0">
                            {section.content}
                        </p>
                    )}

                    {section.items && (
                        <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start">
                                    <FiCheckCircle className="text-default mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {section.subsections && section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="mt-4">
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">{subsection.title}</h3>
                            <p className="text-gray-700 text-sm sm:text-base">{subsection.content}</p>
                        </div>
                    ))}
                </div>
            ))}

            <div className="mt-12 text-center">
                <p className="text-gray-600 text-sm sm:text-base">
                    Questions? Contact us at <span className="text-default">legal@techshop.com</span>
                </p>
            </div>
        </div>
    )
}

export default TermsAndConditions