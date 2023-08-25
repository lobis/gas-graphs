// Dashboard.js
import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../style/Dashboard.css';
import API from '../api/api';

const Dashboard = ({
  selectedOption,
  setSelectedOption,
  setSelectedOption2,
  selectedOption2,
  handleYnameChange,
  handleXnameChange,
  setData,
  setXDataKey,

}) => {
  const [dashboards, setDashboards] = useState([
    {
      id: 1,
      firstGas: 'Ar',
      secondGas: 'CH4',
      valueFirstGas: '80.0',
      valueSecondGas: '20.0',
    },
  ]);
  const handleAddDashboard = () => {
    const newId = dashboards.length > 0 ? dashboards[dashboards.length - 1].id + 1 : 1;
    const newDashboard = {
      id: newId,
      firstGas: 'Ar',
      secondGas: 'C4H10',
      valueFirstGas: '80.0',
      valueSecondGas: '20.0',
    };
    setDashboards((prevDashboards) => [...prevDashboards, newDashboard]);
  };
  const handleRemoveDashboard = (id) => {
    setDashboards((prevDashboards) => prevDashboards.filter((dashboard) => dashboard.id !== id));
  };
  const handleFirstGasChange = (event, dashboardId) => {
    const { value } = event.target;
    setDashboards((prevDashboards) =>
      prevDashboards.map((dashboard) =>
        dashboard.id === dashboardId ? { ...dashboard, firstGas: value } : dashboard
      )
    );
  };
  const handleSecondGasChange = (event, dashboardId) => {
    const { value } = event.target;
    setDashboards((prevDashboards) =>
      prevDashboards.map((dashboard) =>
        dashboard.id === dashboardId ? { ...dashboard, secondGas: value } : dashboard
      )
    );
  };
  const handleFirstGasSliderChange = (event, newValue, dashboardId) => {
    const formattedValue = newValue.toFixed(1);
    setDashboards((prevDashboards) =>
      prevDashboards.map((dashboard) =>
        dashboard.id === dashboardId
          ? {
              ...dashboard,
              valueFirstGas: formattedValue,
              valueSecondGas: (100.0 - newValue).toFixed(1),
            }
          : dashboard
      )
    );
  };
  
  const handleSecondGasSliderChange = (event, newValue, dashboardId) => {
    const formattedValue = newValue.toFixed(1);
    setDashboards((prevDashboards) =>
      prevDashboards.map((dashboard) =>
        dashboard.id === dashboardId
          ? {
              ...dashboard,
              valueSecondGas: formattedValue,
              valueFirstGas: (100.0 - newValue).toFixed(1),
            }
          : dashboard
      )
    );
  };
  useEffect(() => {
    if (selectedOption?.value === 'Drift Velocity') {
      handleYnameChange({ value: 'Drift Velocity (cm/μs)', label: 'Drift Velocity (cm/μs)' });
    } else if (selectedOption?.value === 'Diffusion Coefficient') {
      handleYnameChange({ value: 'Diffusion Coefficient [√cm]', label: 'Diffusion Coefficient [√cm]' });
    } else if (selectedOption?.value === 'Transversal Diffusion') {
      handleYnameChange({ value: 'Diffusion Coefficient [√cm]', label: 'Diffusion Coefficient [√cm]' });
    }
  
    if (selectedOption2?.value === 'Electric Field') {
      setXDataKey('Electric Field');
      handleXnameChange({ value: 'Electric Field', label: 'Electric Field' });
    } else if (selectedOption2?.value === 'Electric Field / Pressure') {
      setXDataKey('Electric Field / Pressure');
      handleXnameChange({ value: 'Electric Field / Pressure', label: 'Electric Field / Pressure' });
    } else if (selectedOption2?.value === 'Logarithmic Electric Field') {
      setXDataKey('Electric Field');
      handleXnameChange({ value: 'Logarithmic Electric Field', label: 'Logarithmic Electric Field' });
    }
  }, [selectedOption, selectedOption2, handleYnameChange, handleXnameChange, setXDataKey]);

  if (dashboards.length === 0) {
    handleAddDashboard();
  }
  if (dashboards.length > 4) {
    handleRemoveDashboard(dashboards.length);
  }

  return (
    <div>
      <div className="dashboard-container">
        <div className="first-table-container">
          <Table className="first-table" sx={{ maxWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell>Graph Options</TableCell>
                <TableCell>XAxis Opitons</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="graph-options"
                      defaultValue="Drift Velocity"
                      name="graph-options"
                      onChange={(e) => setSelectedOption({ value: e.target.value })}
                    >
                      <FormControlLabel value="Drift Velocity" control={<Radio />} label="Drift Velocity" />
                      <FormControlLabel value="Diffusion Coefficient" control={<Radio />} label="Diffusion Coefficient" />
                      <FormControlLabel value="Transversal Diffusion" control={<Radio />} label="Transversal Diffusion" />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
                <TableCell>
                <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="Xaxis-options"
                      defaultValue="Electric Field"
                      name="Xaxis-options"
                      onChange={(e) => setSelectedOption2({ value: e.target.value })}
                    >
                      <FormControlLabel value="Electric Field" control={<Radio />} label="Electric Field" />
                      <FormControlLabel value="Electric Field / Pressure" control={<Radio />} label="Electric Field / Pressure" />
                      <FormControlLabel value="Logarithmic Electric Field" control={<Radio />} label="Logarithmic Electric Field" />
                    </RadioGroup>
                  </FormControl>
                  </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {dashboards.map((dashboard) => (
          <div className="second-table-container" key={dashboard.id}>
            <Table className="second-table">
              <TableHead>
                <TableRow>
                  <TableCell>First Gas</TableCell>
                  <TableCell>First Gas Ratio</TableCell>
                  <TableCell>Second Gas</TableCell>
                  <TableCell>Second Gas Ratio</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell>Gas Mixture</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id={`first-gas-label-${dashboard.id}`}>First Gas</InputLabel>
                      <Select
                        value={dashboard.firstGas}
                        onChange={(e) => handleFirstGasChange(e, dashboard.id)}
                        label="First Gas"
                        labelId={`first-gas-label-${dashboard.id}`}
                        id={`first-gas-select-${dashboard.id}`}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Ar">Ar</MenuItem>
                        <MenuItem value="He">He</MenuItem>
                        <MenuItem value="Kr">Kr</MenuItem>
                        <MenuItem value="Ne">Ne</MenuItem>
                        <MenuItem value="Xe">Xe</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ maxWidth: 120, minWidth: 120 }}>
                      <Slider
                        aria-label="First Gas"
                        defaultValue={parseFloat(dashboard.valueFirstGas)} 
                        min={80}
                        max={100}
                        step={0.5}
                        valueLabelDisplay="auto"
                        value={parseFloat(dashboard.valueFirstGas)}
                        onChange={(e, newValue) => handleFirstGasSliderChange(e, newValue, dashboard.id)}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id={`second-gas-label-${dashboard.id}`}>Second Gas</InputLabel>
                      <Select
                        value={dashboard.secondGas}
                        onChange={(e) => handleSecondGasChange(e, dashboard.id)}
                        label="Second Gas"
                        labelId={`second-gas-label-${dashboard.id}`}
                        id={`second-gas-select-${dashboard.id}`}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="CH4">CH4</MenuItem>
                        <MenuItem value="C4H10">C4H10</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ maxWidth: 120, minWidth: 120 }}>
                      <Slider
                        aria-label="Second Gas"
                        defaultValue={parseFloat(dashboard.valueSecondGas)}
                        min={0}
                        max={20}
                        step={0.5}
                        valueLabelDisplay="auto"
                        value={parseFloat(dashboard.valueSecondGas)}
                        onChange={(e, newValue) => handleSecondGasSliderChange(e, newValue, dashboard.id)}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <button onClick={handleAddDashboard} className="btn-add">
                      <i className="fa-sharp fa-solid fa-plus"></i>
                    </button>
                    {dashboards.length > 1 && (
                      <button onClick={() => handleRemoveDashboard(dashboard.id)} className="btn-delete">
                        <i className="fa-sharp fa-solid fa-trash"></i>
                      </button>
                    )}
                  </TableCell>
                  <TableCell>
                  <h2>{dashboard.firstGas + '-' + dashboard.secondGas}</h2>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
      <API dashboards={dashboards} setData={setData} selectedOption2={selectedOption2}
      /> 
          </div>
  );
};

export default Dashboard;
