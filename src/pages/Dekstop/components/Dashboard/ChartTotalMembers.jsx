import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { apiDashboard } from '../../../../api/apiDashboard';

export default function ChartTotalMembers() {
    const [selectedRange, setSelectedRange] = useState('month');
    const [chartData, setChartData] = useState({
        categories: [],
        series: [{ name: 'Memberships', data: [] }],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiDashboard.lineChart(selectedRange);
                console.log('API Response:', response.data); // Debugging

                if (
                    !response.data ||
                    !Array.isArray(response.data.categories) ||
                    !Array.isArray(response.data.series)
                ) {
                    throw new Error('Invalid API Response Structure');
                }

                setChartData({
                    categories: response.data.categories,
                    series: [
                        { name: 'Memberships', data: response.data.series },
                    ],
                    total: response.data.total || 0,
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData();
    }, [selectedRange]);

    const options = {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        xaxis: {
            categories: chartData.categories,
            labels: { style: { colors: '#6b7280', fontSize: '12px' } },
        },
        yaxis: {
            labels: { style: { colors: '#6b7280', fontSize: '12px' } },
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0.5,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 100],
            },
        },
        title: {
            text: 'Membership Purchases',
            align: 'left',
            style: { fontSize: '16px', fontWeight: 'bold', color: '#374151' },
        },
        tooltip: { theme: 'dark' },
        colors: ['#1E90FF'],
    };

    return (
        <div className="w-full md:w-[70%] border border-gray-300 rounded-lg p-4 shadow-md bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-700">
                    Total:{' '}
                    <span className="text-blue-500">
                        {chartData.total ?? 0}
                    </span>
                </h2>
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
            {chartData.series[0].data.length > 0 ? (
                <Chart
                    options={options}
                    series={chartData.series}
                    type="area"
                    height={350}
                />
            ) : (
                <p className="text-gray-500 text-center">
                    No data available for this range
                </p>
            )}
        </div>
    );
}
