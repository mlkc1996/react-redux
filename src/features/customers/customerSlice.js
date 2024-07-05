import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return { payload: { fullName, nationalID } };
            },
            reducer(state, action) {
                state.createdAt = (new Date()).toISOString();
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
            }
        },
        updateName(state, action) {
            if (!action.payload) {
                return;
            }
            state.fullName = action.payload;
        }
    }
});


/**
 * @enum
*/
const CustomerAction = {
    CREATE: "customer/create",
    UPDATE: "customer/update",
};


export const { createCustomer, updateName } = customerSlice.actions;
export const customerReducer = customerSlice.reducer;