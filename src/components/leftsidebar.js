import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';
import editorIcon from '../styles/img/editor.png';

//---- чекбоксы для выбора продуктов ----//
class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        
        this.props.handleInputChange(target.id, target.dataset.idsection, target.checked);
    }
    
    render() {
        return (
            <div className="divCheckboxes">
                <label className="labelCheckbox">
                    <input type="checkbox" name="selectedProduct" id={this.props.id} checked={this.props.isSelected}
                        onChange={this.handleInputChange} data-name={this.props.name} data-idsection={this.props.idSection}/>
                    <div className="checkbox_text">{this.props.name}</div>
                </label>
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
        const items = this.props.items;
        return (
            <details>
                <summary>{this.props.name}</summary>
                <div className="divCheckboxes">
                    {
                        items.map((product) => 
                            <CheckBox key={product.id} id={product.id} name={product.name} isSelected={product.isSelected}
                                        idSection={this.props.idSection} handleInputChange={this.props.handleInputChange}/>
                        )
                    }
                </div>    
            </details>
        );
    }
}

//---- левое меню ----//
class Leftsidebar extends React.Component {   
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
       this.props.handleClick(false); 
    }
    
    render() {
       const data = this.props.data;
       return (
            <section className="sidebar">
                <button className="editorListBtn" onClick={this.handleClick}><img src={editorIcon} className="icon"/></button>
                {
                    data.map((products) => 
                        <List key={products.id} name={products.section} items={products.items} idSection={products.id}
                              handleInputChange={this.props.handleInputChange}/>
                    )
                }
            </section>
        );
    }
}

export default Leftsidebar;