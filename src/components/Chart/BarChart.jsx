import React, { PureComponent } from 'react';
import { BarChart as RechartBarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 24,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 13,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 98,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 39,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 48,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 38,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 43,
    amt: 2100,
  },
  {
    name: 'Aug',
    uv: 2000,
    pv: 98,
    amt: 2290,
  },
  {
    name: 'Sep',
    uv: 2780,
    pv: 39,
    amt: 2000,
  },
  {
    name: 'Oct',
    uv: 1890,
    pv: 48,
    amt: 2181,
  },
];

export default class BarChart extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <RechartBarChart
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
          <CartesianGrid vertical={false} strokeDasharray="1" />
          <XAxis fontWeight={700} fontSize={12} dataKey="name" />
          <YAxis unit={'k'} fontWeight={700} fontSize={12} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar 
            dataKey="pv"  
            barSize={22}
            fill="#18100F" 
            activeBar={<Rectangle  stroke="blue" />} 
            radius={[10,10,0,0]}
            />
        </RechartBarChart>
      </ResponsiveContainer>
    );
  }
}
