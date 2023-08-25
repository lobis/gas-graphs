import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Dashboard from './Dashboard';
import '../style/Chart.css';

const Chart = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ value: 'Drift Velocity', label: 'Drift Velocity' });
  const [selectedOption2, setSelectedOption2] = useState({ value: 'Electric Field', label: 'Electric Field' });
  const [Yname, setYname] = useState({ value: '', label: '' });
  const [Xname, setXname] = useState({ value: '', label: '' });
  const [xDataKey, setXDataKey] = useState('Electric Field');
  const [dashboards, setDashboards] = useState([
    {
      id: 1,
      firstGas: 'Ar',
      secondGas: 'CH4',
      valueFirstGas: '80.0',
      valueSecondGas: '20.0',
    },
  ]);

  useEffect(() => {
    setData([]);
  }, [dashboards]);
  
  const handleYnameChange = (value) => {
    setYname(value);
  };

  const handleXnameChange = (value) => {
    setXname(value);
  };

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {payload.value.toFixed(0)}
        </text>
      </g>
    );
  };
const [XAxisSettings, setXAxisSettings] = useState({ scale: 'auto', domain: [0, 1000] });
  useEffect(() => {
    setXDataKey(selectedOption2.value);
  
    const xScale = selectedOption2.value === 'Logarithmic Electric Field' ? 'log' : 'auto';
    const xDomain = selectedOption2.value === 'Logarithmic Electric Field' ? [0.1, 1000] : [0, 1000];
    setXAxisSettings({ scale: xScale, domain: xDomain });
  }, [selectedOption2]);

  return (
    <div>
      <Dashboard
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOption2={selectedOption2}
        setSelectedOption2={setSelectedOption2}
        handleYnameChange={handleYnameChange}
        handleXnameChange={handleXnameChange}
        dashboards={dashboards}
        setDashboards={setDashboards}
        setData={setData}
        setXDataKey={setXDataKey}
      />
      <div className="chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xDataKey}
              type="number"
              scale={XAxisSettings.scale}
              domain={XAxisSettings.domain}
              tick={<CustomizedAxisTick />}
              label={{ value: Xname?.value, position: 'insideBottom', offset: -15 }}
            />
            <YAxis label={{ value: Yname?.value, angle: -90, position: 'insideLeft', offset: 8, dy: 100 }} />
            {data.map((series, index) => (
              <Line key={index} data={series} dot={false} activeDot={{ stroke: 'blue', strokeWidth: 2, r: 5 }} type="monotone" dataKey={selectedOption?.value} />
            ))}
            <Tooltip formatter={(value) => [value, Yname?.value]} separator="=" labelFormatter={(value) => [value, Xname?.value]} position={{ x: 0, y: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
