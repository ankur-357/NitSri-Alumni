import React from "react";
import Heading from "../../components/Headings/Heading";
import Timeline from "../../components/Timeline/Timeline";
import Meta from "../../components/Meta/Meta";

const DonateNow = () => {
    return (
        <div>
            <Heading heading="Ways to" heading1={"Donate ?"}></Heading>
            <div className="flex items-center flex-col justify-center gap-10 mb-5">
                <div data-aos="zoom-in" className="lg:max-w-[80%] md:w-[85%] w-[94%] bg-gray-900 rounded-3xl p-5 py-10 mx-auto flex flex-col md:flex-row items-center">
                    <div className="basis-[60%] px-2 duration-1000">
                        <h1 className="text-4xl font-semibold text-sky-500">Why Is Alumni Giving Important? </h1>
                        <div className="max-w-[30%] mb-5 mt-1 h-1 bg-pink-500 " />
                        <p>
                            From providing community spaces and events to excellent education opportunities, housing, dining, and unique activities for students to find their interests, funding for universities is important for the development of the next generation of adults. All of this becomes possible because of the generosity of alumni, and other donors, who understand how impactful universities can be.
                            University fundraising, especially from alumni, helps universities realize all of these programs, resources, and activities for their students.
                        </p>
                    </div>
                    <div className="basis-[40%] sm:px-5 py-2 px-2 overflow-hidden rounded-xl lg:mt-0 md:mt-0 mt-5">
                        <img src="/images/Alumni1.jpg" alt="ankur" className="rounded-xl w-full shadow-xl hue-rotate-30 " />
                    </div>
                </div>
            </div>

            {/* New section for bank details */}
            <div className="lg:max-w-[80%] md:w-[85%] w-[94%] bg-gray-900 rounded-3xl p-5 py-10 mx-auto mt-10 text-center">
                <h2 className="text-3xl font-semibold text-sky-500 mb-5">Bank Details for Donation</h2>
                <div className="bg-pink-500 w-[30%] mx-auto mb-5 h-1" />
                <p className="text-lg text-white mb-5">
                    You can contribute by making a direct transfer to the following account:
                </p>
                <div className="text-white text-lg mb-5">
                    <p><strong>Account Number:</strong> 912020039155481</p>
                    <p><strong>IFSC Code:</strong> UTIB0000009</p>
                    <p><strong>Bank:</strong> J&K Bank, Nit Hazratbal</p>
                    <p><strong>Account Type:</strong> Current Account</p>
                </div>
                <p className="text-lg text-white">
                    Your contribution will make a significant difference in the lives of students and help provide a better future for many!
                </p>
            </div>
        </div>
    );
};

export default DonateNow;
