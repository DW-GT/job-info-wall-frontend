import React from 'react';
import { Heading, Box, Image } from 'rebass';
import {theme} from '../theme';
import styled from 'styled-components';
import { MainIcon } from '../components/MainIcon';
import { CurrentPageName } from '../components/CurrentPageName';
import { ApplicationBox } from '../components/ApplicationBox';

const {colors, fonts} = theme;

const ApplicationLayout = styled.div`
    width: 100vw;
    margin-top: 10vh;
    padding: 5vw;
`;

export const Applications = ({
}) => {
    
    return(
        <ApplicationLayout>
            <ApplicationBox
                applicationHeadline="Frontend Developer"
                applicationText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam..."
                companyName="pcode"
                startDate="31.03.2021"
                endDate="25.4.2021"
                applicationType="Jobausschreibung"
            >

            </ApplicationBox>
        </ApplicationLayout>
        );
};