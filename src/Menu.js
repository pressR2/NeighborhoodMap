import React from "react";
import * as data from "./locations.json";


class Menu extends React.Component {
    state = {
        locations: data,
        list: []
    };

    render() {
        for (var i = 0; i < this.state.locations.length; i++) {
            var title = this.state.locations[i].name;
            this.state.list.push(<li>{title}</li>);
        }


        return (
            <div id ="menu">        
                
                <h3 className="list-title">Must see in Wrocław</h3>
                <input className="input-width" type="text" placeholder="Filter location" />
                <button className="filter">Filter</button>
                <ol className="burgers-list">

                    {this.state.list}
                
                </ol>            
        </div>
        )
    }
}

export default Menu;