import React, { createContext, useContext, useState, ReactNode } from "react";

export type Reservation = {
  id: string;
  vetName: string;
  serviceName: string;
  dateISO: string;
  time: string;
};

type ReservationsContextType = {
  reservations: Reservation[];
  addReservation: (r: Omit<Reservation, "id">) => void;
  removeReservation: (id: string) => void;
};

const ReservationsContext = createContext<ReservationsContextType | undefined>(
  undefined
);

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  function addReservation(r: Omit<Reservation, "id">) {
    const id = String(Date.now());
    setReservations((prev) => [{ id, ...r }, ...prev]);
  }

  function removeReservation(id: string) {
    setReservations((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <ReservationsContext.Provider
      value={{ reservations, addReservation, removeReservation }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const ctx = useContext(ReservationsContext);
  if (!ctx)
    throw new Error("useReservations must be used within ReservationsProvider");
  return ctx;
}
