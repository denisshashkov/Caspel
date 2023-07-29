import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  name: string;
  date: string;
  age: number;
}

const initialState = {
  users: [
    {
      id: 1,
      name: 'name1',
      date: '19.12.23',
      age: 12,
    },
    {
      id: 2,
      name: 'name2',
      date: '11.09.22',
      age: 19,
    },
    {
      id: 3,
      name: 'name3',
      date: '17.01.21',
      age: 11,
    },
    {
      id: 4,
      name: 'name4',
      date: '01.01.19',
      age: 78,
    },
    {
      id: 5,
      name: 'name5',
      date: '23.08.24',
      age: 52,
    },
  ],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const randomId = Math.floor(Math.random() * 100);
      const newUser = { ...action.payload, id: randomId };
      state.users.push(newUser);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    editUser: (state, action) => {
      const { id, name, date, age } = action.payload;

      const userIndex = state.users.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          name,
          date,
          age,
        };
      }
    },
  },
});

export const { addUser, removeUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;
