import "./AlumniTestimonial.scss";
import TestimonialCard from "../AlumniCorner/TestimonialCard";
import { RxArrowRight } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPaginatedPublishedDocs } from '../../services/documents'
import Loader from '../../components/Loader'
import Heading1 from '../../components/Headings/Heading1'

const Testimonials = () => {
    const { data: testimonials, isLoading, isError } = useQuery({
        queryKey: ['homepage-testimonial'],
        queryFn: () => getPaginatedPublishedDocs('testimonials', 3, 0),
    });

    console.log(testimonials)
    return (
        <div className='my-10 py-10 pb-20 lg:px-16 md:px-6 px-6 bg-white'>
            <h1
                data-aos="fade-up"
                className="font-semibold lg:text-5xl md:text-4xl text-3xl text-center items-center"
            >
                Testimonials from our <span className="text-sky-500">Alumni</span>
            </h1>

            {isLoading ? <Loader /> :
                isError ? <div className='text-center text-red-500'>Something went wrong!</div> :
                    <div className='grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center m-auto my-10 min-h-[16rem]'>
                        {testimonials && testimonials.slice(0, 3).map((testimonial) => (
                            <TestimonialCard data={testimonial} key={testimonial.$id} />
                        ))}
                    </div>}

            <Link data-aos="zoom-in" to="/blogs" className='bg-[#205781] absolute lg:right-20 md:right-16 right-12 hover:bg-black opacity-80 text-white font-semi-bold py-2 px-4 rounded-full flex items-center'>
                <button className="mr-2">
                    View All
                </button>
                <RxArrowRight size={24} />
            </Link>
        </div>
    )
}


export default Testimonials