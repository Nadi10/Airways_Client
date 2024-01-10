import { createSlice } from "@reduxjs/toolkit";
import { fetchAvailableTickets, orderTickets } from "./flights.actions";
import { Ticket } from "../types/ticket-dto.type";

interface FlightsState {
  availableTickets: {
    data: {
      there: Array<Array<Ticket>>;
      back: Array<Array<Ticket>>;
    };
  } | null;
  selectedTickets: {
    there: Array<Ticket> | null;
    back: Array<Ticket> | null;
  };
  pending: boolean;
  error: string | null;
  passengerCount: number | null;
}

const initialState: FlightsState = {
  availableTickets: null,
  selectedTickets: {
    there: null,
    back: null,
  },
  pending: false,
  error: null,
  passengerCount: null,
};

export const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    selectTicket: (state, action) => {
      const { ticketType, ticket } = action.payload;
      if (ticketType === "there") state.selectedTickets.there = ticket;
      if (ticketType === "back") state.selectedTickets.back = ticket;
    },
    selectPassengerCount: (state, action) => {
      state.passengerCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTickets.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchAvailableTickets.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.availableTickets = payload;
      })
      .addCase(
        fetchAvailableTickets.rejected,
        (state, action: any & { payload: any }) => {
          state.pending = false;
          state.error = action.payload.error;
        }
      )
      .addCase(orderTickets.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(orderTickets.fulfilled, (state, { payload }) => {
        state.pending = false;
      })
      .addCase(
        orderTickets.rejected,
        (state, action: any & { payload: any }) => {
          state.pending = false;
          state.error = action.payload.error;
        }
      );
  },
});

export const { selectTicket, selectPassengerCount } = flightsSlice.actions;
