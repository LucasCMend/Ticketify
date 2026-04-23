"use client"
import Link from "next/link";
import * as React from 'react'
import { useEvent } from "@/app/hooks/useEvents";

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EventPage({ params }: EventPageProps) {
  const {id} = React.use(params);


  const { data: event, isLoading, isError } = useEvent(id);

  if (isLoading) {
    return(
      <div><p>carregando o Evento...</p></div>
    )
  }

  if (isError || !event) {
    return(
      <div><p>Erro ao carregar o evento</p></div>
    )
  }

  const ticketsSold = event.totalTickets - event.availableTickets;
  const soldPercentage = Math.round((ticketsSold / event.totalTickets) * 100);

  // Função para formatar o valor como moeda brasileira
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(event.price);

  console.log(event)

  return (
    <div className="w-full min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6">
        <Link
          href="/home"
          className="text-slate-500 hover:text-blue-900 font-medium transition-colors"
        >
          &larr; Voltar para eventos
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        {/* Cabeçalho do Evento */}
        <div className="p-8 border-b border-slate-200 bg-slate-50/50">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {event.name}
          </h1>
          <div className="inline-flex bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-700 font-medium shadow-sm">
            📅 {event.date}
          </div>
        </div>

        {/* Corpo da Página */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {/* Coluna da Esquerda: Descrição */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Sobre o evento
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {/* Coluna da Direita: Card de Compra */}
          <div className="md:col-span-1">
            <div className="bg-white border-2 border-slate-100 rounded-xl p-6 flex flex-col gap-6 sticky top-8 shadow-sm">
              {/* Bloco de Preço Adicionado */}
              <div className="flex flex-col gap-1 pb-6 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
                  Valor do Ingresso
                </span>
                <span className="text-4xl font-bold text-blue-900">
                  {formattedPrice}
                </span>
              </div>

              {/* Bloco de Disponibilidade */}
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-800 font-bold text-lg">
                  Disponibilidade
                </h3>

                <div className="flex justify-between items-end mb-1">
                  <span className="text-3xl font-bold text-slate-800">
                    {event.availableTickets}
                  </span>
                  <span className="text-slate-500 text-sm font-medium mb-1">
                    restantes de {event.totalTickets}
                  </span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div
                    className="bg-blue-900 h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${soldPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400 text-right">
                  {soldPercentage}% dos ingressos vendidos
                </p>
              </div>

              {event.availableTickets < 50 && (
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg text-center mt-2">
                  <span className="text-orange-700 text-sm font-semibold">
                    🔥 Corra! Últimos ingressos.
                  </span>
                </div>
              )}

              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white text-lg py-3 rounded-lg font-bold transition-colors duration-300 shadow-md hover:shadow-lg mt-2">
                Garantir Ingresso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
