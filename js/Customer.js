class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          showList: true
        };
      }

    render() { 
        return ( 
            <div className="content">customer</div>
         );
    }
}