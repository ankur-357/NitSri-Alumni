import React from 'react'
import { Link } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";

const Director = () => {
    return (
        <div className='w-full flex-1 bg-white'>
            <div className="grid w-full bg-transparent text-white px-10 pt-2 pb-2 gap-6 text-center md:grid-cols-1 lg:gap-12">
                <div className='w-full mt-2'>
                    <div className=''>
                        <div className="m-auto my-1 flex justify-center items-center lg:h-28 h-24 lg:w-28 w-24 rounded-full overflow-hidden">
                            <img
                                src="/images/PKJ_Desk_Photo.jpg"
                                className="shadow-lg h-full dark:shadow-black/30  "
                                alt="Director's Desk"
                            />
                        </div>
                        <div>
                            <h1 className="lg:text-left md:text-left text-center text-sky-400 lg:text-2xl md:text-xl text-xl font-bold leading-tight">
                                From Director's Desk
                            </h1>
                            <h5 className="text-xl font-semibold text-center md:text-left mt-2">
                                Prof. Sudhakar Yedla
                            </h5>
                        </div>

                    </div>
                    <ul className="text-center md:text-left">
                        <h6 className="mb-4 text-sky-400 font-semibold">
                            Director of NIT Srinagar
                        </h6>

                        <p className="mb-4 font-normal text-black">
                            Prof. arch and Development and Head of the Department extensive collaborative research experience with laboratories like CEERI, DRDO, and IPR. He was a Visiting Scientist at MIT and Penn State University in 2008 and 2007, respectively. With over 20 guided doctoral theses, 100 SCI journal papers, and 200 conference proceedings, he's a senior member of IEEE and a fellow of several prestigious engineering societies.
                        </p>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Director