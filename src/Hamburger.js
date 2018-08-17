import React from "react";

function openMenu(e) {
    var menu = document.getElementById("menu");
    menu.classList.toggle("open");
    var infoWindow = document.getElementById("infoWindow");
    if (infoWindow !== null) {
        infoWindow.classList.toggle("open");
    }

    e.stopPropagation();
}

class Hamburger extends React.Component {
    render() {
        return (
            <div className="drawer-control" onClick={openMenu} role="button" aria-label="open drawer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z" />
                </svg>
            </div>
        );
    }
}

export default Hamburger;
