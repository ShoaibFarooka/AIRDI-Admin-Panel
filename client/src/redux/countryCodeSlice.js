// import { createSlice } from '@reduxjs/toolkit';
// import countryData from 'country-data';

// const countryCodeSlice = createSlice({
//     name: 'countryCode',
//     initialState: {
//         codes: [],
//     },
//     reducers: {
//         setCountryCodes: (state, action) => {
//             state.codes = action.payload;
//         },
//     },
// });

// export const { setCountryCodes } = countryCodeSlice.actions;

// export const fetchCountryCodes = () => async (dispatch) => {
//     const codes = countryData.all.map((country) => ({
//         label: `${country.name} (+${country.countryCallingCodes[0]})`,
//         value: `+${country.countryCallingCodes[0]}`,
//     }));
//     dispatch(setCountryCodes(codes));
// };

// export const selectCountryCodes = (state) => state.countryCode.codes;

// export default countryCodeSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import countryData from 'country-data';

const initialState = {
    countryCodes: [],
};

export const countryCodeSlice = createSlice({
    name: 'countryCode',
    initialState,
    reducers: {
        setCountryCodes: (state, action) => {
            state.countryCodes = action.payload;
        },
    },
});

export const { setCountryCodes } = countryCodeSlice.actions;

// Thunk to fetch country codes
export const fetchCountryCodes = () => (dispatch) => {
    const codes = countryData.callingCountries.all.map((country) => ({
        label: `${country.name} (${country.countryCallingCodes[0]})`,
        value: `${country.countryCallingCodes[0]}`,
    }));
    dispatch(setCountryCodes(codes));
};

// Selector to get country codes
export const selectCountryCodes = (state) => state.countryCode.countryCodes;

export default countryCodeSlice.reducer;
