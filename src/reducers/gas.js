import { actionTypes } from "../actions/gas"

const initialState = { availableGasFiles: [], loadedGases: {}, selectedGases: [] }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_AVAILABLE_GAS_FILES:
            return {
                ...state,
                availableGasFiles: action.payload
            }
        case actionTypes.LOAD_GAS_FILE:
            return {
                ...state,
                loadedGases: { ...state.loadedGases, [action.payload.filename]: action.payload.data }
            }
        case actionTypes.UPDATE_SELECTED_GASES:
            return {
                ...state,
                selectedGases: action.payload
            }
        default:
            return state
    }
}

export default reducer