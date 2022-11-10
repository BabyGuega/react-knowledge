import { Home } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, width } from "@mui/system";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext, useAuthContext, useDrawerContext } from "../../contexts";

interface IListItemLinkProps {
  to: string;
  icon:string;
  label: string;
  onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({to, icon, label, onClick}) => {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({path: resolvedPath.pathname, end: false})
  
  const handleClick = () => {
    navigate(to)
    onClick?.()
  }
 
  return (
    <ListItemButton selected= {!!match} onClick = {handleClick}>
    <ListItemIcon>
    <Icon>{icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={label} />
    </ListItemButton>

  )
}



// usetheme é um hook do material para entregar algumas funcionalidades
interface IMenuLateralProps {
  children: React.ReactNode;
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const {toggleTheme} = useAppThemeContext()
  const {logout} = useAuthContext()
  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(16), width: theme.spacing(16) }}
              src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
            {drawerOptions.map(drawerOption => (
              <ListItemLink 
              to={drawerOption.path}
              key={drawerOption.path}
              icon={drawerOption.icon}
              label={drawerOption.label}
              onClick={smDown ? toggleDrawerOpen : undefined}
            />
            ))};
              </List>
            
          </Box>
          <Box>
            <List component="nav">
            <ListItemButton  onClick = {toggleTheme}>
    <ListItemIcon>
    <Icon>dark_mode</Icon>
    </ListItemIcon>
    <ListItemText primary="Light/Dark" />
    </ListItemButton>
    <ListItemButton  onClick = {logout}>
    <ListItemIcon>
    <Icon>logout</Icon>
    </ListItemIcon>
    <ListItemText primary="Sair" />
    </ListItemButton>
    
              </List>
            
          </Box>
          
        </Box>
      </Drawer>

      <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
//Breakpoints ajuda na responsividade do site, lembrando que vai de 0px até 1536px
/*Esse variant serve pra dizer como ele vai se comportar ISSO E MUITO TOP*/

//onClose fecha qnd clica fora
