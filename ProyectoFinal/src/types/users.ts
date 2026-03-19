// types/user.ts
export interface User {
  id: string;
  name: string;
  role: 'superadmin' | 'common';
}

// puedes crear un array de usuarios en tu store o mock
export const users: User[] = [
  { id: '1', name: 'superadmin', role: 'superadmin' },
  { id: '2', name: 'cristhian', role: 'common' },
];