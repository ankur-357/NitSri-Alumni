import { useState, useEffect, memo, useCallback } from "react"
import Heading from '../../components/Headings/Heading'
import Card from "../../components/Carousel/Card";
import EventCard from './EventCard'
import Meta from '../../components/Meta/Meta';
import Loader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query"
import { getDocuments } from "../../services/documents"

const Events = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: () => getDocuments("events"),
    staleTime: Infinity,
  });
  return (
    <div>
      <Meta name="Events" />
      <Heading heading="EVENTS"></Heading>
      <Card
        head=""
        writer=""
        className=""
      />

      <h1 className='heading-head-text py-12'>Past Events</h1>

      <div className="">
        {isLoading ? (
          <div className="flex justify-center items-center h-[10rem] w-full">
            <Loader />
          </div>
        ) : isError ? (
          <p>Something went wrong.</p>
        ) : (
          <div className='flex flex-wrap m-auto px-5 gap-y-5 gap-8 items-center justify-center mb-10'>
            {data.map((event, index) => (
              <EventCard data={event} key={event.$id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Events