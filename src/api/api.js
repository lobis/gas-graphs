import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const API = ({ dashboards, setData, selectedOption2 }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJSONData = async () => {
      try {
        const combinedData = [];
        for (const dashboard of dashboards) {
          const url = `https://lobis.github.io/gas-files/files/mixtures/${dashboard.firstGas}-${dashboard.secondGas}/${dashboard.firstGas}_${dashboard.valueFirstGas}-${dashboard.secondGas}_${dashboard.valueSecondGas}.gas.json`;
          const response = await axios.get(url);
          const rawData = Array.isArray(response.data) ? response.data : [response.data];
          const formattedData = rawData.map((item) => ({
            'Electric Field': item.electric_field,
            'Drift Velocity': item.electron_drift_velocity,
            'Diffusion Coefficient': item.electron_longitudinal_diffusion,
            'Transversal Diffusion': item.electron_transversal_diffusion,
            'Pressure': item.pressure,
          }));
          const pressureValue = formattedData[0]['Pressure'];
          const electricFieldValues = formattedData[0]['Electric Field'];

          if (selectedOption2?.value === 'Logarithmic Electric Field') {
            combinedData.push(
              formattedData[0]['Drift Velocity'].map((electron_drift_velocity, index) => ({
                'Drift Velocity': Math.round(electron_drift_velocity * 100) / 100,
                'Electric Field': Math.round(formattedData[0]['Electric Field'][index] * 100) / 1000,
                'Diffusion Coefficient': formattedData[0]['Diffusion Coefficient'][index],
                'Transversal Diffusion': formattedData[0]['Transversal Diffusion'][index],
              }))
            );
          }
           else if (selectedOption2?.value === 'Electric Field') {
            combinedData.push(
              formattedData[0]['Drift Velocity'].map((electron_drift_velocity, index) => ({
                'Drift Velocity': Math.round(electron_drift_velocity * 100) / 100,
                'Electric Field': Math.round(formattedData[0]['Electric Field'][index] * 100) / 1000,
                'Diffusion Coefficient': formattedData[0]['Diffusion Coefficient'][index],
                'Transversal Diffusion': formattedData[0]['Transversal Diffusion'][index],
              }))
            );
          } else if (selectedOption2?.value === 'Electric Field / Pressure') {            
            if (!isNaN(pressureValue)) {
              const electricFieldPressureData = electricFieldValues.map((electricField, index) => ({
                'Electric Field': Math.round(formattedData[0]['Electric Field'][index] * 100) / 1000,
                'Pressure': pressureValue,
                'Electric Field / Pressure':Math.round(electricField / pressureValue ) / 10,
                'Drift Velocity': Math.round(formattedData[0]['Drift Velocity'][index] * 100) / 100,
                'Diffusion Coefficient': formattedData[0]['Diffusion Coefficient'][index],
                'Transversal Diffusion': formattedData[0]['Transversal Diffusion'][index],
              }));
              combinedData.push(electricFieldPressureData);
            }
          }
        }
        
        setData(combinedData);
        console.log('Veri çekme başarılı:', combinedData);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching data: "Data does not exist."');
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchJSONData();
  }, [dashboards, setData, selectedOption2]);

  return (
    <div>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        ''
      )}
    </div>
  );
};

export default API;
