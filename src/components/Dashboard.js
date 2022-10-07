
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';

import GasSelector from "./GasSelector";
import Graph from "./ReChartsGraph";
//import Graph from "./RootGraph";

import { colorRGBToHex } from "./ColorPicker"

function Dashboard() {

    const selectedGases = useSelector(state => state.gas.selectedGases)
    const loadedGases = useSelector(state => state.gas.loadedGases)

    const [selectedGasesData, setSelectedGasesData] = useState([]);

    useEffect(() => {
        setSelectedGasesData(Array.from(selectedGases.map(gas => gas.visibility ? loadedGases[gas.filename] : undefined)).filter(x => x !== undefined))
    }, [loadedGases, selectedGases])

    const [reducedElectricFieldSelected, setReducedElectricFieldSelected] = useState(false);
    const [quantityToPlot, setQuantityToPlot] = useState("drift-velocity");

    const [xTitle, setXTitle] = useState("");
    const [yTitle, setYTitle] = useState("");

    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        setXTitle(!reducedElectricFieldSelected ? "Electric Field [V/cm]" : "Electric Field / Pressure [V/cm/bar]")
        setXData(selectedGasesData.map(data => {
            return !reducedElectricFieldSelected ? data.electric_field : data.electric_field.map(e => e / data.pressure)
        }))

    }, [reducedElectricFieldSelected, selectedGasesData])

    useEffect(() => {
        if (quantityToPlot === "drift-velocity") {
            setYTitle("Drift Velocity (cm/μs)")
            setYData(selectedGasesData.map(data => {
                return data.electron_drift_velocity.map(x => x * 1000)
            }))
        } else if (quantityToPlot === "longitudinal-diffusion") {
            setYTitle("Diffusion Coefficient [√cm]")
            setYData(selectedGasesData.map(data => {
                return data.electron_longitudinal_diffusion
            }))
        } else if (quantityToPlot === "transversal-diffusion") {
            setYTitle("Diffusion Coefficient [√cm]")
            setYData(selectedGasesData.map(data => {
                return data.electron_transversal_diffusion
            }))
        }
    }, [quantityToPlot, selectedGasesData])

    //    console.log("DATA: ", xData, yData)

    return (
        <div>
            <GasSelector />
            <FormControl id="plot-selection" style={{
                justifyContent: 'center', alignItems: 'center', display: 'flex'
            }}>
                <FormLabel>Graph Options</FormLabel>
                <RadioGroup
                    row
                    name="controlled-radio-buttons-group"
                    value={quantityToPlot}
                    onChange={(event) => { setQuantityToPlot(event.target.value) }}
                >
                    <FormControlLabel value="drift-velocity" control={<Radio />} label="Drift Velocity" />
                    <FormControlLabel value="longitudinal-diffusion" control={<Radio />} label="Longitudinal Diffusion" />
                    <FormControlLabel value="transversal-diffusion" control={<Radio />} label="Transversal Diffusion" />
                </RadioGroup>
                <FormControlLabel control={<Switch
                    checked={reducedElectricFieldSelected}
                    onChange={() => { setReducedElectricFieldSelected(!reducedElectricFieldSelected) }}
                />} label="Reduced Electric Field" />
            </FormControl>

            <Graph xTitle={xTitle} yTitle={yTitle} xData={xData} yData={yData} names={selectedGases.map(gas => gas.filename)} colors={selectedGases.map(gas => colorRGBToHex(gas.color))} />
        </div>
    );

}

export default Dashboard;
