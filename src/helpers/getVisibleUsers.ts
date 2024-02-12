import { User } from "../types/User";

export const getVisibleUsers = (users: User[], query: string, sort: string, order: string) => {
  let visibleUsers = [...users];

  if (query) {
    visibleUsers = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
  }

  if (sort) {
    visibleUsers = visibleUsers.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (order) {
    visibleUsers.reverse();
  }

  return visibleUsers;
}