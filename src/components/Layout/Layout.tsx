import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'

export const Layout = () => {

    const navbarHeight = '48px';

    return (
            <Box sx={{height:'100%'}}>
                <Navbar height={navbarHeight}/>
                <Box sx={{ height:`100%`, mt:`${navbarHeight}` }}>
                    <Outlet/>
                </Box>
            </Box>
    )
}
