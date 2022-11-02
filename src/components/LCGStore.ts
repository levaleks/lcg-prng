import { createContext } from 'react';
import { makeAutoObservable, observable } from 'mobx';
import { LCG } from '../core/LCG';

export interface Parameters {
    seed: number;
    multiplier: number;
    increment: number;
    modulus: number;
    quantity: number;
    thresholds: number;
}

export type Output = {
    tookMs: number;
    values: number[];
    seed: number;
    multiplier: number;
    increment: number;
    modulus: number;
    quantity: number;
    thresholds: number;
} | null;

export class LCGStore {
    constructor() {
        makeAutoObservable(
            this,
            {
                defaults: observable.ref,
                output: observable.ref,
            },
            { autoBind: true },
        );
    }

    /**
     * @desc Defaults come from "Numerical Recipes from the "quick and dirty generators" list, Chapter 7.1, Eq. 7.1.6 parameters from Knuth and H. W. Lewis"
     * @link https://en.wikipedia.org/wiki/Linear_congruential_generator#:~:text=Numerical%20Recipes%20from%20the%20%22quick%20and%20dirty%20generators%22%20list%2C%20Chapter%207.1%2C%20Eq.%207.1.6%0Aparameters%20from%20Knuth%20and%20H.%20W.%20Lewis
     */
    readonly defaults: Parameters = Object.freeze({
        seed: 1,
        multiplier: 1664525,
        increment: 1013904223,
        modulus: 2 ** 32,
        quantity: 10000,
        thresholds: 42,
    });

    output: Output = null;

    generate({ quantity, thresholds, ...lcgParams }: Parameters): void {
        const lcg = new LCG(lcgParams);

        const t0 = performance.now();

        const values = Array.from({ length: quantity }, () => lcg.produce());

        const t1 = performance.now();

        const tookMs = t1 - t0;

        this.output = {
            tookMs,
            values,
            ...lcgParams,
            quantity,
            thresholds,
        };
    }

    reset(): void {
        this.generate(this.defaults);
    }
}

export const LCGStoreContext = createContext<LCGStore | null>(null);
