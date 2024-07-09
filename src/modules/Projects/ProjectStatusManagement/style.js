import styled from "styled-components";

export const StyledMoreDetails = styled.div`

&:hover{
    /* transform: rotate(5deg); */
    transform: scale(1.1);
    transition: transform 0.5s ease-in-out; 
}

`
export const StyledTab = styled.div`

/* :where(.css-dev-only-do-not-override-p7e5j5).ant-tabs .ant-tabs-tab {
    background-color: #5018a3;
    padding: 20px ;
    color: whitesmoke ;
}
.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #2fdec4 ;
} */

`
export const StyledStatusChange = styled.div`

margin-top: 20px ;
overflow-x: scroll;
/* width: 100px; */
/* width: 100vh ; */

.statusChange{
    border-radius: 0px;
    width: 270px;
    height: fit-content;
}
`
export const DraggableItem = styled.div`

transition: transform 0.5s ease; 

&:hover{
     transform: rotate(3deg);
 }
`
export const StyledViewTask = styled.div`

padding: 5px ;

& h1{
    padding: 5px;
}

& span{
    padding: 5px;
}

.paraBlue {
    color: #0d6efd;
    font-size: 100%;
    /* line-height: 25px; */
  }

`

export const StyledTasking = styled.div`


`