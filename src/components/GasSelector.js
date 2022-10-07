
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { getAvailableGasFiles, loadGasFile, updateSelectedGases } from "../actions/gas.js"
import ColorPicker from "./ColorPicker.js"

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
            <TableContainer component={Paper} style={{ "margin": 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Gas File</TableCell>
                            <TableCell align="right">Composition</TableCell>
                            <TableCell align="right">Pressure&nbsp;(bar)</TableCell>
                            <TableCell align="right">Temperature&nbsp;(ºC)</TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell align="right">
                                <IconButton disabled={true}>
                                    <AddBoxOutlinedIcon color="success" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {availableGasFiles.filter(gas => { return selectedGases.includes(gas.filename) }).map((gas, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    {
                                        <Select
                                            labelId="select-gas-file-label"
                                            value={gas.filename}
                                            label="Gas File"
                                            onChange={(event) => { dispatch(updateSelectedGases([event.target.value])) }}
                                        >
                                            {
                                                availableGasFiles.map((gas, index) => {
                                                    return <MenuItem key={index} value={gas.filename}>{
                                                        gas.components.labels.map((label, index) => {
                                                            const fraction = (gas.components.fractions[index] * 100).toPrecision(3);
                                                            return [label, fraction.toString() + "%"].join(" ")
                                                        }).join(" ")
                                                    }</MenuItem>
                                                })
                                            }

                                        </Select>
                                    }
                                </TableCell>
                                <TableCell align="right">{
                                    // TODO: not duplicate this code
                                    gas.components.labels.map((label, index) => {
                                        const fraction = (gas.components.fractions[index] * 100).toPrecision(3);
                                        return [label, fraction.toString() + "%"].join(" ")
                                    }).join(" ")
                                }</TableCell>
                                <TableCell align="right">{gas.pressure.toPrecision(3)}</TableCell>
                                <TableCell align="right">{gas.temperature.toPrecision(3)}</TableCell>
                                <TableCell align="right">
                                    {
                                        <ColorPicker />
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        <IconButton aria-label="delete">
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        <IconButton aria-label="delete" disabled={selectedGases.length <= 1}>
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default GasSelector;