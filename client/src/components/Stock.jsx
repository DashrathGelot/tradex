import React from "react";
import { Box, Paper } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Stock({data, symbol, onClick}) {
  const getT = (unixTimestamp) => {
    return new Date(unixTimestamp).toUTCString().slice(-11, -4);
  }

  return (
    <Paper onClick={onClick} style={{width: '97%', height: '70vh', padding: 20}}>
      <center><h1 style={{marginTop: 0}}>{symbol}</h1></center> 
      <Box style={{width: '100%', height: '85%'}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="t" 
              tickCount={10} 
              tickFormatter={(value) => getT(value)}
            />
            <YAxis 
              dataKey="p" 
              tickFormatter={(value) => value.toFixed(2)} 
              allowDecimals={true} 
              domain={['dataMin', 'auto']}
              tickCount={10}
              activeDot={{ r: 8 }}
            />
            <Tooltip />
            <Legend />
            <Line dot={false} type="monotone" dataKey="p" stroke="#8884d8"/>
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}