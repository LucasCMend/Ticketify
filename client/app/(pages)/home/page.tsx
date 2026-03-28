"use client";
import NavBar from "@/app/components/navBar";
import { useEffect, useState } from "react";
import { findManyEvents } from "@/app/service/event";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  interface Event {
    name: string;
    description: string;
    date: string;
    totalTickets: number;
    availableTickets: number;
  }

  const fetchEvents = async () => {
    setError("");
    try {
      setIsLoading(true);
      const response = await findManyEvents();
      const foundEvents = response.data;
      setEvents(foundEvents);
    } catch (err) {
      console.error("Erro ao procurar os eventos", err);
      setEvents([]);
      setError("Erro ao procurar os eventos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  fetchEvents();
}, []);
  return (
    <div className="w-full min-h-screen bg-slate-100">
      <div className="">
        <NavBar></NavBar>
      </div>

      <div>
        {events.map((event) => (
          <div key={event.name}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.availableTickets} tickets disponíveis</p>
          </div>
        ))}
      </div>
    </div>
  );
}
