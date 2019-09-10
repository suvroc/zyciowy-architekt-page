import React from "react"
import jsonp from "jsonp"

import {
    Form, Button, Message, Icon
} from 'semantic-ui-react'

class Mailchimp extends React.Component {
    state = {};

    handleSubmit(evt) {
        evt.preventDefault();
        const { fields, action } = this.props;
        const values = fields.map(field => {
            return `${field.name}=${encodeURIComponent(this.state[field.name])}`;
        }).join("&");
        const path = `${action}&${values}`;
        const url = path.replace('/post?', '/post-json?');
        const regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
        const email = this.state['EMAIL'];
        (!regex.test(email)) ? this.setState({ status: "empty" }) : this.sendData(url);
    };

    sendData(url) {
        this.setState({ status: "sending" });
        jsonp(url, { param: "c" }, (err, data) => {
            if (data.msg.includes("already subscribed")) {
                this.setState({ status: 'duplicate' });
            } else if (err) {
                this.setState({ status: 'error' });
            } else if (data.result !== 'success') {
                this.setState({ status: 'error' });
            } else {
                this.setState({ status: 'success' });
            };
        });
    }

    render() {
        const { fields, styles, className, buttonClassName } = this.props;
        const messages = {
            ...Mailchimp.defaultProps.messages,
            ...this.props.messages
        }
        const { status } = this.state;
        return (
            <div>

                {status !== "success" && <Form onSubmit={this.handleSubmit.bind(this)} className={className}>
                    <Form.Group widths='equal'>
                        {fields.map(input =>
                            <Form.Input fluid {...input}
                                key={input.name}
                                onChange={({ target }) => this.setState({ [input.name]: target.value })}
                                defaultValue={this.state[input.name]} />

                        )}
                    </Form.Group>

                    <Button size='huge' color='green'
                        disabled={status === "sending" || status === "success"}
                        type="submit"
                        className={buttonClassName}
                    >
                        {messages.button}
                        <Icon name='right arrow' />
                    </Button>

                    {!!status && <Message info>
                        <Message.Header>Info</Message.Header>
                        {status === "sending" && <p style={styles.sendingMsg}>{messages.sending}</p>}
                        {status === "success" && <p style={styles.successMsg}>{messages.success}</p>}
                        {status === "duplicate" && <p style={styles.duplicateMsg}>{messages.duplicate}</p>}
                        {status === "empty" && <p style={styles.errorMsg}>{messages.empty}</p>}
                        {status === "error" && <p style={styles.errorMsg}>{messages.error}</p>}
                    </Message>}

                </Form>}
                {status === "success" && <Message positive>
                    <Message.Header>Dziekuję</Message.Header>
                    <p>Prawie gotowe... Teraz musisz tylko potwierdzić swój zapis. Kliknij w link który otrzymałes na maila.</p>
                </Message>}
            </div>
        );
    }
}

Mailchimp.defaultProps = {
    messages: {
        sending: "Wysyłanie...",
        success: "Thank you for subscribing!",
        error: "An unexpected internal error has occurred.",
        empty: "You must write an e-mail.",
        duplicate: "Too many subscribe attempts for this email address",
        button: "Subscribe!"
    },
    buttonClassName: "",
    styles: {
        sendingMsg: {
            color: "#0652DD"
        },
        successMsg: {
            color: "#009432"
        },
        duplicateMsg: {
            color: "#EE5A24"
        },
        errorMsg: {
            color: "#ED4C67"
        }
    }
};

// Mailchimp.propTypes = {
//   action: PropTypes.string,
//   messages: PropTypes.object,
//   fields: PropTypes.array,
//   styles: PropTypes.object,
//   className: PropTypes.string,
//   buttonClassName: PropTypes.string
// };

export default Mailchimp;
