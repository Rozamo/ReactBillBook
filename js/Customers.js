'use strict';

class CustomersForm extends React.Component {
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
            isPosting
        });
    }
    isValid() {
        if (!/^[a-z A-Z.]+$/.test(this.state.name)) {
            alert('Name must not be blank and must contain only alphabets and/or a dot');
            return false;
        }
        if (!/^\+?[0-9]+$/.test(this.state.contact) || this.state.contact.length < 10) {
            alert('Phone number must contain numbers and/or + and must have atleast 10 characters');
            return false;
        }
        if (!/^[^@]+@[^@.]+.[^@.]+$/.test(this.state.email)) {
            alert('Enter valid email');
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
            if (i !== 'isPosting')
                new_obj[i] = this.state[i];
        save_req.abort();
        save_req = new AbortController();
        await PostForm(new_obj, this.props.sidebar_choice, this.props.changeContentChoice);
        this.changeIsPosting(false);
    }
    handleContent() {
        if (this.state.isPosting)
            return <img src="images/load.gif" alt="Loading...." id="load-img"></img>;
        else
            return <form className="customer-form" onSubmit={this.handleSubmit}>
            <div className="cust-panel-1">
                <div>
                    <label htmlFor="name">Name</label>
                    <input value={this.state.name} type="text" name="name" onChange={(event) => {this.setState({name: event.target.value})}} required/>
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
    render() {
        return <div className="content">
            <TopPanel sidebar_choice={this.props.sidebar_choice} content_choice={this.props.content_choice} changeContentChoice={this.props.changeContentChoice}/>
            {this.handleContent()}
        </div>;
    }        
}

class CustomersTable extends React.Component {
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
            {TableHead('NAME', 'PHONE', 'EMAIL', 'CREATED ON')}
            {TableBody(items, 'name', 'contact', 'email', 'created_at')}
        </table>;
    }
    render() {
        return <div className="content">
            <TopPanel sidebar_choice={this.props.sidebar_choice} content_choice={this.props.content_choice} changeContentChoice={this.props.changeContentChoice}/>
            {this.handleContent()}
        </div>;
    }
}

function Customers(props) {
    if (props.content_choice === 'list')
        return <CustomersTable sidebar_choice={props.sidebar_choice} content_choice={props.content_choice} changeContentChoice={props.changeContentChoice}/>;
    else
        return <CustomersForm sidebar_choice={props.sidebar_choice} content_choice={props.content_choice} changeContentChoice={props.changeContentChoice}/>;

}