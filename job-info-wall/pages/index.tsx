import * as React from 'react';

import { Box, Flex } from 'rebass';
import { theme } from '../theme';
import { ThemeProvider } from '@emotion/react';
import Router from 'next/router';
import styled from 'styled-components';
import { Headline } from '../components/Headline';

const MainPage = () => (
    <ThemeProvider theme={theme}>
        <Headline>Test</Headline>
    </ThemeProvider>
);

export default MainPage;
