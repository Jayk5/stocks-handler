// ChartComponent.js
import { useMemo } from 'react';
import { Chart, LineSeries, LinearAxis, Tooltip, Point } from 'react-charts';

const ChartComponent = () => {
  const generateRandomData = () => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      data.push({
        x: i,
        y: Math.floor(Math.random() * 100) + 1,
      });
    }
    return data;
  };
  const data = useMemo(() => generateRandomData(), []);

  const series = useMemo(
    () => ({
      type: 'line',
    }),
    []
  );

  const axes = useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Chart data={[{ data }]} series={series} axes={axes}>
        <LinearAxis type="linear" position="left" label="Price" style={{ color: 'white' }} />
        <LinearAxis type="linear" position="bottom" label="Time" style={{ color: 'white' }} />
        <LineSeries />
        <Point series={series} />
        <Tooltip />
      </Chart>
    </div>
  );
};

export default ChartComponent;
