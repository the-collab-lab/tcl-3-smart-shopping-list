import React, { Component } from 'react';
import './HomePage.css';
import NavTabs from '../components/NavTabs';
import JoinList from '../components/JoinList';
import HiddenButton from '../components/HiddenButton';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { isEmptyState: true };
  }

  triggerJoinListState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isJoinListState: true,
    });
  };

  render() {
    return (
      <div className="whole-page">
        <h1>Here's our homepage! Go to your list or add an item below.</h1>
        <NavTabs />
        {this.state.isEmptyState && (
          <HiddenButton joinList={this.triggerJoinListState} />
        )}

        {this.state.isJoinListState && <JoinList />}
      </div>
    );
  }
}
export default HomePage;
