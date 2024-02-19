import React from 'react';
import { Typography } from 'antd';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Graph() {
  const lineData = [
    { year: '2016', value: 2400 },
    { year: '2017', value: 1398 },
    { year: '2018', value: 9800 },
    { year: '2019', value: 3908 },
    { year: '2020', value: 4800 },
    { year: '2021', value: 3800 },
    { year: '2022', value: 4300 },
  ];

  const pieData1 = [
    { name: 'Performance', value: 400 },
    { name: 'Age', value: 300 },
    { name: 'Experience', value: 300 },
    { name: 'Employee ID', value: 200 },
  ];
  const pieData2 = [
    { name: 'Status', value: 400 },
    { name: 'Work Status', value: 300 },
    { name: 'Employee ID', value: 300 },
  ];
  const pieData3 = [
    { name: 'Number of Days', value: 400 },
    { name: 'Status', value: 300 },
    { name: 'Employee ID', value: 300 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <Typography.Title level={4}>Graph</Typography.Title>
      <Typography.Text>Yearly Performance</Typography.Text>
      <LineChart width={window.innerWidth * 0.9} height={300} data={lineData}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>

      <div className="pieChartsContainer">
        <PieChart width={200} height={200}>
          <Pie
            data={pieData1}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {pieData1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend layout="vertical" align="right" verticalAlign="middle" />
          <Tooltip />
        </PieChart>

        <PieChart width={200} height={200}>
          <Pie
            data={pieData2}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {pieData2.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend layout="vertical" align="right" verticalAlign="middle" />
          <Tooltip />
        </PieChart>

        <PieChart width={200} height={200}>
          <Pie
            data={pieData3}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {pieData3.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend layout="vertical" align="right" verticalAlign="middle" />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default Graph;
