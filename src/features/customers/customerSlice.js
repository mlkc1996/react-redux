const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};


/**
 * @enum
*/
const CustomerAction = {
    CREATE: "customer/create",
    UPDATE: "customer/update",
};

export function customerReducer(state = initialStateCustomer, action) {
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