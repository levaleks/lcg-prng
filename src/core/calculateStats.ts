import { bin, Bin } from 'd3-array';
import chi2gof from '@stdlib/stats-chi2gof';
import pdf from '@stdlib/stats-base-dists-uniform-pdf';

export interface CalculateStatsParams {
    values: number[];
    thresholds: number;
    domain: {
        min: number;
        max: number;
    };
}

export interface CalculateStats {
    bins: Bin<number, number>[];
    gofResults: ReturnType<typeof chi2gof>;
    pdfResults: {
        value: number;
        probability: number;
    }[];
}

export const calculateStats = ({ values, thresholds, domain }: CalculateStatsParams): CalculateStats => {
    const getBins = bin().domain([domain.min, domain.max]).thresholds(thresholds);

    const bins = getBins(values);

    const observedCounts = bins.map(({ length }) => length);
    const expectedCounts = Array.from({ length: observedCounts.length }, () =>
        Math.floor(values.length / observedCounts.length),
    );

    const pdfResults = values.map((value) => ({ value, probability: pdf(value, domain.min, domain.max) }));

    return { bins, gofResults: chi2gof(observedCounts, expectedCounts), pdfResults };
};
