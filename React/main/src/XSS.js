import React, { Component } from 'react';
import {escape, unescape} from 'html-escaper';
import DOMPurify from 'dompurify';
import sanitizeHtml from 'sanitize-html';
var xss = require("xss");
var escapehtml = require('escape-html');
const {htmlEscape, htmlUnescape} = require('escape-goat');


var input = "Here is your input"
var basic = "<script>alert('I am John in an annoying alert!')</script> test"
var image ="<img src='' onerror='alert(0)' />"
var link = `<a href="javascript:alert('Test')"> evil link </a>`


var textWithBold = "<h1> hi </h1>"
var name = "<p> test </p>"

class XSS extends Component {
    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this)
        this.printAll = this.printAll.bind(this)
        this.state = {showJSX: false, showInnerHTML: false}
      }

    changeState(test){
        if(test =="jsx"){
            this.setState({showJSX: !this.state.showJSX, showInnerHTML:false})

        }else if(test == "dangerously"){
            this.setState({showInnerHTML: !this.state.showInnerHTML, showJSX: false})
        }
    }

    printAll(){
        console.log("Basic:")
        console.log("escape-html: "+ escapehtml(basic))
        console.log("html-escaper: "+ escape(basic))
        console.log("escape-goat: "+ htmlEscape(basic))
        console.log("xss: " + xss(basic) )
        console.log("DOMPurify: " + DOMPurify.sanitize(basic))
        console.log("sanitizeHTML: " +  sanitizeHtml(basic))
        console.log("_________________________________________")
        console.log("image:")
        console.log("escape-html: "+ escapehtml(image))
        console.log("html-escaper: "+ escape(image))
        console.log("escape-goat: "+ htmlEscape(image))
        console.log("xss: " + xss(image) )
        console.log("DOMPurify: " + DOMPurify.sanitize(image))
        console.log("sanitizeHTML: " +  sanitizeHtml(image))
        console.log("_________________________________________")
        console.log("Link:")
        console.log("escape-html: "+ escapehtml(link))
        console.log("html-escaper: "+ escape(link))
        console.log("escape-goat: "+ htmlEscape(link))
        console.log("xss: " + xss(link) )
        console.log("DOMPurify: " + DOMPurify.sanitize(link))
        console.log("sanitizeHTML: " +  sanitizeHtml(link))
    }


    render() {
        var content 
        if (this.state.showJSX){
            content = 
                <div>
                    <h1> {input}</h1>
                </div>  
        }
        if(this.state.showInnerHTML){
            content = 
                <div>
                    <div dangerouslySetInnerHTML={{__html: input}}></div>
                </div> 
        }

        return(
        <div>
        <button onClick={() => input = basic}>
        Basic
        </button>

        <button onClick={() => input = image}>
        Image
        </button>

        <button onClick={() => input = link}>
        URL
        </button>
        <p>
        <button onClick={() => {this.changeState("jsx")}}>
        JSX
        </button>
        <button onClick={() => {this.changeState("dangerously")}}>
        Dangerously
        </button>
        </p>
        <p>
            Library print out: <button onClick={() => {this.printAll()}}> Print</button>
        </p>
        {content}
        </div>
        )
    }
}

export default XSS;
