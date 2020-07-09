
import React from 'react';
import { connect } from "react-redux";
import { Add, Active, checkUpDown, Up, Down, canEdit, confDelete, onEdit } from './../Actions/index';


class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            click: false
        }
    }
    componentDidUpdate() {
        console.log(this.state.click, this.props.state.clicked)
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
        this.props.checkUpDown()
        this.props.canEdit()

    }
    async onEdit(event) {
        await this.setState({
            click: !this.state.click
        })
        console.log(this.state.click, !this.props.state.clicked)
        if (this.state.click) this.props.onEdit(event)
        document.getElementById('profileRename').focus();
        document.getElementById('profileRename').select();
    }
    render() {
        const { Up, Down, confDelete, onEdit, state } = this.props
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
        checkUpDown: () => dispatch(checkUpDown()),
        Up: () => dispatch(Up()),
        Down: () => dispatch(Down()),
        canEdit: () => dispatch(canEdit()),
        confDelete: () => dispatch(confDelete()),
        onEdit: (e) => dispatch(onEdit(e)),
    }
}
const mapStateToProps = (state) => ({
    state: state

})
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)