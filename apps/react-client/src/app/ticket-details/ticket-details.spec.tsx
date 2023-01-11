import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { TicketDetails } from './ticket-details';

import {
  createMemoryHistory,
  Outlet,
  ReactLocation,
  Router,
} from '@tanstack/react-location';

const renderTicketDetails = (ticketId: number) => {
  const location = new ReactLocation({
    history: createMemoryHistory({ initialEntries: [`/${ticketId}`] }),
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <Router
        location={location}
        routes={[
          {
            path: '/:ticketId',
            element: <TicketDetails />,
          },
        ]}
      >
        <Outlet />
      </Router>
    </QueryClientProvider>
  );
};

describe('TicketDetails', () => {
  it('should render successfully', async () => {
    renderTicketDetails(1);

    // Wait for the page to render
    await screen.findByRole('heading');

    // Loader is shown
    expect(screen.queryByText('...')).toBeInTheDocument();

    // Header is shown
    expect(screen.queryByRole('heading')).toHaveTextContent('Ticket #1');

    // Wait for the request
    await waitForElementToBeRemoved(() => screen.getByText('...'));

    // Description is shown
    expect(screen.queryByText('Install a monitor arm')).toBeInTheDocument();
  });

  it('should render a 404', async () => {
    renderTicketDetails(3);

    // Wait for the page to render
    await screen.findByRole('heading');

    // Loader is shown
    expect(screen.queryByText('...')).toBeInTheDocument();

    // Header is shown
    expect(screen.queryByRole('heading')).toHaveTextContent('Ticket #3');

    // Wait for the request
    await waitForElementToBeRemoved(() => screen.getByText('...'));

    // Error is shown
    expect(screen.queryByText('Not found')).toBeInTheDocument();
  });

  it('should render an error', async () => {
    renderTicketDetails(NaN);

    // Wait for the page to render
    await screen.findByRole('heading');

    // Loader is shown
    expect(screen.queryByText('...')).toBeInTheDocument();

    // Header is shown
    expect(screen.queryByRole('heading')).toHaveTextContent('Ticket #NaN');

    // Wait for the request
    await waitForElementToBeRemoved(() => screen.getByText('...'));

    // Error is shown
    expect(screen.queryByText('Error')).toBeInTheDocument();
  });
});
