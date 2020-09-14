'use strict';

async function PostForm(obj, sidebar_choice, changeContentChoice) {
    try {
        const response = await fetch(`https://rzp-training.herokuapp.com/team2/${sidebar_choice}`, { method: "POST", 
            body: JSON.stringify(obj), headers: { "Content-type": "application/json; charset=UTF-8"}, signal: save_req.signal
        });
        const data = await response.json();
        if (data.statusCode === 400)
            alert(data.error.description);
        else if (data.entity === sidebar_choice.slice(0, sidebar_choice.length - 1) || data.id)
            changeContentChoice('list');
        else
            alert(data);
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
            isPosting: false
        };
    }
    changeIsPosting(isPosting) {
        this.setState({
            isPosting: isPosting
        });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.changeIsPosting(true);
        const new_obj = {};
        for (const i in this.state)
            if (i !== 'isPosting')
                new_obj[i] = this.state[i];
        save_req.abort();
        save_req = new AbortController();
        await PostForm(new_obj, this.props.sidebar_choice, this.props.changeContentChoice);
        this.changeIsPosting(false);
    }
    render() {
        if (this.state.isPosting)
            return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
        else
            return <form className="customer-form" onSubmit={this.handleSubmit}>
            <div className="cust-panel-1">
                <div>
                    <label htmlFor="name">Name</label>
                    <input value={this.state.name} type="text" name="name" onChange={(event) => {this.setState({name: event.target.value})}}/>
                </div>
                <div>
                    <label htmlFor="contact">Phone</label>
                    <input value={this.state.contact}type="text" name="contact" onChange={(event) => {this.setState({contact: event.target.value})}}/>
                </div>
            </div>
            <label htmlFor="email">Email</label>
            <div className="cust-panel-1">
                <input value={this.state.email} type="email" name="email" onChange={(event) => {this.setState({email: event.target.value})}}/>
                <BlueButton sidebar_choice={this.props.sidebar_choice} content_choice={this.props.content_choice} handleSubmit={this.handleSubmit}/>
            </div>
        </form>;
    }
        
}