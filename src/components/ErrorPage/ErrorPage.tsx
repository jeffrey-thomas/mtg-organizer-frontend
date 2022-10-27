import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useNavigate, useRouteError } from 'react-router-dom'
import { Navbar } from '../Navbar';


interface RouterError{
    statusText?:string;
    message?:string;
}

export const ErrorPage = () => {

    const error = useRouteError() as RouterError;
    const navigate = useNavigate();

    const navbarHeight = '48px'

    const styles={
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:`calc(100% - ${navbarHeight})`,
        justifyItems:'center'
    }

    return (
        <Box sx={styles}>
            <Navbar height={navbarHeight}/>
            <Box sx={{ height:`calc(100% - ${navbarHeight})`, mt:`${navbarHeight}`}}>
                <h1>Whoops...</h1>
                <p>Something unexpected happened.</p>
                <p><i>{error.statusText || error.message}</i></p>
                <Button onClick={()=>{navigate(-1)}} variant='contained'>Go Back</Button>
            </Box>
        </Box>
    )
}
