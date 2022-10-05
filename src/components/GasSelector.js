
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getAvailableGasFiles } from "../actions/gas.js"

const GasSelector = () => {
    const dispatch = useDispatch()

    const availableGasFiles = useSelector(state => state.gas.availableGasFiles)

    useEffect(() => {
        dispatch(getAvailableGasFiles())
    }, []);

    return (
        <div style={{
            justifyContent: 'center', alignItems: 'center', display: 'flex'
        }}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="select-gas-file-label">Gas File</InputLabel>
                    <Select
                        labelId="select-gas-file-label"
                        value=''
                        label="Gas File"
                        onChange={(event) => { console.log(event) }}
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