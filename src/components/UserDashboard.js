import React, {Component} from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';
import BasicTemplate from './BasicTemplate';

let companies = require('./Companies.json');
 

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };
    }
 
onKeyDown = (e) => {
    const nameVal = e.target.value;
    if (e.key === 'Enter' && nameVal) {
        this.setState({
			userName: nameVal
		});
        }
      }

    showJsx() {
        let jsx = [];
        if (this.state.userName.length) {
            jsx.push (
              <div>
                <h1>Hello, {this.state.userName}!</h1>
                <BasicTemplate />
              </div>
            );
            } else {
                jsx.push (
                  <div>
                  <h1>Welcome, enter your name and press enter to begin.</h1>
                  <div className="intro">
                  <input className="form-control form-control-sm border-0 border-bottom" type="text" placeholder="Add a username" aria-label="Add a username" onKeyDown={this.onKeyDown} />
                  </div>
          
                </div>
                )
            }
            return jsx;
      }

 render() {
     return (
         <div className="card">
        {this.showJsx()}
    </div>
     )
}
};
 
export default UserDashboard;