import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Nguyễn Duy Tùng' },
    { id: '1', name: 'Mạc Thị Ánh Tuyết' },
    { id: '2', name: 'Mạc Văn Tính' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export default usersSlice.reducer;