// types/user.ts
export interface User {
  id: string;
  name: string;
  role: 'superadmin' | 'common';
  // Una imagen se guarda como un string (URL de internet o URI local del dispositivo)
  photo?: string; 
}

// En tu mock, ya no necesitas poner "|| undefined" ni tampoco "photo: undefined" 
// si no quieres, ya que el "?" lo hace opcional.
export const users: User[] = [
  { id: '1', name: 'superadmin', role: 'superadmin' }, 
  { id: '2', name: 'cristhian', role: 'common' },
];