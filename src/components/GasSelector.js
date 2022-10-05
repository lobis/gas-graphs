
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getAvailableGasFiles, loadGasFile } from "../actions/gas.js"

const GasSelector = () => {
    const dispatch = useDispatch()

    const availableGasFiles = useSelector(state => state.gas.availableGasFiles)
    const loadedGases = useSelector(state => { console.log("TEST: ", state.gas.loadedGases); return state.gas.loadedGases })

    useEffect(() => {
        // do not load it multiple times
        if (availableGasFiles.names.length > 0) {
            return;
        }
        dispatch(getAvailableGasFiles())
    }, [dispatch, availableGasFiles.names.length]);

    const [selectedGas, setSelectedGas] = useState('');

    // TODO: add loadedGases to dependency array avoiding circular reference
    useEffect(() => {
        // do not load same gas multiple times
        if (selectedGas) {
            dispatch(loadGasFile(selectedGas))
        }
    }, [dispatch, selectedGas]);

    useEffect(() => {
        if (!selectedGas) {
            if (availableGasFiles.names.length > 0) {
                setSelectedGas(availableGasFiles.names[0])
            }
        }
    }, [availableGasFiles, selectedGas]);

    return (
        <div style={{
            justifyContent: 'center', alignItems: 'center', display: 'flex'
        }}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="select-gas-file-label">Gas File</InputLabel>
                    <Select
                        labelId="select-gas-file-label"
                        value={selectedGas}
                        label="Gas File"
                        onChange={(event) => { setSelectedGas(event.target.value) }}
                    >
                        {
                            availableGasFiles.names.map((name, index) => {
                                return <MenuItem key={index} value={name}>{name}</MenuItem>
                            })
                        }

                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}

export default GasSelector;