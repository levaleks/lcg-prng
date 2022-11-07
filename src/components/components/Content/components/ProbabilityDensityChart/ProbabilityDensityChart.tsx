import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@mui/material';
import { CartesianGrid, Legend, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useNonNullableContext } from '../../../../../utils/UseNonNullableContext';
import { LCGStoreContext } from '../../../../LCGStore';
import { formatNumber } from '../../utils/formatNumber';

export const ProbabilityDensityChart: React.FC = observer(() => {
    const lcgStore = useNonNullableContext(LCGStoreContext);

    const [lineChartData, setLineChartData] = useState<
        | {
              Probability: number;
              label: string;
          }[]
        | null
    >(null);

    useEffect(() => {
        if (!lcgStore.output) {
            setLineChartData(null);

            return;
        }

        setLineChartData(
            lcgStore.output.pdfResults.map(({ value, probability }) => ({
                Probability: probability,
                label: formatNumber(value),
            })),
        );
    }, [lcgStore.output]);

    if (!lcgStore.output || !lineChartData) {
        return null;
    }

    return (
        <>
            <Typography variant="subtitle1" mb={3}>
                Probability Density Chart
            </Typography>
            <ResponsiveContainer width="100%" height="50%">
                <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis dataKey="Probability" />
                    <Line type="monotone" dataKey="Probability" stroke="#ff5252" dot={false} />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
});
