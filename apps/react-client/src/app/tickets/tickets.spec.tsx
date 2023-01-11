import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Tickets } from './tickets';

import {
  createMemoryHistory,
  Outlet,
  ReactLocation,
  Router,
} from '@tanstack/react-location';

const renderTickets = () => {
  const location = new ReactLocation({
    history: createMemoryHistory({ initialEntries: [`/`] }),
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
            path: '/',
            element: <Tickets />,
          },
        ]}
      >
        <Outlet />
      </Router>
    </QueryClientProvider>
  );
};

describe('Tickets', () => {
  it('should render successfully', async () => {
    renderTickets();

    // Wait for the page to render
    await screen.findByRole('heading');

    // Loader is shown
    expect(screen.queryByText('...')).toBeInTheDocument();

    // Wait for the request
    await waitForElementToBeRemoved(() => screen.getByText('...'));

    // List should be populated with every tickets
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Ticket #1: Install a monitor arm');
    expect(listItems[1]).toHaveTextContent(
      'Ticket #2: Move the desk to the new location'
    );
  });
});
