import React from "react";
var HtmlToReactParser = require('html-to-react').Parser;

class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.getInfo = this.getInfo.bind(this);
    }

    state = {
        content: ''
    }

    getInfo() {
        var url = "https://en.wikipedia.org/w/api.php?action=query&titles=" + this.props.filterQuery + "&prop=extracts&exintro=1&rvprop=content&format=json&formatversion=2&origin=*";

        fetch(url, {
            headers:
                {'Accept': 'application/json'},
        }).then(function(response) {
            // console.log(response)
            return response.json();
        }).then((data) => {
            let parser = new HtmlToReactParser()
            if (data.query !== undefined) {
                let parsedHtml = parser.parse(data.query.pages["0"].extract)
                this.setState({content: parsedHtml})                
            }
        }).catch(function(err) {
            console.log("catch fetch error");
            console.log(err);
        });

    }

    componentDidMount() {
        this.getInfo();
    }
     
    componentDidUpdate(prevProps) {
        if(this.props.filterQuery !== prevProps.filterQuery) {
            this.getInfo();
        }
    }

    render() {
        return (
            <div id="infoWindow" >
                {this.state.content}
            </div>
            )
    }

}
export default InfoWindow;