"use client";
import NavBar from "@/app/components/navBar";
import { useEvents } from "@/app/hooks/useEvents";

interface Event {
  name: string;
  description: string;
  date: string;
  totalTickets: number;
  availableTickets: number;
}

export default function Home() {
  const { data: events, isLoading, isError } = useEvents();

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <div className="">
        <NavBar></NavBar>
      </div>

      <div className="p-4">
        {isLoading && <p className="text-blue-500">Carregando eventos...</p>}
        {isError && (
          <p className="text-red-500">Erro ao carregar os eventos.</p>
        )}
        {events?.map((event: Event) => (
          <div key={event.name} className="bg-white p-4 my-4 rounded shadow">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="font-semibold">{event.date}</p>
            <p className="text-green-600">
              {event.availableTickets} tickets disponíveis
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
