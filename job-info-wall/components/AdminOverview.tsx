import React, { useState } from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import Router from 'next/router';
import cookie from 'js-cookie';
import useSWR from 'swr';
import axios from 'axios';

const { colors, fonts } = theme;

const AdminOverviewLayout = styled.table`
    margin-top: 10vh;
    width: 100vw;
    padding: 7vh 10vw;
    border-spacing: 20px;
`;

const StyledAdminTableHeader = styled.th`
    text-align: left;
`;

const StyledAdminTableContent = styled.td``;

const StyledEditLink = styled.a`
    text-decoration: none;
`;

export const AdminOverview = () => {
    const token = cookie.get('token');
    if (!token) {
        // Router.push('/login');
    }

    const applications = useSWR(
        'http://localhost:4000/api/application/getAllOffers/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;
    return (
        <AdminOverviewLayout>
            <tr>
                <StyledAdminTableHeader>ID</StyledAdminTableHeader>
                <StyledAdminTableHeader>Name</StyledAdminTableHeader>
                <StyledAdminTableHeader>Firma</StyledAdminTableHeader>
                <StyledAdminTableHeader>Bearbeiten</StyledAdminTableHeader>
                <StyledAdminTableHeader>Löschen</StyledAdminTableHeader>
            </tr>
            {applications?.map((application) => {
                return (
                    <tr>
                        <StyledAdminTableContent>
                            {application.application_id}
                        </StyledAdminTableContent>
                        <StyledAdminTableContent>
                            {application.name}
                        </StyledAdminTableContent>
                        <StyledAdminTableContent>
                            {application.company_name}
                        </StyledAdminTableContent>
                        <StyledAdminTableContent>
                            <StyledEditLink
                                href={'/edit/' + application.application_id}
                            >
                                Bearbeiten
                            </StyledEditLink>
                        </StyledAdminTableContent>
                    </tr>
                );
            })}
        </AdminOverviewLayout>
    );
};
