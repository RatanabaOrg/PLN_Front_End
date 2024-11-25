import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineGraph({ data}) { 

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" angle={-30} textAnchor="end" />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ paddingTop: 20 }} />
        <Line type="monotone" dataKey="acessos" stroke="#0A8FEF" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
