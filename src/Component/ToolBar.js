
import React from 'react';
import { connect } from "react-redux";
import { Add, Active, Up, Down, confDelete, onEdit } from './../Actions/index';


class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            click: false
        }
    }
    async addTab() {
        let id = await new Date().getUTCMilliseconds()
        let newTab = {
            name: 'New Profile',
            id: id,
            className: "profile-item custom"
        }
        var profileList = document.getElementById('profileList');
        this.props.Add(newTab)
        this.props.Active(id)
        profileList.scrollTo(0, profileList.scrollHeight);

    }
    async onEdit(event) {
        await this.setState({
            click: !this.state.click
        })
        if (this.state.click) await this.props.onEdit(event)
        document.getElementById('profileRename').focus();
        document.getElementById('profileRename').select();
    }


    render() {
        const { Up, Down, confDelete, state } = this.props
        return (
            <div className="toolbar flex">
                <div className="icon add" id="profileAdd" onClick={this.addTab.bind(this)} ></div>
                <div className="icon edit " id="profileEdit" onClick={this.onEdit.bind(this)}></div>
                <div className="icon delete" id="profileDelete" onClick={confDelete}></div>
                <div className="icon down" id="profileDown" onClick={Down}></div>
                <div className="icon up disabled" id="profileUp" onClick={Up}></div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Add: (tab) => dispatch(Add(tab)),
        Active: (id) => dispatch(Active(id)),
        Up: () => dispatch(Up()),
        Down: () => dispatch(Down()),
        confDelete: () => dispatch(confDelete()),
        onEdit: (e) => dispatch(onEdit(e)),
    }
}
const mapStateToProps = (state) => ({
    state: state

})
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)