import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as ticketsApi from '../../services/tickets';

import { AddTicket } from './add-ticket';

const renderAddTicket = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <AddTicket />
    </QueryClientProvider>
  );
};

describe('AddTicket', () => {
  it('should add ticket', async () => {
    renderAddTicket();
    const addTicketSpy = jest.spyOn(ticketsApi, 'addTicket');
    const user = userEvent.setup();

    (await screen.findByRole('textbox')).focus();
    await user.keyboard('Test');

    await screen.findAllByRole('option');

    await user.selectOptions(screen.getByRole('combobox'), '3');

    await user.click(screen.getByRole('button'));

    expect(addTicketSpy).toHaveBeenCalledWith({
      description: 'Test',
      assigneeId: 3,
    });
  });
});
