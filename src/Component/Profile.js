import React from 'react';
import { connect } from "react-redux";
import { Active, finishEdit, onEdit, onChange } from './../Actions/index';

class Profile extends React.Component {
    componentDidMount() {
        this.props.Active('profile1')
        document.addEventListener('click', this.onClickOutside)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.onClickOutside)

    }
    componentDidUpdate() {
        this.checkUpDown()
        this.canEdit()

    }
    onClick(id) {
        this.props.Active(id)
    }
    onClickOutside = (e) => {
        if (e.target.id === 'profileEdit' && document.getElementById('profileRename')) {
            document.getElementById('profileRename').focus()
            document.getElementById('profileRename').select()
        }
        if (e.target.id !== 'profileEdit' && this.props.state.isEdit) this.props.onEdit()
    }
    onChange = (e) => {
        let evalue = e.target.value
        this.props.onChange(evalue)
    }
    checkUpDown() {
        let index = this.props.state.tabs.findIndex(tab => tab.id === this.props.state.chosenTab)
        if (index === 0) {
            document.getElementById('profileUp').classList.add('disabled');
            document.getElementById('profileDown').classList.remove('disabled');
        } else if (index === this.props.state.tabs.length - 1) {
            document.getElementById('profileUp').classList.remove('disabled');
            document.getElementById('profileDown').classList.add('disabled');
        }
        else {
            document.getElementById('profileUp').classList.remove('disabled');
            document.getElementById('profileDown').classList.remove('disabled');
        }
    }
    canEdit() {
        if (this.props.state.chosenTab !== 'profile1' && this.props.state.chosenTab !== 'profile2' && this.props.state.chosenTab !== 'profile3' && this.props.state.chosenTab !== 'profile4') {
            document.getElementById('profileEdit').classList.add('show');
            document.getElementById('profileDelete').classList.add('show');
        } else {
            document.getElementById('profileEdit').classList.remove('show');
            document.getElementById('profileDelete').classList.remove('show');
        }
    }
    render() {
        const { state } = this.props
        return (
            <div id="profileList" className="scrollable" >
                {state.tabs && state.tabs.map(tab => {
                    return (
                        <div key={tab.id}>
                            {state.isEdit && tab.id === state.chosenTab &&
                                <div>
                                    <input
                                        value={state.innerText}
                                        id="profileRename"
                                        className="profile-item show"
                                        placeholder="Enter Profile Name"
                                        maxLength="25"
                                        onChange={this.onChange}
                                        onBlur={this.finishEdit}

                                    />
                                </div>
                            }
                            {tab.active
                                ? <div
                                    onClick={this.onClick.bind(this, tab.id)}
                                    id={tab.id}
                                    className={tab.className + ' active'}
                                >
                                    {tab.name}
                                </div>
                                : <div
                                    onClick={this.onClick.bind(this, tab.id)}
                                    id={tab.id}
                                    className={tab.className}
                                >
                                    {tab.name}
                                </div>}

                        </div>
                    )
                }
                )}
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    Active: (id) => dispatch(Active(id)),
    onEdit: () => dispatch(onEdit()),
    finishEdit: () => dispatch(finishEdit()),
    onChange: (e) => dispatch(onChange(e)),
})

const mapStateToProps = (state) => ({
    state: state

})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);