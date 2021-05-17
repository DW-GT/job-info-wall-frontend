import React from 'react';
import { Box, Image } from 'rebass';
import { theme } from '../theme';
import styled from 'styled-components';

const { colors, fonts } = theme;

const FooterBoxLayout = styled.div`
    width: 100vw;
    padding: 5vh 5vw;
    display: flex;
    flex-direction: column;
    background-color: ${colors.primaryBackgroundColor};
    color: ${colors.secondaryColor};
    font-family: ${fonts.primaryFont};
    margin-top: 5vh;
`;

const FooterLinkBoxLayout = styled.div`
    margin-bottom: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledFooterLink = styled.a`
    margin: 1vh 0;
`;

const FooterLogoLayout = styled.img`
    padding: 0 5vw;
`;

export const Footer = ({}) => {
    return (
        <FooterBoxLayout>
            <FooterLinkBoxLayout>
                <StyledFooterLink target="_blank" href="https://www.htl-leonding.at/kontakt/">Kontakt</StyledFooterLink>
                <StyledFooterLink target="_blank" href="https://www.htl-leonding.at/impressum/">Impressum</StyledFooterLink>
                <StyledFooterLink target="_blank" href="https://www.htl-leonding.at/datenschutz/">Datenschutz</StyledFooterLink>
            </FooterLinkBoxLayout>
            <FooterLogoLayout src="htl-leonding-logo.svg" />
        </FooterBoxLayout>
    );
};
