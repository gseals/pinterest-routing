import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavBar.scss';

class MyNavBar extends React.Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    return (
      <div className="MyNavBar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">Pinterest</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mt-lg-0"></ul>
            <div class="my-2 mt-lg-0">
              {authed && (<button className="nav-link btn btn-danger" onClick={this.logMeOut}>Logout</button>)}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default MyNavBar;
