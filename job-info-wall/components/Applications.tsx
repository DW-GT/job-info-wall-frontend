import React from 'react';
import { Heading, Box, Image } from 'rebass';
import {theme} from '../theme';
import styled from 'styled-components';
import { MainIcon } from '../components/MainIcon';
import { CurrentPageName } from '../components/CurrentPageName';
import { ApplicationBox } from '../components/ApplicationBox';
import { GetStaticProps,GetServerSideProps } from 'next';
import useSWR from 'swr'
import { userInfo } from 'os';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

const {colors, fonts} = theme;

const ApplicationLayout = styled.div`
    width: 100vw;
    margin-top: 10vh;
    padding: 5vw;
`;

export const Applications = ({typeID}
) => {

    const applicationTypes = useSWR("http://localhost:4000/api/application/getOfferTypes/", (url:string)=> axios(url).then(r=> r.data)).data;
    
    const posts = useSWR("http://localhost:4000/api/application/getAllOffers/", (url:string)=> axios(url).then(r=> r.data)).data;


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

            
            {posts?.map((application,index) =>{
                let startDate = new Date(application.creation_date);
                let endDate = new Date(application.expire_date);
                let applicationType = applicationTypes?.find(applicationType => applicationType.applicationtype_id == application.applicationtype_id);
                let applicationTypeName;
                if(applicationType){
                    applicationTypeName = applicationType.name;
                }else{
                    applicationTypeName = "";
                }
                return(
                <ApplicationBox
                applicationHeadline={application.name}
                applicationText={application.description}
                companyName={application.company_name}
                startDate={startDate.getDate()+"."+startDate.getMonth()+"."+startDate.getFullYear()}
                endDate={endDate.getDate()+"."+endDate.getMonth()+"."+endDate.getFullYear()}
                applicationType={applicationTypeName}
                key={index}
                >
            
                </ApplicationBox>
            )})}
                
           
            
        </ApplicationLayout>
        );
};

