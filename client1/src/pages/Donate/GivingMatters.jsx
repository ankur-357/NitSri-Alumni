import React from "react";
import Heading from "../../components/Headings/Heading";
import Timeline from "../../components/Timeline/Timeline";
import Meta from "../../components/Meta/Meta";

const bihtaCampus = [
    {
        image: "/images/bihtacampus/NITPsiteplan.jpeg",
        alt: 'Image Alt 1',
        title: 'Site Plan',
        description: 'Description to be updated...',
    },
    {
        image: '/images/bihtacampus/Maingate.jpeg',
        alt: 'Image Alt 2',
        title: 'Main Gate',
        description: 'Description to be updated...',
    },
    {
        image: '/images/bihtacampus/academic1.jpeg',
        alt: 'Image Alt 3',
        title: 'Academic Block-1',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Admin1.jpeg',
        alt: 'Image Alt 4',
        title: 'Admin Block-2',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Admin2.jpeg',
        alt: 'Image Alt 5',
        title: 'Admin Block-2',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Boyshostel1.jpeg',
        alt: 'Image Alt 6',
        title: 'Boys Hostel-1',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Boyshostel2.jpeg',
        alt: 'Image Alt 7',
        title: 'Boys Hostel-2',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/CEPcenter.jpeg',
        alt: 'Image Alt 8',
        title: 'CEP Center',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Directorresidence.jpeg',
        alt: 'Image Alt 9',
        title: "Director's residence",
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Facultyquarters.jpeg',
        alt: 'Image Alt 10',
        title: 'Faculty Quarters-1',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Facultyquarters2.jpeg',
        alt: 'Image Alt 11',
        title: 'Faculty Quarters-2',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/girlshostel.jpeg',
        alt: 'Image Alt 12',
        title: 'Girls Hostel',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/LectureHallblock.jpeg',
        alt: 'Image Alt 13',
        title: 'Lecture Hall Block',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/LibraryandDatacenter.jpeg',
        alt: 'Image Alt 14',
        title: 'Library and Data Center',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Staffquarters.jpeg',
        alt: 'Image Alt 15',
        title: 'Staff Quarters',
        description: 'Description to be updated....',
    },
    {
        image: '/images/bihtacampus/Transithostel.jpeg',
        alt: 'Image Alt 16',
        title: 'Transit Hostel',
        description: 'Description to be updated....',
    },


];

const GivingMatters = () => {
    return (
        <div>
            <Heading heading="Why Giving" heading1={"Matters ?"}></Heading>
            <div className="flex items-center flex-col justify-center gap-10 mb-5">
                <div data-aos="zoom-in" className="lg:max-w-[80%] md:w-[85%] w-[94%] bg-gray-900 rounded-3xl p-5 py-10 mx-auto flex flex-col md:flex-row items-center">
                    <div className="basis-[60%] px-2  duration-1000 ">
                        <h1 className="text-4xl  font-semibold text-sky-500">Why Is Alumni Giving Important? </h1>
                        <div className="max-w-[30%] mb-5 mt-1 h-1 bg-pink-500 " />
                        <p>From providing community spaces and events to excellent education opportunities, housing, dining, and unique activities for students to find their interests, funding for universities is important for the development of the next generation of adults. All of this becomes possible because of the generosity of alumni, and other donors, who understand how impactful universities can be.
                            University fundraising, especially from alumni, helps universities realize all of these programs, resources, and activities for their students. </p>
                    </div>
                    <div className="basis-[40%] sm:px-5  py-2 px-2 overflow-hidden rounded-xl lg:mt-0 md:mt-0 mt-5">
                        <img src="./images/Alumni1.png" alt="ankur" className="rounded-xl w-full   shadow-xl hue-rotate-30 " />
                    </div>
                </div>
            </div>
            <div className="flex items-center flex-col justify-center gap-10 mt-10 mb-5">
                <div data-aos="zoom-in" className="lg:max-w-[80%] md:w-[85%] w-[94%] bg-gray-900 rounded-3xl p-5 py-10 mx-auto flex flex-col md:flex-row items-center">
                    <div className="basis-[60%] px-2  duration-1000 ">
                        <h1 className="text-4xl  font-semibold text-sky-500">How Is Alumni Giving Revenue Used? </h1>
                        <div className="max-w-[30%] mb-5 mt-1 h-1 bg-pink-500 " />
                        <p>Because universities provide so much for students, especially four-year institutions where students live on campus, there are a wide variety of uses for alumni giving funds. Some of these include:
                            The operating budget. A lot of alumni giving revenue goes to the general operating budget, which works to ensure that the college can afford its costs and stays running.
                            Scholarships to current students. Often, alumni gifts are used specifically to help current students. These alumni-funded scholarships help more students get access to a high-quality education.
                            Unique and meaningful programs. Alumni often recall student programs that had a major impact on their college career. From study abroad opportunities to connecting students with real-life professionals, these programs genuinely elevate the entire university experience.
                            Campus renovations. With alumni gifts, universities can provide libraries and learning centers full of educational resources as well as other campus facilities to optimize the learning experience.
                            Depending on the unique needs of your university, you may solicit donations for a specific renovation or program or just accept general alumni donations year-round that can be primarily used for your operational budget.</p>
                    </div>
                    <div className="basis-[40%] sm:px-5  py-2 px-2 overflow-hidden rounded-xl lg:mt-0 md:mt-0 mt-5">
                        <img src="./images/Alumni1.png" alt="ankur" className="rounded-xl w-full   shadow-xl hue-rotate-30 " />
                    </div>
                </div>
            </div>
            <div className="flex items-center flex-col justify-center gap-10 mt-10 mb-5">
                <div data-aos="zoom-in" className="lg:max-w-[80%] md:w-[85%] w-[94%] bg-gray-900 rounded-3xl p-5 py-10 mx-auto flex flex-col md:flex-row items-center">
                    <div className="basis-[60%] px-2  duration-1000 ">
                        <h1 className="text-4xl  font-semibold text-sky-500">What Is a Good Alumni Giving Rate? </h1>
                        <div className="max-w-[30%] mb-5 mt-1 h-1 bg-pink-500 " />
                        <p>Alumni participation rate is one of the best indicators of how your alumni giving efforts are performing.The higher your alumni participation rate is, the more effective your engagement efforts are, and the more you’re likely fundraising!
                            To calculate your alumni participation rate, first determine your total alumni donor count.Then, divide that number by the number of overall alumni on record.For instance, if you have 100,000 overall alumni and 10,000 are donors, you have an alumni participation rate of 10 %.
                            While there is no one definitive number that is “good,” you should be aware of your alumni participation rate and should always be working to improve it. </p>
                    </div>
                    <div className="basis-[40%] sm:px-5  py-2 px-2 overflow-hidden rounded-xl lg:mt-0 md:mt-0 mt-5">
                        <img src="./images/Alumni1.png" alt="ankur" className="rounded-xl w-full   shadow-xl hue-rotate-30 " />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GivingMatters;

