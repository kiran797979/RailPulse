import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ChartBar = ({ data, xKey, yKey, colors = ["#FF6A00"] }) => {
    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey={xKey}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#888888', fontWeight: 700 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#888888', fontWeight: 700 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1A1A1A',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 106, 0, 0.2)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                            color: '#EAEAEA',
                            fontSize: '12px'
                        }}
                        itemStyle={{ color: '#FF6A00' }}
                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    />
                    <Bar dataKey={yKey} radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartBar;
