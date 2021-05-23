import React from 'react';
import { Box } from 'rebass';
import { theme } from '../theme';
import styled from 'styled-components';
import Image from 'next/image';
import { device } from '../devices';

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

    @media ${device.desktop}{
        flex-direction: row;
        justify-content: space-around;
    }
`;

const FooterLinkBoxLayout = styled.div`
    margin-bottom: 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media ${device.desktop}{
        flex-direction: row;
        width: 50%;
        justify-content: space-evenly;
        align-items: center;
        margin: 0;
    }
`;

const StyledFooterLink = styled.a`
    margin: 1vh 0;
`;

const FooterLogoLayout = styled.div`
    padding: 0 5vw;
    display: flex;
    justify-content: center;
`;

export const Footer = ({}) => {
    return (
        <FooterBoxLayout>
            <FooterLinkBoxLayout>
                <StyledFooterLink target="_blank" href="https://www.htl-leonding.at/kontakt/">Kontakt</StyledFooterLink>
                <StyledFooterLink target="_blank" href="https://www.htl-leonding.at/impressum/">Impressum</StyledFooterLink>
                <StyledFooterLink target="_blank" href="https://www.htl-leonding.at/datenschutz/">Datenschutz</StyledFooterLink>
            </FooterLinkBoxLayout>
            <FooterLogoLayout>
                <Image alt="Htl Logo" width={500} height={100}  src="/htl-leonding-logo.svg" ></Image>
            </FooterLogoLayout>
        </FooterBoxLayout>
    );
};
