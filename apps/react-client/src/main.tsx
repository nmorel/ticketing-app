import { MakeGenerics, ReactLocation, Router } from '@tanstack/react-location';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { App } from './app/app';
import { TicketDetails } from './app/ticket-details/ticket-details';
import { Tickets } from './app/tickets/tickets';
import { fetchTicket, fetchTickets } from './services/tickets';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type LocationGenerics = MakeGenerics<{
  Params: { ticketId: string };
}>;

const location = new ReactLocation<LocationGenerics>();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <Router
      location={location}
      routes={[
        {
          path: '/',
          element: <Tickets />,
          loader: () =>
            queryClient.getQueryData('tickets') ??
            queryClient.fetchQuery('tickets', fetchTickets).then(() => ({})),
        },
        {
          path: '/:ticketId',
          element: <TicketDetails />,
          loader: ({ params: { ticketId } }) =>
            queryClient.getQueryData(['tickets', ticketId]) ??
            queryClient.fetchQuery(['tickets', ticketId], () =>
              fetchTicket(ticketId)
            ),
        },
      ]}
    >
      <App />
    </Router>
    <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>
);
