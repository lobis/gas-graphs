
import * as api from "../api"

export const actionTypes = {
    GET_AVAILABLE_GAS_FILES: "GET_AVAILABLE_GAS_FILES",
    LOAD_GAS_FILE: "LOAD_GAS_FILE",
    UPDATE_SELECTED_GASES: "UPDATE_SELECTED_GASES",
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

export const loadGasFile = (gasFile) => async (dispatch) => {
    console.log("actions/loadGasFile")
    try {
        const { data } = await api.fetchGasJson(gasFile)
        dispatch({ type: actionTypes.LOAD_GAS_FILE, payload: { gasFile, data } })
    } catch (error) {
        console.error("actions/loadGasFile:", error.message)
    }
}

export const updateSelectedGases = (gases) => async (dispatch) => {
    console.log("actions/updateSelectedGases")
    dispatch({ type: actionTypes.UPDATE_SELECTED_GASES, payload: gases })
}