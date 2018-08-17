import React from "react";
import { Link } from "react-router-dom";

var HtmlToReactParser = require("html-to-react").Parser;

class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.getInfo = this.getInfo.bind(this);
    }

    state = {
        content: ""
    };

    getInfo() {
        var url =
            "https://en.wikipedia.org/w/api.php?action=query&titles=" +
            this.props.filterQuery +
            "&prop=extracts&exintro=1&rvprop=content&format=json&formatversion=2&origin=*";
        fetch(url, {
            headers: { Accept: "application/json" }
        })
            .then(function(response) {
                return response.json();
            })
            .then(data => {
                let parser = new HtmlToReactParser();
                if (data.query !== undefined) {
                    let parsedHtml = parser.parse(data.query.pages["0"].extract);
                    this.setState({ content: parsedHtml });
                }
            })
            .catch(err => {
                console.log(err);
                let errorContent = <span>Wikipedia fetch error</span>;
                this.setState({ content: errorContent });
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.filterQuery !== prevProps.filterQuery) {
            this.getInfo();
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    render() {
        var infoContent = (
            <aside id="infoWindow" tabIndex={0}>
                <header className="infoHeader">
                    <h4>Read more</h4>
                    <Link className="close-search" to="/" aria-label="close info Window" />
                </header>
                <hr />
                <article>{this.state.content}</article>
                <footer>From Wikipedia</footer>
            </aside>
        );

        return this.state.content !== "" ? infoContent : null;
    }
}
export default InfoWindow;
