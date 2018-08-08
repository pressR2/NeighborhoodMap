import React from "react";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
    }
    state = {
        list: []
    };

    handleFilter() {
        var input = document.getElementById("filter-location").value;
        this.props.search(input);
    }

    render() {
        this.state.list = [];
        for (let i = 0; i < this.props.places.length; i++) {
            var name = this.props.places[i].name;
            let f = this.props.handleClick

            this.state.list.push(<li onClick={(function(title){
                return function() {
                    f(title)
                }
            })(this.props.places[i].title)}>{name}</li>);
        }

        return (
            <div id="menu">
                <h3 className="list-title">Visit in Wroclaw</h3>
                <input id="filter-location" type="text" placeholder="Filter location" />
                <button className="filter" onClick={this.handleFilter}>
                    Filter
                </button>
                <ol className="list">{this.state.list}</ol>
            </div>
        );
    }
}

export default Menu;
