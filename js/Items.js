'use strict';

class ItemsForm extends React.Component {
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
    handleContent() {
        if (this.state.isPosting)
            return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
        else return <form className="customer-form" style={{width: "50%"}} onSubmit={this.handleSubmit}>
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
    render() {
        return <div className="content">
            <TopPanel sidebar_choice={this.props.sidebar_choice} content_choice={this.props.content_choice} changeContentChoice={this.props.changeContentChoice}/>
            {this.handleContent()}
        </div>;
    }
}

class ItemsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    async getData() {
        const data = await loadData(this.props.sidebar_choice);
        if (data && data.entity === 'collection') {
            this.setState({
                isLoaded: true,
                items: data.items
            });
        }
        else if (data) {
            this.setState({
                error: data,
                isLoaded: true
            });
        }
    }
    componentDidMount() {
        get_req.abort();
        get_req = new AbortController();
        this.getData();
    }
    componentWillUnmount() {
        get_req.abort();
    }
    handleContent() {
        const { error, isLoaded, items } = this.state;
        if (error)
            return <div>Error: {error.message}</div>;
        else if (!isLoaded)
            return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
        else return <table className="inv-table" id="inv-table">
            {TableHead('NAME', 'DESCRIPTION', 'PRICE', 'ADDED ON')}
            {TableBody(items, 'name', 'description', 'amount', 'created_at')}
        </table>;
    }
    render() {
        return <div className="content">
            <TopPanel sidebar_choice={this.props.sidebar_choice} content_choice={this.props.content_choice} changeContentChoice={this.props.changeContentChoice}/>
            {this.handleContent()}
        </div>;
    }
}

function Items(props) {
    if (props.content_choice === 'list')
        return <ItemsTable sidebar_choice={props.sidebar_choice} content_choice={props.content_choice} changeContentChoice={props.changeContentChoice}/>;
    else
        return <ItemsForm sidebar_choice={props.sidebar_choice} content_choice={props.content_choice} changeContentChoice={props.changeContentChoice}/>;

}

