import { Card } from "antd";
import styled from "styled-components";

export const StyledUser = styled.div`

`

export const UserCard = styled(Card)`

margin-top: 10px ;

& h1{
    margin-top: 5px;
}

& p{
    color:#0d6efd;
}
`

export const UserImageCard = styled(Card)`

& h1{
    margin-top: 5px;
}

& p{
    color:#0d6efd;
}

`
export const EditRound = styled.div`

border-radius: 50%;
background: radial-gradient(circle, white, whitesmoke);
padding: 15px 15px ;

`