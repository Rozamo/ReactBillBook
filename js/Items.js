'use strict';

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            amount: '',
            currency: 'INR',
            isPosting: false
        }
    }
    changeIsPosting(isPosting) {
        this.setState({
            isPosting
        });
    }
    isValid() {
        if (!/^[0-9]*.?[0-9]+$/.test(this.state.amount)) {
            alert('Amount must be valid');
            return false;
        }
        return true;
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.isValid())
            return;
        this.changeIsPosting(true);
        const new_obj = {};
        for (const i in this.state)
            if (i === 'amount')
                new_obj[i] = Number(this.state[i]) * 100;
            else if (i !== 'isPosting')
                new_obj[i] = this.state[i];
        save_req.abort();
        save_req = new AbortController();
        await PostForm(new_obj, this.props.sidebar_choice, this.props.changeContentChoice);
        this.changeIsPosting(false);
    }
    render() {
        if (this.state.isPosting)
            return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
        else return <form className="customer-form" style={{width: "350px"}} onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input value={this.state.name} type="text" name="name" onChange={(event) => {this.setState({name: event.target.value})}}/>
            <label htmlFor="amount">Price</label>
            <input value={this.state.amount} type="number" name="amount" onChange={(event) => {this.setState({amount: event.target.value})}}/>
            <label htmlFor="name">Description</label>
            <textarea value={this.state.description} type="text" name="description" onChange={(event) => {this.setState({description: event.target.value})}}/>
            <br></br>
            <BlueButton sidebar_choice={this.props.sidebar_choice} content_choice={this.props.content_choice} handleSubmit={this.handleSubmit}/>
        </form>;
    }
}