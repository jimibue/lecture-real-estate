import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'

class Navbar extends React.Component {

  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;

    if (user) {
      return (
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={() => handleLogout(this.props.history)}
          />
          
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              id='login'
              name='login'
              active={location.pathname === '/login'}
            />
            
          </Link>
          
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='register'
              active={location.pathname === '/register'}
            />
          </Link>
        </Menu.Menu>
      )
    }
  }

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to='/'>
            <Menu.Item
              name='home'
              id='home'
              active={this.props.location.pathname === '/'}
            />
          </Link>
          <Link to='/available'>
            <Menu.Item
              name='available'
              id='available'
              active={this.props.location.pathname === '/available'}
            />
          </Link>
          <Link to='/cities'>
            <Menu.Item
              name='cities'
              id='cities'
              active={this.props.location.pathname === '/cities'}
            />
          </Link>
          <Link to='/findHomes'>
            <Menu.Item
              name='homes'
              id='homes'
              active={this.props.location.pathname === '/findHomes'}
            />
          </Link>
          <Link to='/cost'>
            <Menu.Item
              name='cost'
              id='cost'
              active={this.props.location.pathname === '/cost'}
            />
          </Link>
          { this.rightNavItems() }
        </Menu>
      </div>
    );
  };
};

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <Navbar {...this.props} auth={auth} />
        }
      </AuthConsumer>
    );
  };
};

export default withRouter(ConnectedNavbar);
