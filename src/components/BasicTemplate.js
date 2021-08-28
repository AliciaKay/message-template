import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Modal from './Modal';

let companies = require('./Companies.json');
let guests = require('./Guests.json');
let messages = require('./Messages.json');

class BasicTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guestName: '',
            guestReservation: '',
            timeOfDay: '',
            company: '',
            companies: companies
        };
        this.handleChange = this.handleChange.bind(this)
    }

    configByTime() {
        var today = new Date()
        var curHr = today.getHours()
        var template;
        if (curHr < 12) {
            template = messages.filter((message) => {
                return message.greeting == "Good Morning"
            });
        } else if (curHr < 18) {
            template = messages.filter((message) => {
                return message.greeting == "Good Afternoon"
            });
        } else {
            template = messages.filter((message) => {
                return message.greeting == "Good Evening"
            });
        }
        return template[0];
    }

    handleChange(e) {
        let remainingCompany = [];
        remainingCompany = this.state.companies.filter((company) => {
            return company.company === e.target.value
        })
        this.setState({company: e.target.value, companies: remainingCompany}, () => {
            console.log('state now:', this.state)
        });
    }

    companySelectionButtons() {
        let jsx = [];
        this.state.companies.forEach((company) => {
            jsx.push(
                <div className='card' key={company.id}>
                <button className='btn btn-primary' name='company' value={company.company} onClick={this.handleChange}>{company.company}</button>
                </div>
                )
        });
        return jsx;
    }



    hotelGuests() {
        let messageStructure = this.configByTime();
        let companyName = this.state.company;
        let jsx = [];
        guests.forEach((guest) => {
            jsx.push(
                <div key={guest.id+'outerCont'}>
                 <Modal guest={guest} template={messageStructure} company={companyName}/>
                </div>
            )
        })
        return jsx;
    }

render() {
    let companyText = '';
    if (this.state.company != '') {
        companyText = "You have selected:"
    } else {
        companyText = "Select your company:"
    }
    return (
        <div>
            {companyText}
            {this.companySelectionButtons()}
            Send a message to...
            {this.hotelGuests()}
        </div>
    )
}
}

export default BasicTemplate;
