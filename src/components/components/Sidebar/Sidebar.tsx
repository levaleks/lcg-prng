import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Container } from '../components/Container';
import { LCGStoreContext } from '../../LCGStore';
import { useNonNullableContext } from '../../../utils/UseNonNullableContext';
import { LCG } from '../../../core/LCG';

export const Sidebar: React.FC = observer(() => {
    const lcgStore = useNonNullableContext(LCGStoreContext);

    const {
        handleSubmit: submitParameters,
        control,
        reset,
        getValues,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues: {
            seed: lcgStore.defaults.seed,
            multiplier: lcgStore.defaults.multiplier,
            increment: lcgStore.defaults.increment,
            modulus: lcgStore.defaults.modulus,
            quantity: lcgStore.defaults.quantity,
            thresholds: lcgStore.defaults.thresholds,
        },
        mode: 'onChange',
    });

    const handleReset = (): void => {
        lcgStore.reset();
        reset();
    };

    const handleChange = (): Promise<boolean> => trigger();

    const handleSubmit = submitParameters((data) => lcgStore.generate(data));

    useEffect(() => {
        lcgStore.generate(lcgStore.defaults);
    }, [lcgStore, lcgStore.defaults]);

    return (
        <Container>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
                onChange={handleChange}
                onSubmit={handleSubmit}
            >
                <Typography variant="subtitle1">LCG parameters</Typography>
                <Controller
                    name="seed"
                    control={control}
                    rules={{
                        validate: (seed: unknown): boolean | string => {
                            if (seed === '') {
                                return 'Seed is required';
                            }

                            return LCG.validateSeed(Number(seed), getValues().modulus);
                        },
                    }}
                    render={({ field }): React.ReactElement => (
                        <TextField
                            label="Seed"
                            variant="standard"
                            type="number"
                            error={!!errors?.seed}
                            helperText={errors?.seed?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="multiplier"
                    control={control}
                    rules={{
                        validate: (multiplier: unknown): boolean | string => {
                            if (multiplier === '') {
                                return 'Multiplier is required';
                            }

                            return LCG.validateMultiplier(Number(multiplier), getValues().modulus);
                        },
                    }}
                    render={({ field }): React.ReactElement => (
                        <TextField
                            label="Multiplier"
                            variant="standard"
                            type="number"
                            error={!!errors?.multiplier}
                            helperText={errors?.multiplier?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="increment"
                    control={control}
                    rules={{
                        validate: (increment: unknown): boolean | string => {
                            if (increment === '') {
                                return 'Increment is required';
                            }

                            return LCG.validateIncrement(Number(increment), getValues().modulus);
                        },
                    }}
                    render={({ field }): React.ReactElement => (
                        <TextField
                            label="Increment"
                            variant="standard"
                            type="number"
                            error={!!errors?.increment}
                            helperText={errors?.increment?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="modulus"
                    control={control}
                    rules={{
                        validate: (modulus: unknown): boolean | string => {
                            if (modulus === '') {
                                return 'Modulus is required';
                            }

                            return LCG.validateModulus(Number(modulus));
                        },
                    }}
                    render={({ field }): React.ReactElement => (
                        <TextField
                            label="Modulus"
                            variant="standard"
                            type="number"
                            error={!!errors?.modulus}
                            helperText={errors?.modulus?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="quantity"
                    control={control}
                    rules={{
                        validate: (quantity: unknown): boolean | string => {
                            if (quantity === '') {
                                return 'Quantity is required';
                            }

                            return (
                                (Number.isInteger(Number(quantity)) && Number(quantity) > 0) ||
                                'Quantity must be a positive integer'
                            );
                        },
                    }}
                    render={({ field }): React.ReactElement => (
                        <TextField
                            label="Quantity"
                            variant="standard"
                            type="number"
                            error={!!errors?.quantity}
                            helperText={errors?.quantity?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="thresholds"
                    control={control}
                    rules={{
                        validate: (thresholds: unknown): boolean | string => {
                            if (thresholds === '') {
                                return 'Thresholds is required';
                            }

                            return (
                                (Number.isInteger(Number(thresholds)) && Number(thresholds) > 0) ||
                                'Thresholds must be a positive integer'
                            );
                        },
                    }}
                    render={({ field }): React.ReactElement => (
                        <TextField
                            label="Thresholds"
                            variant="standard"
                            type="number"
                            error={!!errors?.thresholds}
                            helperText={errors?.thresholds?.message}
                            {...field}
                        />
                    )}
                />
                <Stack flexDirection="row" gap={1}>
                    <Button variant="outlined" onClick={handleReset} sx={{ marginLeft: 'auto' }}>
                        Reset
                    </Button>
                    <Button variant="contained" type="submit">
                        Run
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
});
