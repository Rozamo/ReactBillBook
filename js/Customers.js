'use strict';

async function PostForm(obj, sidebar_choice, changeContentChoice) {
    try {
        const response = await fetch(`https://rzp-training.herokuapp.com/team2/${sidebar_choice}`, { 
            method: "POST", body: JSON.stringify(obj), headers: { "Content-type": "application/json; charset=UTF-8"}
        });
        const data = await response.json();
        if (data.statusCode !== 400) {
            changeContentChoice('list'); }
        else 
            alert(data.error.description);
    }
    catch (error) {
        alert(error);
    }
}

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contact: '',
            email: '',
        };
    }
    handleSubmit = (event) => {
        document.getElementById("button").disabled = true;
        PostForm(this.state, this.props.sidebar_choice, this.props.changeContentChoice);
        document.getElementById("button").disabled = false;
        event.preventDefault();
    }
    render() {
        return <form className="customer-form" onSubmit={this.handleSubmit}>
            <div className="cust-panel-1">
                <label>
                    Name:
                    <input value={this.state.name} type="text" name="name" onChange={(event) => {this.setState({name: event.target.value})}}/>
                </label>
                <label>
                    Phone:
                    <input value={this.state.contact}type="text" name="phone" onChange={(event) => {this.setState({contact: event.target.value})}}/>
                </label>
            </div>
            <label htmlFor="email">Email</label>
            <div className="cust-panel-1">
                <input value={this.state.email} type="email" name="email" onChange={(event) => {this.setState({email: event.target.value})}}/>
                <BlueButton type="submit" handleSubmit={this.handleSubmit}/>
            </div>
        </form>;
    }
        
}