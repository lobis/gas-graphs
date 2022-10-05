import axios from "axios"

export const fetchAvailableGasFiles = () => axios.get(`gas/list.json`)
export const fetchGasJson = (name) => axios.get(`gas/json/${name}`)
export const fetchGasGarfield = (name) => axios.get(`gas/garfield/${name}`)
