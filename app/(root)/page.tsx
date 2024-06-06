import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className=" flex flex-col justify-center gap-8">
            <h1 className=" h1-bold">
              Host, Connect Celebrate your Events, Our Platform
            </h1>
            <p className=" p-regular-14 md:p-regular-18">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              inventore. Totam ad quod quaerat expedita rem.
            </p>
            <Button size={"lg"} className=" rounded-md w-full sm:w-fit" asChild>
              <Link href={"#events"}>Explore Now</Link>
            </Button>
          </div>
          <Image
            src={"/assets/images/hero.png"}
            alt="hero"
            width={1000}
            height={1000}
            className=" max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className=" text-3xl font-semimold">
          Trusted by <br /> Thousands of Events
        </h2>
        <div className=" flex w-full flex-col gap-5 md:flex-row">
          Serach Category Filter
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
