import React from 'react'
import './Nav.css'
import { Link, withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx'
import { connect } from "react-redux";
import { logout } from "../../ducks/playerReducer";
import './Header.css'

function Header(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white'
    },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  }));

  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List><Link to='/profile' style={{
        textDecoration: 'none',
        color: 'black'
      }}>
        <ListItem button>

          <ListItemText primary='Profile' />

        </ListItem>
      </Link>
        <Link to='/chess' style={{
          textDecoration: 'none',
          color: 'black'
        }}>
          <ListItem button>
            <ListItemText primary='Chess' />
          </ListItem></Link>
        <Link to='/scoreboard' style={{
          textDecoration: 'none',
          color: 'black'
        }}>
          <ListItem button>
            <ListItemText primary='Scoreboard' />
          </ListItem></Link>
      </List>
    </div>
  );

  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" classes={classes.menuButton} color="inherit" aria-label="menu">
            {['Menu'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sexy Board Games
  </Typography>
          {Object.keys(props.player).length === 0 ? (
            null
          ) : (
              <h2
                className='logout'
                onClick={() => {
                  props.logout()
                  props.history.push(`/`)
                }}
              >
                Logout
              </h2>
            )}
        </Toolbar>
      </AppBar>
    </div>)

}
const mapStateToProps = reduxState => {
  return {
    player: reduxState.playerReducer.player,
  }
}
// <div className="header">
//   <div className='header-buttons'>
//     <div
//       className='nav-buttons'
//     >
//       {Object.keys(props.player).length === 0 ? (
//         null
//       ):(
//       <>
//       <Link 
//         to='/profile'
//         className='nav-button'
//         >
//         PROFILE
//       </Link>
//       <Link 
//         to='/chess'
//         className='nav-button'
//         >
//         CHESS
//       </Link>
//       <Link 
//         to='/scoreboard'
//         className='nav-button'
//         >
//         SCORES
//       </Link>
//       </>
//       )}
//     </div>
//     <h1 className='website-name'>
//       SEXY BOARDGAMES
//     </h1>
//     {Object.keys(props.player).length === 0 ?(
//       null
//     ):(
//     <h2
//         className='logout'
//         onClick={() => {
//           props.logout()
//           props.history.push(`/`)
//         }}
//       >
//       LOGOUT
//     </h2>
//     )}
//   </div>
// </div>
// )
export default connect(mapStateToProps, { logout })(withRouter(Header));