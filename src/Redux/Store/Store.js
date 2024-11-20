import { configureStore } from "@reduxjs/toolkit";
import location from '../Slices/LatLonSlice';

const store = configureStore({
    reducer: location
})

export default store;