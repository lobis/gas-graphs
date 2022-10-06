
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getAvailableGasFiles, loadGasFile, updateSelectedGases } from "../actions/gas.js"

const GasSelector = () => {
    const dispatch = useDispatch()

    const availableGasFiles = useSelector(state => state.gas.availableGasFiles)
    const selectedGases = useSelector(state => state.gas.selectedGases)
    const loadedGasNames = useSelector(state => Object.keys(state.gas.loadedGases))

    useEffect(() => {
        // do not load it multiple times
        if (availableGasFiles.length > 0) {
            return;
        }
        dispatch(getAvailableGasFiles())
    }, [dispatch, availableGasFiles]);

    // TODO: add loadedGases to dependency array avoiding circular reference
    useEffect(() => {
        // do not load same gas multiple times
        if (selectedGases.length === 0 && availableGasFiles.length > 0) {
            dispatch(updateSelectedGases([availableGasFiles[0].filename]))
        }

        selectedGases.forEach(name => {
            if (!loadedGasNames.includes(name)) {
                dispatch(loadGasFile(name))
            }
        })
    }, [dispatch, selectedGases, availableGasFiles, loadedGasNames]);

    return (
        <div style={{
            justifyContent: 'center', alignItems: 'center', display: 'flex'
        }}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="select-gas-file-label">Gas File</InputLabel>
                    <Select
                        labelId="select-gas-file-label"
                        value={selectedGases.length > 0 ? selectedGases[0] : ""}
                        label="Gas File"
                        onChange={(event) => { dispatch(updateSelectedGases([event.target.value])) }}
                    >
                        {
                            availableGasFiles.map((gas, index) => {
                                return <MenuItem key={index} value={gas.filename}>{gas.filename}</MenuItem>
                            })
                        }

                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}

export default GasSelector;