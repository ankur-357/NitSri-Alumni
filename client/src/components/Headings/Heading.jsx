import React from 'react'
import './Heading.scss'

const Heading = ({ heading, heading1, subtitle }) => {
    return (
        <div className='heading-container relative overflow-hidden'>
            {/* Animated background elements */}
            <div className="heading-bg-elements">
                <div className="floating-orb orb-1"></div>
                <div className="floating-orb orb-2"></div>
                <div className="floating-orb orb-3"></div>
                <div className="grid-pattern"></div>
            </div>

            {/* Main content */}
            <div className='heading-banner relative z-10 flex flex-col items-center text-center py-20 lg:py-28'>
                {/* Top accent line */}
                <div className="accent-line-top"></div>

                {/* Main heading */}
                <h2 className='heading-head-text animate-fade-in-down'>
                    {heading}
                </h2>

                {/* Sub heading */}
                {heading1 && (
                    <p className='heading-sub-text lg:text-7xl md:text-6xl text-4xl mt-4 animate-fade-in-up'>
                        {heading1}
                    </p>
                )}

                {/* Optional subtitle */}
                {subtitle && (
                    <p className='heading-subtitle text-gray-400 text-lg md:text-xl mt-6 max-w-2xl animate-fade-in'>
                        {subtitle}
                    </p>
                )}

                {/* Bottom accent line */}
                <div className="accent-line-bottom"></div>
            </div>

            {/* Gradient overlay */}
            <div className="heading-gradient-overlay"></div>
        </div>
    )
}

export default Heading;

const PageHeading = ({ heading, heading1, icon, description }) => {
    return (
        <div className='page-heading-container py-8 relative'>
            {/* Background decoration */}
            <div className="page-heading-decoration">
                <div className="decoration-line"></div>
                <div className="decoration-dots"></div>
            </div>

            <div className='relative z-10'>
                {/* Main heading row */}
                <div className='flex items-center gap-3 flex-wrap'>
                    {icon && (
                        <div className="heading-icon-wrapper">
                            {icon}
                        </div>
                    )}

                    <div className='flex gap-2 items-baseline'>
                        <h2 className='page-heading-primary md:text-4xl text-3xl font-bold'>
                            {heading}
                        </h2>
                        {heading1 && (
                            <>
                                <span className="heading-separator"></span>
                                <p className='page-heading-secondary md:text-4xl text-3xl font-bold'>
                                    {heading1}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Optional description */}
                {description && (
                    <p className="page-heading-description text-gray-400 mt-3 text-lg">
                        {description}
                    </p>
                )}

                {/* Animated underline */}
                <div className="heading-underline"></div>
            </div>
        </div>
    )
}

export { PageHeading }