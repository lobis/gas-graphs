
import * as api from "../api"

export const actionTypes = {
    GET_AVAILABLE_GAS_FILES: "GET_AVAILABLE_GAS_FILES",
    LOAD_GAS_FILE: "LOAD_GAS_FILE",
}

export const getAvailableGasFiles = () => async (dispatch) => {
    console.log("actions/getAvailableGasFiles")
    try {
        const { data } = await api.fetchAvailableGasFiles()
        dispatch({ type: actionTypes.GET_AVAILABLE_GAS_FILES, payload: data })
    } catch (error) {
        console.error("actions/getAvailableGasFiles:", error.message)
    }
}