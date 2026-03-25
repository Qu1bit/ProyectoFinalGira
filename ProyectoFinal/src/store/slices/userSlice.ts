import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/users';

interface UserState {
  users: User[];
}

// Inicializamos con tus usuarios locales actuales
const initialState: UserState = {
  users: [
    { id: '1', 
      name: 'superadmin',
      email: 'admin@gira.com', 
      role: 'superadmin' 
    }, 
    { id: '2', 
      name: 'cristhian',
      email: 'cristhian@gira.com', 
      role: 'common' 
    },
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;