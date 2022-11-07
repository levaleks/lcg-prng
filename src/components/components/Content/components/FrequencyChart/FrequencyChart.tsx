import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Paper, Stack, Typography } from '@mui/material';
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis, BarChart, ResponsiveContainer, Bar } from 'recharts';
import { useNonNullableContext } from '../../../../../utils/UseNonNullableContext';
import { LCGStoreContext } from '../../../../LCGStore';
import { formatNumber } from '../../utils/formatNumber';

export const FrequencyChart: React.FC = observer(() => {
    const lcgStore = useNonNullableContext(LCGStoreContext);

    const [barChartData, setBarChartData] = useState<
        | {
              Counts: number;
              label: string;
              x0: number | undefined;
              x1: number | undefined;
          }[]
        | null
    >(null);

    useEffect(() => {
        if (!lcgStore.output) {
            setBarChartData(null);

            return;
        }

        setBarChartData(
            lcgStore.output.bins.map(({ x0, x1, length }) => ({
                Counts: length,
                label: `${typeof x0 === 'number' ? formatNumber(x0) : 'n/a'}-${
                    typeof x1 === 'number' ? formatNumber(x1) : 'n/a'
                }`,
                x0,
                x1,
            })),
        );
    }, [lcgStore.output]);

    if (!lcgStore.output || !barChartData) {
        return null;
    }

    return (
        <>
            <Typography variant="subtitle1" mb={3}>
                Frequency chart
            </Typography>
            <ResponsiveContainer width="100%" height="50%">
                <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis dataKey="Counts" />
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
                                            <strong>Counts:</strong> {payload[0]?.payload?.Counts} numbers
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
                        dataKey="Counts"
                        fill="lightBlue"
                        label={
                            barChartData.length > 10
                                ? undefined
                                : ({ x, y, value }): React.ReactElement => (
                                      <text x={x + 20} y={y} dy={-4} fontSize="16" fill="lightBlue" textAnchor="middle">
                                          {formatNumber(value)}
                                      </text>
                                  )
                        }
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
});
