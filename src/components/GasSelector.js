
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from 'react';

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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { getAvailableGasFiles, loadGasFile, updateSelectedGases } from "../actions/gas.js"
import ColorPicker, { getDefaultColor } from "./ColorPicker.js"

const GasSelector = () => {
    const dispatch = useDispatch()

    const availableGasFiles = useSelector(state => state.gas.availableGasFiles)
    const selectedGases = useSelector(state => state.gas.selectedGases)
    const loadedGases = useSelector(state => state.gas.loadedGases)

    useEffect(() => {
        // do not load it multiple times
        if (availableGasFiles.length > 0) {
            return;
        }
        dispatch(getAvailableGasFiles())
    }, [dispatch, availableGasFiles]);

    useEffect(() => {
        if (selectedGases.length === 0 && availableGasFiles.length >= 3) {
            dispatch(updateSelectedGases([getGasSelectionObject(availableGasFiles[0])]))
        }
    }, [dispatch, selectedGases, availableGasFiles]);

    useEffect(() => {
        // do not load same gas multiple times
        selectedGases.forEach(entry => {
            if (!Object.keys(loadedGases).includes(entry.filename)) {
                dispatch(loadGasFile(entry.filename))
            }
        })
    }, [dispatch, selectedGases, loadedGases])

    const getGasSelectionObject = (gas) => { return { ...gas, visibility: true, color: getDefaultColor(0) } }
    return (
        <div style={{
            justifyContent: 'center', alignItems: 'center', display: 'flex'
        }}>
            <TableContainer component={Paper} style={{ margin: 20 }} sx={{ minWidth: 650, maxWidth: 1000, margin: 50 }}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Gas File</TableCell>
                            <TableCell align="right">Composition</TableCell>
                            <TableCell align="right">Pressure (bar)</TableCell>
                            <TableCell align="right">Temperature (ºC)</TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell align="right">
                                <IconButton disabled={selectedGases.length >= 5} onClick={() => {
                                    const nSelectedGases = selectedGases.length
                                    const gas = getGasSelectionObject(availableGasFiles[Math.min(nSelectedGases, availableGasFiles.length - 1)])
                                    gas.color = getDefaultColor(nSelectedGases)
                                    dispatch(updateSelectedGases([...selectedGases, gas]))
                                }}>
                                    <AddBoxOutlinedIcon color="success" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedGases.map((gas, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    {
                                        <Autocomplete
                                            disablePortal
                                            options={availableGasFiles.map(
                                                gas => gas.filename
                                            )}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Gas File" />}
                                            value={gas.filename}
                                            onInputChange={(event, newInputValue) => {
                                            }}
                                            onChange={(event, newValue) => {
                                                if (newValue !== null) {
                                                    const newGas = availableGasFiles.filter(entry => entry.filename === newValue)[0]
                                                    const newSelectedGases = [...selectedGases]
                                                    newSelectedGases[index] = getGasSelectionObject(newGas)
                                                    dispatch(updateSelectedGases(newSelectedGases))
                                                }
                                            }}
                                        />
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
                                        <ColorPicker initialColor={gas.color} setColor={(newColor) => {
                                            const newSelectedGases = [...selectedGases]
                                            newSelectedGases[index] = { ...newSelectedGases[index], color: newColor }
                                            dispatch(updateSelectedGases(newSelectedGases))
                                        }} index={index} />
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        <IconButton onClick={() => {
                                            const newSelectedGases = [...selectedGases]
                                            newSelectedGases[index] = { ...newSelectedGases[index], visibility: !newSelectedGases[index].visibility }
                                            dispatch(updateSelectedGases(newSelectedGases))
                                        }} >
                                            {gas.visibility ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                        </IconButton>
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        <IconButton aria-label="delete" disabled={selectedGases.length <= 1} onClick={() => {
                                            const newSelectedGases = [...selectedGases]
                                            newSelectedGases.splice(index, 1)
                                            dispatch(updateSelectedGases(newSelectedGases))
                                        }}>
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