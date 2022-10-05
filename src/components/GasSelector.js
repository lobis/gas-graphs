
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react';

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

    useEffect(() => {
        // do not load it multiple times
        if (availableGasFiles.names.length > 0) {
            return;
        }
        dispatch(getAvailableGasFiles())
    }, [dispatch, availableGasFiles.names.length]);

    // TODO: add loadedGases to dependency array avoiding circular reference
    useEffect(() => {
        // do not load same gas multiple times
        if (selectedGases.length > 0) {
            dispatch(loadGasFile(selectedGases[0]))
        }
    }, [dispatch, selectedGases]);

    useEffect(() => {
        if (selectedGases.length === 0) {
            if (availableGasFiles.names.length > 0) {
                dispatch(updateSelectedGases([availableGasFiles.names[0]]))
            }
        }
    }, [availableGasFiles, selectedGases]);

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