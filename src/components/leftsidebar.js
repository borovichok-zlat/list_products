import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';
import deleteIcon from '../styles/img/deletesweep24px.svg';

//---- чекбоксы для выбора продуктов ----//
class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        
        this.props.handleInputChange(target.id, target.dataset.idtopsection, target.checked);
    }
    
    render() {
        return (
            <div className="borderDiv">
              <input type="checkbox" name="selectedProduct" id={this.props.id} checked={this.props.isSelected}
                     onChange={this.handleInputChange} data-name={this.props.name} data-idtopsection={this.props.idTopSection}/>
              <label>{this.props.name}</label>
            </div>
        );
    }
}

//---- разделы с продуктами ----//
class List extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const subsection = this.props.subsection;
        return (
            <details>
                <summary>{this.props.name}</summary>
                {
                    subsection.map((product) => 
                        <CheckBox key={product.id} id={product.id} name={product.name} isSelected={product.isSelected}
                                    idTopSection={this.props.idTopSection} handleInputChange={this.props.handleInputChange}/>
                    )
                }
            </details>
        );
    }
}

//---- левое меню ----//
class Leftsidebar extends React.Component {   
    render() {
       const data = this.props.data;
       return (
            <section className="sidebar_left">
              <ul>
                {
                    data.map((products) => 
                        <List key={products.id} name={products.topSection} subsection={products.subsection} idTopSection={products.id}
                              handleInputChange={this.props.handleInputChange}/>
                    )
                }
              </ul>
            </section>
        );
    }
}

export default Leftsidebar;