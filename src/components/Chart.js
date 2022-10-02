
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart(props) {
    const data = props.data["electric_field"].map((electricField, index) => {
        return {
            electric_field: String(electricField),
            electron_drift_velocity: props.data["electron_drift_velocity"][index],
            "Transversal Diffusion": props.data["electron_transversal_diffusion"][index],
            "Longitudinal Diffusion": props.data["electron_longitudinal_diffusion"][index],
        }
    });

    return (
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    allowDataOverflow
                    dataKey="electric_field"
                    label={{ value: 'Electric Field [V/cm]', offset: 0, position: "insideBottom" }}
                    type="number"
                    padding={{ left: 10, right: 10 }}
                />
                <YAxis
                    allowDataOverflow
                    label={{ value: 'Diffusion Coefficient [√cm]', angle: -90, position: 'insideLeft' }}
                    type="number"
                />

                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Transversal Diffusion" stroke="red" />
                <Line type="monotone" dataKey="Longitudinal Diffusion" stroke="blue" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Chart;
