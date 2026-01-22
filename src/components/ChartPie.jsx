import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ChartPie = ({ data, nameKey, valueKey, colors = ["#FF6A00", "#FF8533", "#CC5500", "#1A1A1A", "#333333"] }) => {
    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey={valueKey}
                        nameKey={nameKey}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} className="focus:outline-none" />
                        ))}
                    </Pie>
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
                    <Legend
                        iconType="circle"
                        wrapperStyle={{ fontSize: '10px', paddingTop: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}
                        formatter={(value) => <span style={{ color: '#888888' }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartPie;
