'use strict';

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            amount: '',
            currency: 'INR'
        }
    }
    handleSubmit = (event) => {
        this.state.amount = Number(this.state.amount) * 100;
        PostForm(this.state, this.props.sidebar_choice, this.props.changeContentChoice);
        event.preventDefault();
    }
    render() {
        return <form className="customer-form" style={{width: "50%"}} onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input value={this.state.name} type="text" name="name" onChange={(event) => {this.setState({name: event.target.value})}}/>
            <label htmlFor="amount">Price</label>
            <input value={this.state.amount} type="number" name="amount" onChange={(event) => {this.setState({amount: event.target.value})}}/>
            <label htmlFor="name">Description</label>
            <textarea value={this.state.description} type="text" name="description" onChange={(event) => {this.setState({description: event.target.value})}}/>
            <br style={{display: "block", content: "", margin: '100px'}}></br>
            <BlueButton type="submit" sidebar_choice={this.props.sidebar_choice} content_choice={this.props.content_choice} handleSubmit={this.handleSubmit}/>
        </form>;
    }
}