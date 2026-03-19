// types/user.ts
export interface User {
  id: string;
  name: string;
  role: 'superadmin' | 'cristhian';
}

// puedes crear un array de usuarios en tu store o mock
export const users: User[] = [
  { id: '1', name: 'SuperAdmin', role: 'superadmin' },
  { id: '2', name: 'Cristhian', role: 'cristhian' },
];