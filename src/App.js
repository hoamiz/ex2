import React from 'react';
import './App.css';
import './assets/fonts/roboto.css'
import './assets/fonts/razerf5.css'
import './assets/css/main.css'
import './assets/css/tooltip.css'
import './assets/css/profile.css'
import LeftSide from './Component/LeftSide';
import RightSide from './Component/RightSide';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    console.log(this.props.state)
    return (
      <div classNameName="main-container">
        <div className="thx-wrapper flex">
          <LeftSide />
          <RightSide />
        </div>
      </div >
    );
  }
}
const mapStateToProps = (state) => ({
  state: state
})
export default connect(mapStateToProps, null)(App);
