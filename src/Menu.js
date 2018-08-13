import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter() {
        var input = document.getElementById("filter-location").value;
        this.props.search(input);
    }


    render() {
        let list = [];
        for (let i = 0; i < this.props.places.length; i++) {
            var name = this.props.places[i].name;
            let f = this.props.handleClick

            list.push(
            <li className = "list-item" key = {i} onClick={(function(title){
                return function() {
                        f(title)
                }
                })(this.props.places[i].title)}>
                <Link to="/search">
                    {name}
                </Link>
            </li>);
        }

        return (
            <div id="menu">
                <h3 className="list-title">Visit in Wroclaw</h3>
                <input id="filter-location" type="text" placeholder="Filter location" />
                <button className="filter" onClick={this.handleFilter}>
                    Filter
                </button>
                <ol className="list">{list}</ol>
            </div>
        );
    }
}

export default Menu;
