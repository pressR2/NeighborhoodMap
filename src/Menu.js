import React from "react";


class Menu extends React.Component {
    render() {
        return (
            <div id ="menu">        
                
                <h3 className="list-title">Burgers bar</h3>
                <input className="input-width" type="text" placeholder="Bar location" />
                <button className="filter">Filter</button>
                <ol className="burgers-list">
                
                  <li className="burger">Eat Me</li>
                  <li className="burger">Awasome burger</li>
                  <li className="burger">Burger the best</li>
                  <li className="burger">Vege burger</li>
                  <li className="burger">Muuu</li>
                
                </ol>            
        </div>
        )
    }
}

export default Menu;