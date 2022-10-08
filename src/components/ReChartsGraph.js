
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Graph({ xData = [], yData = [], names = [], xTitle = "", yTitle = "", colors = [] }) {

    if (xData.length !== yData.length || xData.length !== names.length || xData.length !== colors.length) {
        // some data may be ready earlier than others
        // this causes a "flashing" effect that is not desirable
        return
    }

    const graphData = xData.map((xPoints, gasIndex) => {
        return xPoints.map((x, index) => {
            return { x: x, [names[gasIndex]]: yData[gasIndex][index] }
        })
    }).flat()

    return (
        <div>
            <ResponsiveContainer width={"100%"} height={"100%"} aspect={2.5}>
                <LineChart

                    data={graphData}

                    margin={{
                        top: 0,
                        right: 20,
                        left: 10,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        allowDataOverflow
                        dataKey="x"
                        label={{ value: xTitle, offset: -10, position: "insideBottom" }}
                        domain={[Math.round(Math.min(...graphData.map(entry => entry.x))), Math.round(Math.max(...graphData.map(entry => entry.x)))]}
                        type="number"
                    />


                    <YAxis
                        allowDataOverflow
                        label={{ value: yTitle, angle: -90, position: 'insideLeft', offset: 5 }}
                        type="number"
                    />

                    <Tooltip />

                    {xData.map((x, index) => {
                        return <Line key={index} type="linear" dataKey={names[index]} stroke={colors[index] ? colors[index] : "red"} dot={x.length < 100} animationDuration={0} />
                    })}

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Graph;
