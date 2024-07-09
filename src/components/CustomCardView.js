import styled from "styled-components";

const CustomCard = styled.div`
    background:white;
    box-shadow: 0 0 5px 5px rgba(0,0,0,0.03);
    margin:auto;
    max-width:${props => props.width || '100%'};
    padding:25px;
    border-radius:10px;
    height: 100%;
`

export const CustomCardView = ({ children, width, style }) => {
    
    return (
        <CustomCard width={width} style={style}>
            {children}
        </CustomCard>
    )
}