import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div
      className=" group relative flex min-h-[380px] w-full max-w-[400px] flex-col  
    overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[430px]"
    >
      <Link
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className=" flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
        href={`/events/${event._id}`}
      />
      {/* IS EVENT CREATOR ? ...... */}
      {isEventCreator && !hidePrice && (
        <div className=" absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src={"/assets/icons/edit.svg"}
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <div className=" flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className=" flex gap-2 flex-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `£${event.price}`}
            </span>
            <p className="p-semibold-14 w-min px-4 py-1 bg-gray-500/10 text-gray-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 lg:p-regular-14 text-gray-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex text-black hover:text-primary-500">
            {event.title}
          </p>
        </Link>
        <p className=" line-clamp-2 font-light">{event.description}</p>
        <div className=" flex-between w-full">
          <p className="p-medium-14 md:font-light text-gray-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link className="flex gap-2" href={`/orders?eventId=${event._id}`}>
              <p className="text-primary-500">Order Details</p>
              <Image
                alt="serch"
                height={10}
                width={10}
                src={"/assets/icons/arrow.svg"}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
