import React, { useState } from 'react';
import { CssBaseline, GlobalStyles, Grid, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto';
import { LCGStore, LCGStoreContext } from './LCGStore';
import { muiTheme } from './muiTheme';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';

export const App: React.FC = () => {
    const [lcgStore] = useState(new LCGStore());

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    'body, html, #app': {
                        height: '100%',
                    },
                }}
            />
            <LCGStoreContext.Provider value={lcgStore}>
                <Stack height="100%" justifyContent="center" alignItems="center">
                    <Grid maxWidth="md" container height="100%" maxHeight="768px" spacing={2}>
                        <Grid item xs={4}>
                            <Sidebar />
                        </Grid>
                        <Grid item xs={8}>
                            <Content />
                        </Grid>
                    </Grid>
                </Stack>
            </LCGStoreContext.Provider>
        </ThemeProvider>
    );
};
