
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Chart(props) {
    const [quantityToPlot, setQuantityToPlot] = useState("drift-velocity");

    const data = props.data["electric_field"].map((electricField, index) => {
        return {
            "Electric Field": String(electricField),
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
                <FormLabel>Graph</FormLabel>
                <RadioGroup
                    row
                    name="controlled-radio-buttons-group"
                    value={quantityToPlot}
                    onChange={(event) => { setQuantityToPlot(event.target.value) }}
                >
                    <FormControlLabel value="drift-velocity" control={<Radio />} label="Drift Velocity" />
                    <FormControlLabel value="diffusion" control={<Radio />} label="Diffusion" />
                </RadioGroup>
            </FormControl>
            <ResponsiveContainer width={"100%"} height={"100%"} aspect={2.5}>
                <LineChart

                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3   3" />
                    <XAxis
                        allowDataOverflow
                        dataKey="Electric Field"
                        label={{ value: 'Electric Field [V/cm]', offset: 0, position: "insideBottom" }}
                        type="number"
                        padding={{ left: 10, right: 10 }}
                    />

                    {(() => {
                        switch (quantityToPlot) {
                            case "drift-velocity": return (
                                <>
                                    <YAxis
                                        allowDataOverflow
                                        label={{ value: 'Drift Velocity (mm/μs)', angle: -90, position: 'insideLeft', offset: 0 }}
                                        type="number"
                                    />
                                    <Line type="monotone" dataKey="Drift Velocity" stroke="red" />
                                </>
                            );
                            case "diffusion": return (
                                <>
                                    <YAxis
                                        allowDataOverflow
                                        label={{ value: 'Diffusion Coefficient [√cm]', angle: -90, position: 'insideLeft' }}
                                        type="number"
                                    />
                                    <Line type="monotone" dataKey="Transversal Diffusion" stroke="magenta" />
                                    <Line type="monotone" dataKey="Longitudinal Diffusion" stroke="teal" />
                                </>
                            );
                        }
                    })()}

                    <Tooltip />
                    <Legend />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
