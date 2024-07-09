import React, { Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Form/CustomButton';
export const NetWorkError = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => {
        navigate(location.state.previousUrl) // Go back one step in the history
    };
    return (
        <Fragment>
            <div>NetWorkError</div>
            <Button.Primary text={'Refresh'} onClick={() => goBack()} />
        </Fragment>
    )
}