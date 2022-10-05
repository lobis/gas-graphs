import { actionTypes } from "../actions/gas"

const initialState = { availableGasFiles: { "names": [] }, loadedGases: {} }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_AVAILABLE_GAS_FILES:
            const availableGasFiles = action.payload
            return {
                ...state,
                availableGasFiles: availableGasFiles
            }
        default:
            return state
    }
}

export default reducer