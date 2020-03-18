import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';

class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {isSelected: false};
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        
        this.setState({isSelected: target.checked});
    }
    
    render() {
        return (
            <div>
              <input type="checkbox" name="selectedProduct" checked={this.state.isSelected} onChange={this.handleInputChange} />
              <label>{this.props.name}</label>
            </div>
        );
    }
}

class Item extends React.Component {
    render() {
        const subsection = this.props.subsection;
        return (
            <details>
                <summary>{this.props.name}</summary>
                {
                    subsection.map((product) => 
                        <CheckBox key={product} name={product} />
                    )
                }
            </details>
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
                        <Item key={products.id} name={products.topSection} subsection={products.subsection} />
                    )
                }
              </ul>
            </section>
        );
    }
}

export default Leftsidebar;