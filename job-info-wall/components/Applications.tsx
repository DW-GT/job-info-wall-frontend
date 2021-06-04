import React from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import { ApplicationBox } from '../components/ApplicationBox';
import useSWR from 'swr';
import { useState } from 'react';
import axios from 'axios';
import store from '../redux/store';
import { device } from '../devices';

const { colors, fonts } = theme;

const ApplicationLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5vh;
    width: 100%;
    padding: 5vw;

    @media ${device.tablet} {
        grid-template-columns: 1fr 1fr;
    }

    @media ${device.desktop} {
        grid-template-columns: repeat(3, 1fr);
    }
`;

function formatDate(date) {
    date = new Date(date);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
}

export const Applications = ({}) => {
    const [inputValue, setInputValue] = useState('');
    const applicationTypes = useSWR(
        'http://localhost:4000/api/application/getOfferTypes/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    let posts = useSWR(
        store.getState() != undefined && store.getState().state.typeId != -1
            ? 'http://localhost:4000/api/application/getSpecificOffers/' +
                  store.getState().state.typeId
            : 'http://localhost:4000/api/application/getAllOffers/',
        (url: string) => axios(url).then((r) => r.data),
    ).data;

    const [val, setVal] = useState();

    const unsubscribe = store.subscribe(() => {
        setVal(store.getState().state.typeId);
    });

    function updateApplications(text: string) {
        console.log(text);
        setVal(
            posts.find((application) => {
                return application.name.includes(text);
            }),
        );
    }

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
