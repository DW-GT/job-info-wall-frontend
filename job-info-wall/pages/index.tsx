import * as React from 'react';

import { Box, Flex } from 'rebass';
import { theme } from '../theme';
import { ThemeProvider } from '@emotion/react';
import Router from 'next/router';
import styled from 'styled-components';
import { Headline } from '../components/Headline';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Applications } from '../components/Applications';
import { GetStaticProps } from 'next';

const MainPage = ({applications,applicationTypes}) => {
    return(
    
    <ThemeProvider theme={theme}>
        <Navigation navigationText="Jobs"></Navigation>
        <Applications typeID="0" applications={applications} applicationTypes= {applicationTypes}></Applications>
    </ThemeProvider>
)};

export default MainPage;

export const getStaticProps: GetStaticProps = async() => {

    const resTypes = await fetch(`http://localhost:4000/api/application/getOfferTypes`);
    const applicationTypes = await resTypes.json();

    

    return {
        props:{
            applicationTypes
        }
    }

}