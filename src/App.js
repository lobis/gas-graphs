
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("gas/json/Ar2p3iC4H10-T20C-P1p4bar-nColl15-E0t1000Vcm-nE200lin.gas.json").then((response) => {
      response.json().then(
        json => {
          console.log("fetched")
          setData(json)
        })
    });
  }, []);


  return (
    data ? <Chart data={data} /> : null
  );
}

export default App;
