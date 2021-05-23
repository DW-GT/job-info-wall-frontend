import React from 'react';
import { Heading, Box, Image } from 'rebass';
import { theme } from '../theme';
import styled from 'styled-components';
import { MainIcon } from '../components/MainIcon';
import { CurrentPageName } from '../components/CurrentPageName';
import { ApplicationBox } from '../components/ApplicationBox';
import { GetStaticProps, GetServerSideProps } from 'next';
import useSWR from 'swr';
import { userInfo } from 'os';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import store from '../redux/store';
import { device } from '../devices';

const { colors, fonts } = theme;

const ApplicationLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5vh;
    width: 100vw;
    margin-top: 10vh;
    padding: 5vw;
    @media ${device.desktop}{
        grid-template-columns: repeat(3, 1fr);
    }
`;

function formatDate(date) {
    date = new Date(date);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
}

export const Applications = ({}) => {
    const applicationTypes = useSWR(
        'http://localhost:4000/api/application/getOfferTypes/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    const posts = useSWR(
        store.getState().state != undefined &&
            store.getState().state.typeId != -1
            ? 'http://localhost:4000/api/application/getSpecificOffers/' +
                  store.getState().state.typeId
            : 'http://localhost:4000/api/application/getAllOffers/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    const [val, setVal] = useState();

    const unsubscribe = store.subscribe(() => {
        setVal(store.getState().state.typeId);
    });

    return (
        <ApplicationLayout>
            {posts?.map((application, index) => {
                let applicationType = applicationTypes?.find(
                    (applicationType) =>
                        applicationType.applicationtype_id ==
                        application.applicationtype_id,
                );
                let applicationTypeName;
                if (applicationType) {
                    applicationTypeName = applicationType.name;
                } else {
                    applicationTypeName = '';
                }
                return (
                    <ApplicationBox
                        applicationHeadline={application.name}
                        applicationText={application.description}
                        companyName={application.company_name}
                        startDate={formatDate(application.creation_date)}
                        endDate={formatDate(application.expire_date)}
                        applicationType={applicationTypeName}
                        key={index}
                        applicationId={application.application_id}
                    ></ApplicationBox>
                );
            })}
        </ApplicationLayout>
    );
};
