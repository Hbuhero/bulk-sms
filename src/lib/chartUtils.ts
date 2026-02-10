/**
 * Chart Utility Functions
 * 
 * Helper functions for chart data transformation and formatting
 */

export const formatChartData = (data: any[]) => {
    return data.map((item) => ({
        ...item,
        value: Number(item.value) || 0,
    }));
};

export const getChartColors = (count: number): string[] => {
    const colors = [
        "#3b82f6", // blue
        "#10b981", // green
        "#f59e0b", // amber
        "#ef4444", // red
        "#8b5cf6", // purple
        "#ec4899", // pink
        "#14b8a6", // teal
        "#f97316", // orange
    ];

    return colors.slice(0, count);
};

export const calculatePercentage = (value: number, total: number): string => {
    if (total === 0) return "0%";
    return `${((value / total) * 100).toFixed(1)}%`;
};

export const formatNumber = (num: number): string => {
    return num.toLocaleString();
};

export const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};
