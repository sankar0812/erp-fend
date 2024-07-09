import React from 'react'
import styled from 'styled-components'
import { THEME } from '../theme';

const Titles = styled.div`
    & h2 {
        font-size: 1.7rem;
        color: ${THEME.primary_color_dark};
        font-weight: 600;
        margin: 5px 5px 25px 5px;
        margin-bottom:15px;
    }
`;

const TitleScroll = styled.div`
    & h2 {
        font-size: 1.1rem;
        color: ${THEME.primary_color};
        font-weight: 800;
        /* font-variant: small-caps;
        text-transform: capitalize; */
        margin-bottom:10px;
        /* text-align:center; */
    }
`;


const FormTitles = styled.div`
/* margin: auto; */
    & h2 {
        font-size: 18px;
        color: #5b626b;
        font-weight: 600;
        text-transform: capitalize;
        margin-bottom:10px;
    }
`;

const FormSubTitles = styled.div`
    & h4 {
        font-size: 16px;
        color: ${THEME.black};
        font-weight: 600;
        text-transform: capitalize;
        margin:10px;
    }
`;

export const CustomPageTitle = ({ Heading,style }) => {
    return (
        <Titles style={style}>
            <h2>{Heading}</h2>
        </Titles>
    )
}


export const CustomPageTitleScroll = ({ Heading }) => {
    return (
        <TitleScroll>
            <h2>{Heading}</h2>
        </TitleScroll>
    )
}

export const CustomPageFormTitle = ({ Heading, style }) => {
    return (
        <FormTitles>
            <h2 style={style}>{Heading}</h2>
        </FormTitles>
    )
}

export const CustomPageFormSubTitle = ({ Heading, style }) => {
    return (
        <FormSubTitles>
            <h4 style={style}>{Heading}</h4>
        </FormSubTitles>
    )
}