//AI-TYPE:web-page

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '../../routes';
import { ThemeOptions, ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';

/*
 * The root component of the MyPage page.
 * 
 * This is where you add your own components and logic.
 */

export const theme = createTheme({
    palette: {
        primary: {
            main: '#651FFF',
        },
        secondary: {
            main: '#f50057',
        },
    },
} satisfies ThemeOptions);

export const MainPage = () => {
    const router = createBrowserRouter(routes);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
                styles=&#123;{
                    html: { height: '100%', width: '100%' },
                    body: { height: '100%', width: '100%' },
                    '.application-container': { height: '100%', width: '100%' },
                }}
            />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

