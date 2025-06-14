import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const Welcome = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 200)
        return () => clearTimeout(timeout)
    }, [])

    const features = [
        {
            title: "Development in Progress",
            description: "Our alumni portal is continuously enhanced with new features and data integration to serve our community better.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
            ),
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            borderColor: "border-blue-100"
        },
        {
            title: "Distinguished Alumni Network",
            description: "Connect with accomplished graduates who have made significant contributions across industries, academia, and public service worldwide.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
            ),
            bgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
            borderColor: "border-emerald-100"
        },
        {
            title: "Centenary Legacy 2024",
            description: "Celebrating a century of academic excellence and innovation. Join our milestone events and contribute to our institutional heritage.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228a25.18 25.18 0 012.16-.506 6.003 6.003 0 01-2.395 5.472m0 0a6.726 6.726 0 01-2.748 1.35m0 0H14.25M7.73 9.728H9.75m0 0V9.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v.353M9.75 9.728v-.863c0-1.036.84-1.875 1.875-1.875h.75c1.035 0 1.875.84 1.875 1.875v.863m-8.25 0c0 1.24.84 2.25 1.875 2.25h2.628c1.035 0 1.875-1.01 1.875-2.25" />
                </svg>
            ),
            bgColor: "bg-amber-50",
            iconColor: "text-amber-600",
            borderColor: "border-amber-100"
        }
    ]

    return (
        <section
            className={`relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* Hero Section */}
            <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">

                {/* Header */}
                <header className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
                        Official Alumni Portal
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                        NIT Srinagar
                        <span className="block text-indigo-600">Alumni Network</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                        Connecting generations of engineers, innovators, and leaders who continue to shape the future of technology and society.
                    </p>
                </header>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <article
                            key={index}
                            className={`${feature.bgColor} ${feature.borderColor} border-2 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className={`${feature.iconColor} mb-6`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>

                {/* Statistics Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Years of Excellence", value: "100+" },
                            { label: "Alumni Worldwide", value: "10,000+" },
                            { label: "Industry Sectors", value: "50+" },
                            { label: "Countries", value: "25+" }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <Link
                        to="/about"
                        className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        aria-label="Learn more about NIT Srinagar"
                    >
                        <span>Explore Our Legacy</span>
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Welcome