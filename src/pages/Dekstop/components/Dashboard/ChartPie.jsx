import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export default function ChartPie() {
    const [selectedRange, setSelectedRange] = useState('month');

    // Dummy Data (Sesuai dengan kategori)
    const dataSets = {
        days: [5, 3],
        week: [20, 10],
        month: [120, 80],
        year: [1400, 600],
    };

    const selectedData = dataSets[selectedRange] || dataSets['month'];
    const totalValue = selectedData.reduce((a, b) => a + b, 0); // Total semua kategori

    const options = {
        chart: { type: 'donut' },
        labels: ['Member', 'Non Member'],
        colors: ['#1E90FF', '#28A745'], // Biru & Hijau
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`, // Format jadi persen
            style: { fontSize: '14px', fontWeight: 'bold', colors: ['#fff'] },
        },
        tooltip: {
            theme: 'dark',
            y: { formatter: (val) => `${val.toFixed(1)}%` }, // Tooltip persen
        },
        legend: {
            position: 'bottom',
            fontSize: '14px',
            labels: { colors: '#4B5563' },
        },
        stroke: { width: 2, colors: ['#fff'] },
        title: {
            text: 'Membership Ratio',
            align: 'center',
            style: { fontSize: '16px', fontWeight: 'bold', color: '#374151' },
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '16px',
                            color: '#6B7280',
                            formatter: () => `${totalValue}`, // Menampilkan total jumlah
                        },
                    },
                },
            },
        },
    };

    return (
        <div className="w-full md:w-[30%] border border-gray-300 rounded-lg p-6 shadow-md bg-white">
            {/* Header Filter */}
            <div className="flex justify-center items-center mb-3">
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                    {['days', 'week', 'month', 'year'].map((range) => (
                        <button
                            key={range}
                            className={`px-3 py-1 text-sm rounded-md transition-all ${
                                selectedRange === range
                                    ? 'bg-blue-500 text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedRange(range)}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {/* Chart */}
            <Chart
                options={options}
                series={selectedData}
                type="donut"
                height={350}
            />
        </div>
    );
}
