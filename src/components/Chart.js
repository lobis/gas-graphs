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
  const [colordash, setColordash] = useState('');
  useEffect(() => {
    if (selectedOption?.value === 'Drift Velocity') {
      setYname({ value: 'Drift Velocity [cm/μs]', label: 'Drift Velocity [cm/μs]' });
    } else if (selectedOption?.value === 'Diffusion Coefficient') {
      setYname({ value: 'Diffusion Coefficient [√cm]', label: 'Diffusion Coefficient [√cm]' });
    } else if (selectedOption?.value === 'Transversal Diffusion') {
      setYname({ value: 'Diffusion Coefficient [√cm]', label: 'Diffusion Coefficient [√cm]' });
    }
  }, [selectedOption]);

  useEffect(() => {
    if (selectedOption2?.value === 'Electric Field') {
      setXname({ value: 'Electric Field', label: 'Electric Field' });
    } else if (selectedOption2?.value === 'Reduced Electric Field') {
      setXname({ value: 'Reduced Electric Field', label: 'Reduced Electric Field' });
    } else if (selectedOption2?.value === 'Logarithmic Electric Field') {
      setXname({ value: 'Logarithmic Electric Field', label: 'Logarithmic Electric Field' });
    }
  }, [selectedOption2]);


const [XAxisSettings, setXAxisSettings] = useState({ scale: '', domain: [] , type: '', ticks: []});
  useEffect(() => {
    if (selectedOption2?.value === 'Electric Field') {
      setXAxisSettings({ scale: 'auto', domain: [0, 250, 500, 750, 1000] , type: 'number' , ticks: [0, 250, 500, 750, 1000]});
    } else if (selectedOption2?.value === 'Reduced Electric Field') {
      setXAxisSettings({ scale: 'auto', domain: [0, 200, 400, 714, 1000] , type: 'number', ticks: [0, 200, 400, 714, 1000]});
    } else if (selectedOption2?.value === 'Logarithmic Electric Field') {
      setXAxisSettings({ scale: 'log', domain: [0.1, 1, 10 ,100 ,1000] , type: 'number', ticks: [0.1, 1, 10 ,100 ,1000]});
    }
  }, [selectedOption2]);
  
  return (
    <div>
      <div className="chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={Xname?.value}
              type={XAxisSettings.type}
              scale={XAxisSettings.scale}
              domain={XAxisSettings.domain}
              label={{ value: Xname?.value, position: 'insideBottom', offset: -15 }}
              ticks={XAxisSettings.ticks}
            />
            <YAxis label={{ value: Yname?.value, angle: -90, position: 'insideLeft', offset: 8, dy: 100 }} />
            {data.map((series, index) => (
              <Line
                key={index}
                data={series}
                dot={false}
                activeDot={{ stroke: 'blue', strokeWidth: 2, r: 5 }}
                strokeWidth={5}
                type="monotone"
                dataKey={selectedOption?.value}
                stroke={colordash[index]}
               />
            ))}
            <Tooltip formatter={(value) => [value, Yname?.value]} separator="=" labelFormatter={(value) => [value, Xname?.value]} position={{ x: 0, y: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Dashboard
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOption2={selectedOption2}
        setSelectedOption2={setSelectedOption2}
        setData={setData}
        setColordash={setColordash}
        colordash={colordash}
      />
    </div>
  );
};

export default Chart;
