import React from 'react';
import { observer } from 'mobx-react-lite';
import { Stack, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Container } from '../components/Container';
import { useNonNullableContext } from '../../../utils/UseNonNullableContext';
import { LCGStoreContext } from '../../LCGStore';
import { FrequencyChart } from './components/FrequencyChart';
import { ProbabilityDensityChart } from './components/ProbabilityDensityChart';

export const Content: React.FC = observer(() => {
    const lcgStore = useNonNullableContext(LCGStoreContext);

    if (!lcgStore.output) {
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
                <FrequencyChart />
                <ProbabilityDensityChart />
                <Stack gap={1}>
                    <Typography variant="subtitle1">Chi-square goodness-of-fit test</Typography>
                    <Typography variant="body2">
                        Null hypothesis: population probabilities are equal to those in p
                    </Typography>
                    <Typography variant="body2" component="ul">
                        <li>pValue: {lcgStore.output.gofResults.pValue}</li>
                        <li>statistic: {lcgStore.output.gofResults.statistic}</li>
                        <li>degrees of freedom: {lcgStore.output.gofResults.df}</li>
                    </Typography>
                    <Typography variant="body2">
                        Test Decision:{' '}
                        {lcgStore.output.gofResults.rejected
                            ? 'Reject null in favor of alternative at 5% significance level'
                            : 'Fail to reject null in favor of alternative at 5% significance level'}
                    </Typography>
                </Stack>
                <Typography variant="overline" mt="auto" ml="auto">
                    Generated in: {lcgStore.output.tookMs.toFixed(2)} ms
                </Typography>
            </Stack>
        </Container>
    );
});
