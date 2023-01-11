import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addTicket } from '../../services/tickets';
import { fetchUsers } from '../../services/users';
import styles from './add-ticket.module.css';

export function AddTicket() {
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery('users', fetchUsers);
  const addTicketMutation = useMutation(addTicket);
  return (
    <div className={styles['container']}>
      <h2>Add a ticket</h2>
      <form
        data-testid="form"
        className={styles['form']}
        onSubmit={(evt) => {
          evt.preventDefault();
          const formElement = evt.target as HTMLFormElement;
          const formData = new FormData(formElement);
          addTicketMutation.mutate(
            {
              description: formData.get('description') as string,
              assigneeId: formData.get('assignee')
                ? Number(formData.get('assignee'))
                : null,
            },
            {
              onSuccess() {
                formElement.reset();
                queryClient.invalidateQueries(['tickets']);
              },
            }
          );
        }}
      >
        <textarea
          className={styles['description']}
          name="description"
          placeholder="Description"
          required
        />
        <label className={styles['assignee']}>
          Assignee
          <select name="assignee" disabled={!isSuccess}>
            {isSuccess &&
              data.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </label>
        <button
          type="submit"
          className={styles['submit']}
          disabled={addTicketMutation.isLoading}
        >
          Add
        </button>
      </form>
    </div>
  );
}
