/**
 * @enum
*/
const AccountAction = {
    DEPOSIT: "account/deposit",
    WITHDRAW: "account/withdraw",
    REQUEST_LOAN: "account/request-loan",
    REPAY_LOAN: "account/repay-loan",
};

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
};

export function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case AccountAction.DEPOSIT:
            return {
                ...state,
                balance: action.payload + state.balance
            };
        case AccountAction.WITHDRAW:
            return {
                ...state,
                balance: state.balance - action.payload
            };
        case AccountAction.REQUEST_LOAN: {
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            };
        }
        case AccountAction.REPAY_LOAN: {
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            };
        }
        default:
            return state;
    }
}

export const deposit = (amount) => {
    return { type: AccountAction.DEPOSIT, payload: amount };
};

export const withdraw = (amount) => {
    return { type: AccountAction.WITHDRAW, payload: amount };
};

export const requestLoan = (amount, purpose) => {
    return { type: AccountAction.REQUEST_LOAN, payload: { amount, purpose } };
};

export const repayLoan = () => {
    return { type: AccountAction.REPAY_LOAN };
};