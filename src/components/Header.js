import React, { Component } from 'react';
import Sidebar from '../components/Sidebar'

class Header extends Component {
    render() {
        return (
            <header>                
                <Sidebar />     
            </header>
        );
    }
}

export default Header;