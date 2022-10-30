import React from 'react';
import { observer } from 'mobx-react-lite';
import { Paper } from '@mui/material';

export const Container: React.FC = observer(({ children }) => {
    return (
        <Paper elevation={2} sx={{ height: '100%', padding: 2, background: '#272822' }}>
            {children}
        </Paper>
    );
});
