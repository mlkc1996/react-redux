import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
};

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

/**
 * @enum
*/
const AccountAction = {
    DEPOSIT: "account/deposit",
    WITHDRAW: "account/withdraw",
    REQUEST_LOAN: "account/request-loan",
    REPAY_LOAN: "account/repay-loan",
};

/**
 * @enum
*/
const CustomerAction = {
    CREATE: "customer/create",
    UPDATE: "customer/update",
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case CustomerAction.CREATE: {
            const {
                fullName,
                nationalID,
                createdAt,
            } = action?.payload || {};
            return { ...state, fullName, nationalID, createdAt };
        }
        case CustomerAction.UPDATE: {
            return { ...state, fullName: action?.payload };
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

export const createCustomer = (fullName, nationalID) => {
    return {
        type: CustomerAction.CREATE, payload: {
            fullName,
            nationalID,
            createdAt: (new Date()).toISOString()
        }
    };
};

export const updateName = (fullName) => {
    return {
        type: CustomerAction.UPDATE, payload: fullName
    };
};

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});

const store = createStore(rootReducer);