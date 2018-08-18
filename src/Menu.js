import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
    }

    /* Call search handler from parent */

    handleFilter() {
        const input = document.getElementById("filter-location").value;
        this.props.search(input);
    }

    render() {

        /* Generate location list entries */

        let list = [];
        for (let i = 0; i < this.props.places.length; i++) {
            const name = this.props.places[i].name;
            let openInfoWindowCallback = this.props.handleClick;

            list.push(
                <li
                    className="list-item"
                    key={i}
                    onClick={(function(title) {
                        return function() {
                            openInfoWindowCallback(title);
                        };
                    })(this.props.places[i].title)}
                >
                    <Link to="/search">{name}</Link>
                </li>
            );
        }

        return (
            <section id="menu">
                <h3 className="menu-title">Visit in Wroclaw</h3>
                <input id="filter-location" type="text" placeholder="Filter location" aria-label="filter query" />
                <button className="filter" onClick={this.handleFilter}>
                    Filter
                </button>
                <ul className="list">{list}</ul>
            </section>
        );
    }
}

export default Menu;
