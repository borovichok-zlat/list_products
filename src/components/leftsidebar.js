import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';

class Item extends React.Component {
    render() {
        return (
            <li>{this.props.name}</li>
        );
    }
}

class Leftsidebar extends React.Component {   
    render() {
       const data = this.props.data;
       return (
            <section className="sidebar_left">
                <h1>Sprites</h1>
              <ul>
                {
                    data.map((products) => 
                        <Item key={products.id} name={products.topSection} />
                    )
                }
              </ul>
            </section>
        );
    }
}

export default Leftsidebar;