import Link from "next/link";
import { Event } from "@/app/types/eventTypes";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-md hover:shadow-xl hover:border-blue-900 transition-all duration-300 flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-xl font-bold text-blue-900">{event.name}</h2>
        <p className="text-slate-600 text-sm mt-2 line-clamp-2">
          {event.description}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-4 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
              Data
            </span>
            <span className="text-slate-800 font-medium">{event.date}</span>
          </div>

          <div className="bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
            <span className="text-green-700 text-sm font-semibold">
              {event.availableTickets} disponíveis
            </span>
          </div>
        </div>
        <Link
          href={`/evento/${event.name}`}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white text-center py-2.5 rounded-lg font-semibold transition-colors duration-300"
        >
          Acessar Página do Evento
        </Link>
      </div>
    </div>
  );
}
