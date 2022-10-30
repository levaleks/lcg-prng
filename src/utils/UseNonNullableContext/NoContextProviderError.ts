export class NoContextProviderError extends Error {
    constructor(contextNameHint?: string) {
        super(
            `Component is used outside of context provider. ${
                contextNameHint ? `Check ${contextNameHint}.` : ''
            }`.trim(),
        );

        this.name = 'NoContextProviderError';
    }
}
