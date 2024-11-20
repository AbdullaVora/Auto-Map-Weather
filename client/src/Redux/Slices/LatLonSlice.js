import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    latitude: 21.1,
    longitude: 72.8,
    city: '',
}

export const location = createSlice({
    name: 'location',
    initialState,

    reducers: {
        getLocation: (state, action) => {
            const { latitude, longitude, city } = action.payload;
            state.latitude = latitude;
            state.longitude = longitude;
            state.city = city
            // console.log('Slice:= ' + latitude, longitude);
        }

    }
})

export const { getLocation } = location.actions
export default location.reducer