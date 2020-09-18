import React from 'react';
import load_gif from '../../images/load.gif';
import LoadData from '../Helper/API/LoadData';
import TableHead from '../Helper/TableMaker/TableHead';
import TableBody from '../Helper/TableMaker/TableBody';

export default class ItemsTable extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    async getData() {
        const data = await LoadData(this.props.sidebar_choice);
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
        this.getData();
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error)
            return <div>Error: {error.message}</div>;
        else if (!isLoaded)
            return <img src={load_gif} alt="Loading...." id="load-img"></img>;
        else return <table className="inv-table" id="inv-table">
            {TableHead('NAME', 'DESCRIPTION', 'PRICE', 'ADDED ON')}
            {TableBody(items, 'name', 'description', 'amount', 'created_at')}
        </table>;
    }
}