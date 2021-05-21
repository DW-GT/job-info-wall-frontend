import React, { useState } from 'react';
import { Heading, Box, Image } from 'rebass';
import { theme } from '../theme';
import styled from 'styled-components';
import { MainIcon } from '../components/MainIcon';
import { CurrentPageName } from '../components/CurrentPageName';
import useSWR from "swr";
import axios from "axios";
import {connect} from 'react-redux';
import {CHANGE_TYPE_ID} from '../redux/actions/typeIdAction';
import store from '../redux/store';


const { colors, fonts } = theme;

type Props = {
    navigationText: string;
};

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
    background-color: ${colors.secondaryBackgroundColor};
    padding: 1.8vh 0;
    justify-content: center;
`;

const StyledHeadlineText = styled.h2`
    margin: 0;
    color: white;
    font-family: ${fonts.primaryFont};
`;

export const Navigation: React.FC<Props> = ({ navigationText }) => {
    const applicationTypes = useSWR("http://localhost:4000/api/application/getOfferTypes/", (url:string)=> axios(url).then(r=> r.data)).data;

    function changeContent(){
        store.dispatch({type:'changeId',typeId: document.getElementById("typeChanger").value});
    } 


    return (
        <StyledNavigation className="nav">
            <StyledHtlLogo src="htl-leonding-logo-small.svg" />
            <CurrentPageName>All</CurrentPageName>
            <StyledHeadlineText>{navigationText}</StyledHeadlineText>
            <StyledMainIcon src="mainIcon.svg" />
            <select onChange={changeContent} id="typeChanger">
                <option value = "-1" >All</option>
                {applicationTypes?.map((type,index)=>{
                return(
                    <option value={type.applicationtype_id}>{ type.name}</option>
                )
            })}
            
            </select>
        </StyledNavigation>
    );
};
