"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex items-center gap-3">
      {/* cannot buy past event */}
      {hasEventFinished ? (
        <div className="flex items-center gap-2">
          <p className="text-sm text-red-600 leading-3 px-3 py-2 bg-red-100 rounded-lg border border-red-800">
            Sorry tickets are no longer available
          </p>
          <ThumbsDown className="w-4 h-4 text-destructive" />
        </div>
      ) : (
        <div className=" flex items-center gap-3">
          <SignedOut>
            <Button asChild className="button rounded-lg" size={"lg"}>
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
            <ThumbsUp className="w-4 h-4" />
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </div>
      )}
    </div>
  );
};

export default CheckoutButton;
