import GlobalStyle from './theme/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment, useLayoutEffect } from 'react';
import Routers from './routes';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentRole, selectCurrentToken } from './modules/Auth/authSlice';


function App() {

  const location = useLocation()

  const token = useSelector(selectCurrentToken);
  // const token = 'dgfg';
  // console.log(token,'tokentoken');

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Fragment>
      <GlobalStyle />
      <Routers token={token}/>
      {/* <ToastContainer autoClose={700} pauseOnHover={true} style={{backgroundColor:"red",colorScheme:"green",color:"blue"}}
      /> */}
      <ToastContainer />
    </Fragment>
  );
}

export default App;