import wretch from 'wretch';

import { User } from '@acme/shared-models';

export function fetchUsers() {
  return wretch(`/api/users`).get().json<User[]>();
}

export function fetchUser(userId: string) {
  return wretch(`/api/users/${userId}`).get().json<User>();
}
