import React from "react";
import 'react-slideshow-image/dist/styles.css'
import { Fade, Zoom, Slide } from 'react-slideshow-image'
import { Link } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";

const slideImages = [
    {
        url: '/images/sliderimages/img1.png',
    },
    {
        url: '/images/sliderimages/img2.png',
    },
    {
        url: '/images/sliderimages/img3.jpg',
    },
    {
        url: '/images/sliderimages/img4.jpg',
    },
    {
        url: '/images/sliderimages/img5.jpg',
    },
    {
        url: '/images/sliderimages/img6.jpg',
    },
    {
        url: '/images/sliderimages/Alumni.jpg',
    },
];

const spanStyle = {
    fontSize: "20px",
    background: "#efefef",
    color: "#fff"
}

function ImageSlider() {
    const { user } = useAuth();

    return (
        <div className="slide-container">
            <Fade duration={2000}>
                {slideImages.map((image, index) => (
                    <div key={index} >
                        <div style={{}}>
                            {/* <div className="flex w-full items-center justify-center h-440 bg-cover bg-center" style={{backgroundImage: `url(${image.url})`}}> */}
                            <div style={{background: `url(${image.url}) no-repeat center center/cover`}} className="aspect-square md:aspect-video ">
                                <span style={{ spanStyle }}>
                                    <div data-aos="fade-right" className="absolute w-full inset-0 text-left pt-32 lg:pl-24 md:pl-16 pl-8 bg-gradient-to-r  from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.5)] to-transparent">
                                        <h5 className="lg:text-4xl md:text-3xl text-2xl font-bold pb-2">
                                            <span className="text-sky-500">Engage.</span> Empower. Relive.
                                        </h5>
                                        <p className="lg:text-4xl md:text-2xl text-2xl font-bold">
                                            WELCOME ALUMNI
                                        </p>
                                        <p className='lg:text-xl text-lg pb-5 pt-2 text-gray-300'>
                                            Register now and become a member of <br /> Alumni Association of NIT Srinagar.
                                        </p>
                                        {user ? <Link to="/dashboard">
                                            <button className="px-5 py-2.5 bg-[#4B164C] text-white text-lg font-medium hover:scale-105 transition-all delay-75 rounded-xl ease-in hover:bg-black" >
                                                Dashboard
                                            </button>
                                        </Link> :
                                            <Link to="/signup">
                                                <button className="px-5 py-2.5 bg-[#4B164C] text-white text-lg font-medium hover:scale-105 transition-all delay-75 rounded-xl ease-in hover:bg-black" >
                                                    Sign Up
                                                </button>
                                            </Link>}
                                    </div>
                                </span>
                            </div>
                        </div>

                    </div>
                ))
                }
            </Fade >
        </div >
    )
}

export default ImageSlider;
