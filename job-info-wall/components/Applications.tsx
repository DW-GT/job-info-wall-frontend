import React from 'react';
import { Heading, Box, Image } from 'rebass';
import {theme} from '../theme';
import styled from 'styled-components';
import { MainIcon } from '../components/MainIcon';
import { CurrentPageName } from '../components/CurrentPageName';
import { ApplicationBox } from '../components/ApplicationBox';
import { GetStaticProps,GetServerSideProps } from 'next';
import useSWR from 'swr'

const {colors, fonts} = theme;

const ApplicationLayout = styled.div`
    width: 100vw;
    margin-top: 10vh;
    padding: 5vw;
`;

export const Applications = ({typeID,applications,applicationTypes}
) => {
    if(typeID != 0){
    const { user, isLoading, isError } = getApplications(typeID);
    }
    
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

            
            {applications.map((application) =>{
                <ApplicationBox
                applicationHeadline={application.name}
                applicationText={application.description}
                companyName={application.company_name}
                startDate={application.creation_date}
                endDate={application.expire_date}
                applicationType={applicationTypes[application.applicationtype_id]}
            >
            
            </ApplicationBox>
            })}
                
           
            
        </ApplicationLayout>
        );
};

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const getApplications = (typeID) =>{
    const {data,error} = useSWR('http://localhost:4000/api/application/getSpecificOffers/'+typeID,fetcher);

    return {
        user: data,
        isLoading: !error && !data,
        isError: error
      }
}



