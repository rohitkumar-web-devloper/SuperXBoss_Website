"use client"
import { useState } from "react"
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from "react-icons/fi"
import contactImage from "@assets/contact-image.jpg"
import Image from "next/image"
import { useSubmitContactQuery } from "@/services/apis/publicApis/hooks"

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        message: ""
    })

    const { mutate, isPending, isSuccess, isError } = useSubmitContactQuery()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate(formData, {
            onSuccess: () => {
                setFormData({ name: "", mobile: "", message: "" })
            }
        })
    }

    return (
        <div className="px-4 sm:px-6 md:px-16 py-8 max-w-[1540px] mx-auto">
            <div className="text-center mb-10 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                    Have questions? We'd love to hear from you!
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-12">
                {/* Contact Info */}
                <div className="lg:w-1/2 bg-[#E6E9F2] rounded-lg p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-6">Get in Touch</h2>

                    <div className="space-y-5 sm:space-y-6">
                        {[
                            { icon: <FiPhone className="text-default text-xl" />, title: "Call Us", content: "+1 (555) 123-4567" },
                            { icon: <FiMail className="text-default text-xl" />, title: "Email Us", content: "support@techshop.com" },
                            { icon: <FiMapPin className="text-default text-xl" />, title: "Visit Us", content: "123 Tech Street, San Francisco, CA 94107" },
                            { icon: <FiClock className="text-default text-xl" />, title: "Hours", content: "Mon-Fri: 9am-6pm EST" }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="bg-default/10 p-2 rounded-full mt-1">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-medium text-base sm:text-lg mb-1">{item.title}</h3>
                                    <p className="text-gray-600 text-sm sm:text-base">{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className="mt-8">
                        <Image
                            src={contactImage}
                            alt="Our office"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-sm w-full h-auto"
                        />
                    </div> */}
                </div>

                {/* Contact Form */}
                <div className="lg:w-1/2 bg-white rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-6">Send a Message</h2>
                    <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 mb-2 text-sm sm:text-base">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-default/50 focus:border-default outline-none transition text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="mobile" className="block text-gray-700 mb-2 text-sm sm:text-base">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-default/50 focus:border-default outline-none transition text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-gray-700 mb-2 text-sm sm:text-base">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-default/50 focus:border-default outline-none transition text-sm sm:text-base"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-default text-white rounded-lg font-medium hover:bg-default-dark transition text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <FiSend className="text-lg" />
                            {isPending ? "Sending..." : "Send Message"}
                        </button>

                        {isSuccess && <p className="text-green-600 text-sm mt-2">✅ Message sent successfully!</p>}
                        {isError && <p className="text-red-600 text-sm mt-2">❌ Failed to send message. Try again.</p>}
                    </form>
                </div>
            </div>

            {/* Social Media */}
            <div className="bg-default/5 rounded-lg p-6 sm:p-8 text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Stay Connected</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
                    Follow us for updates and promotions
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                        <button
                            key={social}
                            className="px-4 sm:px-6 py-2 border rounded-full text-gray-700 hover:bg-default hover:text-white transition text-sm sm:text-base"
                        >
                            {social}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ContactUs
