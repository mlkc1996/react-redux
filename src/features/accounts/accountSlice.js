import { createSlice } from "@reduxjs/toolkit";

/**
 * @enum
*/
const AccountAction = {
    DEPOSIT: "account/deposit",
    WITHDRAW: "account/withdraw",
    REQUEST_LOAN: "account/request-loan",
    REPAY_LOAN: "account/repay-loan",
    CONVERT_CURRENCY: "account/convert-currency",
};

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return { payload: { amount, purpose } };
            },
            reducer(state, action) {
                if (state.loan) {
                    return;
                }
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += state.loan;
            }
        },
        repayLoan(state, action) {
            state.balance -= state.loan;
            state.loanPurpose = "";
            state.loan = 0;
        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
});

export const { withdraw, requestLoan, repayLoan } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;

export function deposit(amount, currency) {
    currency = `${currency}`.toUpperCase();

    if (currency === "USD") {
        return { type: "account/deposit", payload: amount };
    }

    return async (dispatch, getState) => {
        dispatch({
            type: "account/convertingCurrency"
        });

        const host = 'api.frankfurter.app';
        const res = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        dispatch({ type: "account/deposit", payload: data.rates.USD });
    };
}