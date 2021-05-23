import React, { useState } from 'react';
import { Heading, Box } from 'rebass';
import { theme } from '../theme';
import styled from 'styled-components';
import { MainIcon } from '../components/MainIcon';
import useSWR from "swr";
import axios from "axios";
import {connect} from 'react-redux';
import {CHANGE_TYPE_ID} from '../redux/actions/typeIdAction';
import store from '../redux/store';
import Image from 'next/image';


const { colors, fonts } = theme;

type Props = {
    navigationText: string;
    showNavigationSelectBox?: boolean;
};

const StyledHtlLogo = styled.a`
    position: absolute;
    top: 1.8vh;
    left: 1.8vh;
    height: 3.9vh;
    width: 3.9vh;
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
    min-height: 7.5vh;
`;

const StyledSelectBox = styled.select`
    background-color: ${colors.primaryBackgroundColor};
    color: ${colors.secondaryColor};
    font-size: 1.3rem;
    font-weight: bold;
    border: none;
    font-family: ${fonts.primaryFont};
    padding: 5px;
    background: url('/mainIcon.svg') no-repeat right rgba(0,0,0,0);
    -webkit-appearance: none;
    background-position-x: calc(50vw-30px);
`;

export const Navigation: React.FC<Props> = ({ navigationText, showNavigationSelectBox }) => {
    const applicationTypes = useSWR("http://localhost:4000/api/application/getOfferTypes/", (url:string)=> axios(url).then(r=> r.data)).data;

    function changeContent(){
        store.dispatch({type:'changeId',typeId: document.getElementById("typeChanger").value});
    } 


    return (
        <StyledNavigation className="nav">
            <StyledHtlLogo
                href="/"
            >
                <Image alt="Htl Logo" width="100%" height="100%" src="/htl-leonding-logo-small.svg"></Image>
            </StyledHtlLogo>
            {showNavigationSelectBox ? (
            <StyledSelectBox onChange={changeContent} id="typeChanger">
                <option value = "-1" >All</option>
                {applicationTypes?.map((type,index)=>{
                return(
                    <option value={type.applicationtype_id}>{ type.name}</option>
                )
            })}
            </StyledSelectBox>) : ("")
            }
        </StyledNavigation>
    );
};
