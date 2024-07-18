import {createSlice} from '@reduxjs/toolkit';

const ThemeMode = createSlice({
    name: 'ThemeMode',
    initialState: {
        themeMode: 'light',
    },
    reducers: {
        setThemeMode: (state, action) => {
        state.themeMode = action.payload;
        },
    },
});
export const { setThemeMode } = ThemeMode.actions;
export default ThemeMode;