import React, { Component } from 'react';

import Aux from '../Auxs/Auxs';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }


    sideDrawerTogglerHandler = () => {
        this.setState((prevStat) => {
            return {showSideDrawer: !prevStat.showSideDrawer}
        });
    }


    render (){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerTogglerHandler} />
                <SideDrawer opened={this.state.showSideDrawer}  closed={this.sideDrawerCloseHandler}/>
                <main className='content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

export default Layout;