import styled from 'styled-components'



export const DashCardTitle = styled.div`
& svg{

    height: 30px;
    width: 25px;
    color:#545454;
}

`;
export const ContentBox = styled.div`

& h1 {
font-size: 16px;
color:#4caf50;
margin:3px 0px;
}
& p{
color:#555;
margin:3px 0px;

}
`;

export const Overhid = styled.div`
height: 250px;
overflow-y: auto;
`
export const PercentageBox = styled.div`
.ant-progress .ant-progress-bg {
   background-color: ${prop => prop.Colors};

}

.ant-progress .ant-progress-text{
  /* width: auto !important; */
    /* border-radius: 10px !important; */
    /* padding: 6px 10px !important; */
    /* color: #fff !important; */
    /* background-color: #00b0e4 !important; */
    /* margin-top: -81px; */
}
`;
export const Samplebox = styled.div`
/* src/FullScreenToggle.css */
.fullscreen-toggle {
  position: fixed;
  top: 10px;
  right: 10px;
}

button {
  padding: 10px;
  font-size: 16px;
}


`;