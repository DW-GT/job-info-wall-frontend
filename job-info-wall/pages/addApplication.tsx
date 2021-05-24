import * as React from 'react';

import { theme } from '../theme';
import { ThemeProvider } from '@emotion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Login } from '../components/Login';
import { AdminOverview } from '../components/AdminOverview';
import { ApplicationAdd } from '../components/ApplicationAdd';

const LoginPage = () => (
    <ThemeProvider theme={theme}>
        <Navigation></Navigation>
        <ApplicationAdd></ApplicationAdd>
        <Footer></Footer>
    </ThemeProvider>
);

export default LoginPage;
