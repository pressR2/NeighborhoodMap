import React from "react";

function openMenu(e) {
    const menu = document.getElementById("menu");
    menu.classList.toggle("open");
    const infoWindow = document.getElementById("infoWindow");
    if (infoWindow !== null) {
        infoWindow.classList.toggle("open");
    }

    e.stopPropagation();
}

class Hamburger extends React.Component {
    render() {
        return (
            <span className="drawer-control" onClick={openMenu} role="button" aria-label="open drawer" tabIndex={0}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z" />
                </svg>
            </span>
        );
    }
}

export default Hamburger;
