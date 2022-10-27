import { Box, useTheme } from '@mui/material';
import { CheckAuth } from '../Authorization/CheckAuth';
import { GoogleSignInButton } from '../Authorization/GoogleSignInButton';
import { NavButton } from '../SharedComponents';
import { ReactComponent as Logo } from '../../images/logo.svg'

export const Home= () => {

  const theme = useTheme()

  const style={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around',
    height:'80%',
  }

  return (
    <Box sx={style}>
      <Box sx={{
        width:'50%',
        height:'auto',
        maxHeight:'70%'
      }}><Logo width='100%' height='100%' fill={theme.palette.secondary.main}/></Box>
      <CheckAuth
        onAuthorized={<NavButton to='/dashboard' variant='contained'>Go to My Collection</NavButton>}
        onUnauthorized={<GoogleSignInButton/>}
      />
      
    </Box>
  )
}
