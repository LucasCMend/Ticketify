export type CreateEvent = {
  name: string;
  description: string;
  date: string;
  totalTickets: number;
};

export type UpdateEvent = {
  name?: string;
  description?: string;
  date?: string;
  totalTickets?: number;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  totalTickets: number;
  availableTickets: number;
  price: number;
};
