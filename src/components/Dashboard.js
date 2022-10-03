
import React, { useEffect, useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';

import Graph from "./Graph";

function Dashboard({ data }) {

    const [reducedElectricFieldSelected, setReducedElectricFieldSelected] = useState(false);
    const [quantityToPlot, setQuantityToPlot] = useState("drift-velocity");

    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [xTitle, setXTitle] = useState("");
    const [yTitle, setYTitle] = useState("");

    useEffect(() => {
        if (!reducedElectricFieldSelected) {
            setX(data["electric_field"]);
            setXTitle("Electric Field [V/cm]")
        } else {
            setX(data["electric_field"].map(x => x / data["pressure"]));
            setXTitle("Electric Field / Pressure [V/cm/bar]")
        }
    }, [reducedElectricFieldSelected, data])

    useEffect(() => {
        if (quantityToPlot === "drift-velocity") {
            setY(data["electron_drift_velocity"])
            setYTitle("Drift Velocity (mm/μs)")
        } else if (quantityToPlot === "diffusion") {
            setY(data["electron_longitudinal_diffusion"])
            setYTitle("Diffusion Coefficient [√cm]")
        }
    }, [quantityToPlot, data])

    return (
        <div>
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
                    <FormControlLabel value="diffusion" control={<Radio />} label="Diffusion" />
                </RadioGroup>
                <FormControlLabel control={<Switch
                    checked={reducedElectricFieldSelected}
                    onChange={() => { setReducedElectricFieldSelected(!reducedElectricFieldSelected) }}
                />} label="Reduced Electric Field" />
            </FormControl>

            <Graph x={x} y={y} xTitle={xTitle} yTitle={yTitle} />
        </div>
    );
}

export default Dashboard;
