const chartData = {
    type: 'radialBar',
    options: {
        colors: ['#98ABFF', '#546FFF', '#1A2793'],
        labels: ['Interview Selesai', 'Interview Berlangsung', 'Interview Expired'],
        plotOptions: {
            radialBar: {
                size: undefined,
                inverseOrder: false,
                startAngle: 0,
                endAngle: 360,
                offsetX: 0,
                offsetY: 0,
                hollow: {
                    margin: 5,
                    size: '50%',
                    background: 'transparent',
                    image: undefined,
                    imageWidth: 150,
                    imageHeight: 150,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    imageClipped: true,
                    position: 'front',
                    dropShadow: {
                        enabled: false,
                        top: 0,
                        left: 0,
                        blur: 3,
                        opacity: 0.5
                    }
                },
                track: {
                    show: true,
                    startAngle: undefined,
                    endAngle: undefined,
                    background: '#D8D8D8',
                    strokeWidth: '90%',
                    opacity: 0.7,
                    margin: 5,
                    dropShadow: {
                        enabled: false,
                        top: 0,
                        left: 0,
                        blur: 3,
                        opacity: 0.5
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '22px',
                        fontFamily: undefined,
                        color: undefined,
                        offsetY: -10
                    },
                    value: {
                        show: true,
                        fontSize: '2rem',
                        fontFamily: undefined,
                        color: undefined,
                        offsetY: 16,
                        formatter: function (val) {
                            return val;
                        }
                    },
                    total: {
                        show: true,
                        label: 'Total Interview',
                        color: undefined,
                        formatter: function (w) {
                            return w.globals.seriesTotals.reduce((a, b) => {
                                return a + b;
                            }, 0);
                        }
                    }
                }
            }
        }
    },
    series: [46, 82, 39]
};

export default chartData;
