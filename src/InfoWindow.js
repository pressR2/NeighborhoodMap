import React from "react";
import { Link } from "react-router-dom";

/* We use to parse wikipedia API response into react components */

const HtmlToReactParser = require("html-to-react").Parser;

class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.getInfo = this.getInfo.bind(this);
    }

    state = {
        content: ""
    };

    /* Gets info from wikipedia extract in form of HTML */
    getInfo() {
        const url =
            "https://en.wikipedia.org/w/api.php?action=query&titles=" +
            this.props.filterQuery +
            "&prop=extracts&exintro=1&rvprop=content&format=json&formatversion=2&origin=*";

        fetch(url)
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
                console.log("err: " + err);
                let errorContent = <span>Wikipedia fetch error</span>;
                this.setState({ content: errorContent });
            });
    }

    /* Only fetch when there was a change in the location query */
    componentDidUpdate(prevProps) {
        if (this.props.filterQuery !== prevProps.filterQuery) {
            this.getInfo();
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    render() {
        const infoContent = (
            <aside id="infoWindow" tabIndex={0}>
                <header className="infoHeader">
                    <h4>From Wikipedia</h4>
                    <Link className="close-search" to="/" aria-label="close info Window" />
                </header>
                <hr />
                <article>{this.state.content}</article>
            </aside>
        );

        return this.state.content !== "" ? infoContent : null;
    }
}
export default InfoWindow;
