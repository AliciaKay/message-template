import { render } from '@testing-library/react';
import React, {Component} from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guest: props.guest,
            company: props.company,
            template: props.template,
            wasSent: false,
            selectedCustom: false,
            lastMessage: ''
        };
        this.setSentStatus = this.setSentStatus.bind(this);
        this.handleCustom = this.handleCustom.bind(this);
        this.handleText = this.handleText.bind(this);
    }

    setSentStatus() {
        this.setState({wasSent: !this.state.wasSent})
    }

    handleCustom() {
        this.setState({selectedCustom: !this.state.selectedCustom})
    }

    handleText(e) {
        this.setState({lastMessage: e.target.value});
    }

    writeCustom(guest, template, company) {
        let jsx = [];
        jsx.push(
            <div>
            <textarea class="form-control" id="formControlTextarea" name="messageContent" onChange={this.handleText} rows="3" defaultValue={template.greeting+" "+guest.firstName+template.welcome+" "+company+template.room+" "+guest.reservation.roomNumber+" "+template.signOff}></textarea>
            <p><em>Note: Messages over 140 characters may be split into multiple messages.</em></p>
            <button type="button" className="btn btn-info" onClick={this.handleCustom}>Return to Standard</button>
            </div>
        );
        return jsx;
    }

    makeStandard(guest, template, company) {
        let jsx = [];
        jsx.push(
            <div>
            <p>{template.greeting} {guest.firstName}{template.welcome} {company}{template.room} {guest.reservation.roomNumber} {template.signOff}</p>
            <button type="button" className="btn btn-info" onClick={this.handleCustom}>Create Custom Message?</button>
            </div>
        );
        return jsx;
    }


render() {
    let guest = this.state.guest;
    let template = this.state.template;
    let company = this.props.company;
    let icon = null;
    let sentStatus = this.state.wasSent;
    if (sentStatus) {
        icon = "bi bi-check2-circle"
    } else {
        icon = "bi bi-envelope"
    }
    return(
        <div className='card' key={guest.id}>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#templateModal"+guest.id}>
            {guest.firstName} {guest.lastName} <i className={icon}></i>
        </button>
        <div className="modal fade" id={"templateModal"+guest.id} tabIndex="-1" aria-labelledby="templateModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.state.wasSent ? <h5 className="modal-title" id={"templateModalLabel"+guest.id}>View last message</h5> : <h5 className="modal-title" id={"templateModalLabel"+guest.id}>Draft your message</h5>}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {this.state.wasSent && this.state.selectedCustom ? <div><p>{this.state.lastMessage}</p></div> : this.state.selectedCustom ? this.writeCustom(guest, template, company) : this.makeStandard(guest, template, company)}
                        </div>
                   
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"data-bs-dismiss="modal" onClick={this.setSentStatus}>Send Message</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
}

    export default Modal;