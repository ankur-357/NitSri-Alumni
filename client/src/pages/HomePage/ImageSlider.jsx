import React from "react";
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';

const slides = [
    '/images/sliderimages/img1.png',
    '/images/sliderimages/img2.png',
    '/images/sliderimages/img3.jpg',
    '/images/sliderimages/img4.jpg',
    '/images/sliderimages/img5.jpg',
    '/images/sliderimages/img6.jpg',
    '/images/sliderimages/Alumni.jpg',
];

const ImageSlider = () => {
    return (
        <section className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden select-none bg-black">
            <Fade
                duration={3500}
                transitionDuration={1000}
                arrows={false}
                pauseOnHover={true}
                infinite
                easing="ease"
                indicators={(i) => (
                    <div className="indicator" key={i} />
                )}
            >
                {slides.map((imageUrl, idx) => (
                    <div key={idx} className="relative w-full h-[480px] md:h-[610px]">
                        <img
                            src={imageUrl}
                            alt={`Slide ${idx + 1}`}
                            className="object-cover w-full h-full rounded-3xl filter brightness-90 transition-transform duration-700 ease-in-out hover:scale-105"
                            draggable={true}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-3xl pointer-events-none" />
                    </div>
                ))}
            </Fade>
            {/* Custom styles for indicators */}
            <style jsx>{`
                .indicator {
                    width: 10px;
                    height: 10px;
                    margin: 5px;
                    background-color: #601edb;
                    border-radius: 50%;
                    display: inline-block;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .indicator:hover, .indicator.active {
                    background-color: #fff;
                }
            `}</style>
        </section>
    );
};

export default ImageSlider;