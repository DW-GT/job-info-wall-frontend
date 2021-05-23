import * as React from 'react';

import { Box, Flex } from 'rebass';
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import Router from 'next/router';
import styled from 'styled-components';
import { Headline } from '../../components/Headline';
import { Header } from '../../components/Header';
import { Navigation } from '../../components/Navigation';
import { ApplicationDetails } from '../../components/ApplicationDetails';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Footer } from '../../components/Footer';

const DetailPage = (application_id) => {

    const router = useRouter();
    const { pid } = router.query;

    return(
    <ThemeProvider theme={theme}>
        <Navigation></Navigation>
        <ApplicationDetails applicationId={pid} ></ApplicationDetails>
        <Footer></Footer>
    </ThemeProvider>
)};

export default DetailPage;