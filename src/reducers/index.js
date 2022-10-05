import { configureStore } from '@reduxjs/toolkit'

import gas from "./gas"

const store = configureStore({
    reducer: {
        gas,
    }
})

export default store