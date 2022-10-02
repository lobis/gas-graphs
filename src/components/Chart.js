
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';

function Chart(props) {

    const [reducedElectricField, setReducedElectricField] = useState(false);
    const [quantityToPlot, setQuantityToPlot] = useState("drift-velocity");

    const referencePressure = props.data["pressure"];
    const data = props.data["electric_field"].map((electricField, index) => {
        return {
            "Electric Field": electricField,
            "Reduced Electric Field": electricField / referencePressure,
            "Drift Velocity": props.data["electron_drift_velocity"][index],
            "Transversal Diffusion": props.data["electron_transversal_diffusion"][index],
            "Longitudinal Diffusion": props.data["electron_longitudinal_diffusion"][index],
        }
    });


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
                    checked={reducedElectricField}
                    onChange={() => { setReducedElectricField(!reducedElectricField) }}
                    inputProps={{ 'aria-label': 'controlled' }}
                />} label="Reduced Electric Field" />
            </FormControl>

            <ResponsiveContainer width={"100%"} height={"100%"} aspect={2.5}>
                <LineChart

                    data={data}
                    margin={{
                        top: 0,
                        right: 20,
                        left: 25,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3   3" />

                    {(() => {
                        switch (reducedElectricField) {
                            case true: return <XAxis
                                allowDataOverflow
                                dataKey="Reduced Electric Field"
                                label={{ value: 'Electric Field / Pressure [V/cm/bar]', offset: -10, position: "insideBottom" }}
                                type="number"
                            />;
                            case false: return <XAxis
                                allowDataOverflow
                                dataKey="Electric Field"
                                label={{ value: 'Electric Field [V/cm]', offset: -10, position: "insideBottom" }}
                                type="number"
                            />
                        }
                    })()}

                    {(() => {
                        switch (quantityToPlot) {
                            case "drift-velocity": return (
                                <>
                                    <YAxis
                                        allowDataOverflow
                                        label={{ value: 'Drift Velocity (mm/μs)', angle: -90, position: 'insideLeft', offset: -10 }}
                                        type="number"
                                    />
                                    <Line type="monotone" dataKey="Drift Velocity" stroke="red" />
                                </>
                            );
                            case "diffusion": return (
                                <>
                                    <YAxis
                                        allowDataOverflow
                                        label={{ value: 'Diffusion Coefficient [√cm]', angle: -90, position: 'insideLeft', offset: -10 }}
                                        type="number"
                                    />
                                    <Line type="monotone" dataKey="Transversal Diffusion" stroke="magenta" />
                                    <Line type="monotone" dataKey="Longitudinal Diffusion" stroke="teal" />
                                </>
                            );
                        }
                    })()}

                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="top" align="center" />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
