import React from 'react';
import { Menu } from 'semantic-ui-react';
import firebase from '../../firebase';


const MainHeader = (props) => {
    firebase.analyticsEvents('SIGNOUT_PAGE');
    const handleSignOut = () => {
        firebase.logout().then(() => {
            console.log('sign out Done!')
            props.history.push('/login');
        })
    }
    return (
        <div>
            <Menu secondary>
                <Menu.Item
                    name='home'
                    active
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        onClick={handleSignOut}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default MainHeader;