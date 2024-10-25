import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { data: '19/10', acessos: 20 },
  { data: '20/10', acessos: 25 },
  { data: '21/10', acessos: 30 },
  { data: '22/10', acessos: 35 },
  { data: '23/10', acessos: 40 },
  { data: '24/10', acessos: 42 },
  { data: '25/10', acessos: 45 },
];

function LineGraph() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="acessos" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
