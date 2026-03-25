
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'common';
  photo?: string; 
}
