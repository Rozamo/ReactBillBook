'use strict';

async function PostForm(object, sidebar_choice) {
    try {
        const response = await fetch(`https://rzp-training.herokuapp.com/team2/${sidebar_choice}`, { 
            method: "POST", body: JSON.stringify(object), headers: { "Content-type": "application/json; charset=UTF-8"}
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contact: '',
            email: ''
        };
    }
    handleSubmit = (event) => {
        const response = PostForm(this.state, this.props.sidebar_choice);
        console.log("Here: ", response);
        // if (response.entity === 'customer')
        //     this.props.changeContentChoice('list');
        // else {
        //     console.log(response);
        //     this.setState({
        //         name: '',
        //         contact: '',
        //         email: ''
        //     });
        // }
        // this.props.changeContentChoice('list');
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
                <input value={this.state.email} type="text" name="email" onChange={(event) => {this.setState({email: event.target.value})}}/>
                <BlueButton type="submit" handleSubmit={this.handleSubmit}/>
            </div>
        </form>;
    }
        
}