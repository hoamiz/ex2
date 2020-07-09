import React from 'react';
import { Delete, Active, cancelDelete } from './../Actions/index';
import { connect } from 'react-redux';
import { store } from './../index';
class DeletePopup extends React.Component {
    constructor(props) {
        super(props)
        this.wrapperRef = React.createRef()
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick)
    }
    handleClick = (event) => {
        const { target } = event
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(target) && target.id !== 'profileDelete') {
            this.props.cancelDelete()
        }
    }
    render() {
        const { Delete, state } = this.props
        let name = state.tabs.filter(tab => tab.id === state.chosenTab)[0].name
        return (
            <div>
                {
                    state.onDelete && <div ref={this.wrapperRef} id="profileDelCfm" className="profile-del alert flex show" >
                        <div className="title">delete eq</div>
                        <div className="body-text t-center" id="delName">{name}</div>
                        <div className="thx-btn" id="cfmDelete" onClick={Delete} >delete</div>
                    </div>
                }
            </div>

        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        Delete: () => dispatch(Delete()),
        cancelDelete: () => dispatch(cancelDelete()),
    }
}
const mapStateToProps = (state) => ({
    state: state
})

export default connect(mapStateToProps, mapDispatchToProps)(DeletePopup)