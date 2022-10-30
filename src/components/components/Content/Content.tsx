import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Paper, Stack, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { bin } from 'd3-array';
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis, BarChart, ResponsiveContainer, Bar } from 'recharts';
import { Container } from '../components/Container';
import { useNonNullableContext } from '../../../utils/UseNonNullableContext';
import { LCGStoreContext } from '../../LCGStore';
import { formatNumber } from './utils/formatNumber';

export const Content: React.FC = observer(() => {
    const lcgStore = useNonNullableContext(LCGStoreContext);
    const [chartData, setChartData] = useState<
        | {
              size: number;
              label: string;
              x0: number | undefined;
              x1: number | undefined;
          }[]
        | null
    >(null);

    useEffect(() => {
        if (!lcgStore.output) {
            setChartData(null);

            return;
        }

        const getBins = bin()
            .domain([0, lcgStore.output.modulus - 1])
            .thresholds(10);

        setChartData(
            getBins(lcgStore.output.values).map(({ x0, x1, length }) => ({
                size: length,
                label: `${typeof x0 === 'number' ? formatNumber(x0) : 'n/a'}-${
                    typeof x1 === 'number' ? formatNumber(x1) : 'n/a'
                }`,
                x0,
                x1,
            })),
        );
    }, [lcgStore.output]);

    if (!lcgStore.output || !chartData) {
        return (
            <Container>
                <Stack height="100%" justifyContent="center" alignItems="center" fontSize="64px">
                    <BarChartIcon fontSize="inherit" color="disabled" />
                </Stack>
            </Container>
        );
    }

    return (
        <Container>
            <Stack height="100%">
                <Typography variant="subtitle1" mb={3}>
                    Frequency chart
                </Typography>
                <ResponsiveContainer width="100%" height="50%">
                    <BarChart data={chartData} margin={{ top: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis dataKey="size" />
                        <Tooltip
                            cursor={{ fill: '#e1f5fe50' }}
                            content={({ active, payload }): React.ReactNode => {
                                if (!active || !payload?.length) {
                                    return null;
                                }

                                return (
                                    <Paper elevation={2}>
                                        <Stack padding={1}>
                                            <Typography variant="caption">
                                                <strong>Size:</strong> {payload[0]?.payload?.size} numbers
                                            </Typography>
                                            <Typography variant="caption">
                                                <strong>Bin lowest: </strong>
                                                {payload[0]?.payload?.x0}
                                            </Typography>
                                            <Typography variant="caption">
                                                <strong>Bin highest:</strong> {payload[0]?.payload?.x1}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                );
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="size"
                            fill="lightBlue"
                            label={({ x, y, value }): React.ReactElement => (
                                <text x={x + 20} y={y} dy={-4} fontSize="16" fill="lightBlue" textAnchor="middle">
                                    {formatNumber(value)}
                                </text>
                            )}
                        />
                    </BarChart>
                </ResponsiveContainer>
                <Typography variant="overline" mt="auto" ml="auto">
                    Generated in: {lcgStore.output.tookMs.toFixed(2)} ms
                </Typography>
            </Stack>
        </Container>
    );
});
