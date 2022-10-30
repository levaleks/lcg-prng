import React, { useContext } from 'react';
import { NoContextProviderError } from './NoContextProviderError';

export const useNonNullableContext = <T>(context: React.Context<T>): NonNullable<T> => {
    const store = useContext(context);

    if (!store) throw new NoContextProviderError();

    return store as NonNullable<T>;
};
