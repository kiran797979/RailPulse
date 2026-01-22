import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartLine = ({ data, xKey, yKey, color = "#FF6A00" }) => {
    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
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
                        domain={[0, 100]}
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
                    />
                    <Line
                        type="monotone"
                        dataKey={yKey}
                        stroke={color}
                        strokeWidth={4}
                        dot={{ r: 4, fill: '#0B0B0B', strokeWidth: 2, stroke: color }}
                        activeDot={{ r: 6, strokeWidth: 0, fill: color }}
                        className="glow-orange"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartLine;
