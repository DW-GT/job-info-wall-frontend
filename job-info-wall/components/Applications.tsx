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

const SearchInputLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledInputField = styled.input`
    margin: 3vh 0;
    border-radius: 10px;
    padding: 2vh 2vw;
    border: none;
    box-shadow: 0px 0px 19px rgb(0 0 0 / 40%);
    font-size: 1rem;
    transition: all 200ms;

    :hover {
        box-shadow: 0px 0px 24px rgb(0 0 0 / 40%);
    }
    :focus {
        box-shadow: 0px 0px 14px rgb(0 0 0 / 30%);
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

    const [postsFiltered, setPosts] = useState('');

    function updateApplications() {
        posts = posts.find((application) => {
            return application.name.includes(text);
        });
    }

    return (
        <div>
            <SearchInputLayout>
                <StyledInputField
                    type="text"
                    placeholder="Suchen..."
                    onKeyDown={(e) => setPosts(e.target.value)}
                ></StyledInputField>
            </SearchInputLayout>
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
        </div>
    );
};
