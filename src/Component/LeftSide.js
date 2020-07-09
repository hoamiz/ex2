import React from 'react';
import DeletePopup from './DeletePopup';
import { Tittle } from './Tittle';
import Profile from './Profile';
import Toolbar from './ToolBar';


class LeftSide extends React.Component {
    render() {
        return (
            <div className="thx-drawer flex">
                <Tittle />
                <div id="profileWrapper" className="drawer-select flex">
                    <Profile />
                    <Toolbar />
                    <DeletePopup />
                </div>
            </div>
        )
    }
}


export default LeftSide;