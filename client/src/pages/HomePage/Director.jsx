import React from 'react'
import { Link } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";

const Director = () => {
    return (
        <div className='w-full flex-1 bg-white h-full'>
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
                            Prof. Binod Kumar Kanaujia, the esteemed Director of NIT Srinagar and Dr. B R
                            Ambedkar National Institute of Technology (NIT), Jalandhar, is a distinguished
                            academician. He holds a B.Tech degree in Electronics Engineering from Kamla
                            Nehru Institute of Technology (KNIT), Sultanpur, India (1994), and both M.Tech
                            (1998) and Ph.D. (2004) degrees from the Department of Electronics Engineering at
                            IIT (Banaras Hindu University), Varanasi, India.
                            Prof. Kanaujia has had an illustrious academic career. Since August 2016, he has
                            served as a Professor and Dean at the School of Computational and Integrative
                            Sciences, Jawaharlal Nehru University (JNU), New Delhi. He became the Director of
                            Dr. B R Ambedkar NIT Jalandhar in February 2022 and was also given additional
                            charge as Director of the Indian Institute of Information Technology, Una, by the
                            Ministry of Education on April 23, 2024. Furthermore, Prof. Kanaujia has taken up
                            the additional charge as Director of NIT Srinagar as per the Ministry of Education
                            directive dated October 17, 2024.

                        </p>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Director
