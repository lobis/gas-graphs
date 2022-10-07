
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Graph({ xData = [], yData = [], names = [], xTitle = "", yTitle = "", colors = [] }) {

    const graphData = xData.map((xPoints, gasIndex) => {
        return xPoints.map((x, index) => {
            return { x: x, [names[gasIndex]]: yData[gasIndex][index] }
        })
    }).flat()

    console.log(colors)

    return (
        <div>
            <ResponsiveContainer width={"100%"} height={"100%"} aspect={2.5}>
                <LineChart

                    data={graphData}

                    margin={{
                        top: 0,
                        right: 20,
                        left: 25,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        allowDataOverflow
                        dataKey="x"
                        label={{ value: xTitle, offset: -10, position: "insideBottom" }}
                        type="number"
                    />


                    <YAxis
                        allowDataOverflow
                        label={{ value: yTitle, angle: -90, position: 'insideLeft', offset: -10 }}
                        type="number"
                    />

                    <Tooltip />

                    {names.map((name, index) => {
                        return <Line key={index} type="monotone" dataKey={name} stroke={colors[index] ? colors[index] : "red"} dot={false} animationDuration={0} />
                    })}

                    <Legend layout="horizontal" verticalAlign="top" align="center" />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Graph;
