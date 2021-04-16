import React from 'react';
import { Heading, Box, Image } from 'rebass';
import {colors, fonts} from '../theme.ts';
import styled from 'styled-components';
import { MainIcon } from '../components/MainIcon';
import { CurrentPageName } from '../components/CurrentPageName';

type Props = {
    navigationText: string;
    children
}

const StyledMainIcon = styled.img`
    width: 8vw;
    margin-left: 5vw;
`;

const StyledHtlLogo = styled.img`
    position: absolute;
    top: 1.8vh;
    left: 1.8vh;
    width: 8vw;
`;

const StyledNavigation = styled.div`
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: ${colors.secondaryBgColor};
        padding: 1.8vh 0;
        justify-content: center;
    `;

const StyledHeadlineText = styled.h2`
    margin: 0;
    color: white;
    font-family: ${fonts.primary}
`;

export const Navigation: React.FC<Props> = ({
    navigationText,
    children
}) => {
    
    return(
        <StyledNavigation className="nav">
            <StyledHtlLogo src="htl-leonding-logo-small.svg"/>
            <CurrentPageName>All</CurrentPageName>
            <StyledHeadlineText>{navigationText}</StyledHeadlineText>
            <StyledMainIcon src="mainIcon.svg"/>
            {children}
        </StyledNavigation>
        );
};