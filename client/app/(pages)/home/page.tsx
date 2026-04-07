"use client";
import EventCard from "@/app/components/EventCard";
import NavBar from "@/app/components/navBar";
import { useEvents } from "@/app/hooks/useEvents";
import { Event } from "@/app/types/eventTypes";

export default function Home() {
  const { data: events, isLoading, isError } = useEvents();

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <div className="">
        <NavBar></NavBar>
      </div>

      <div className="p-6">
        {isLoading && <p className="text-blue-500">Carregando eventos...</p>}
        {isError && (
          <p className="text-red-500">Erro ao carregar os eventos.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 mx-4">
          {events?.map((event: Event) => (
            <EventCard key={event.name} event={event}></EventCard>
          ))}
        </div>
      </div>
    </div>
  );
}
