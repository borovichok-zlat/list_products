import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';
import deleteIcon from '../styles/img/deletesweep24px.svg';

//---- добавление нового раздела или продукта ----//
class Input extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {value: ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        if (this.props.name === 'newTopSection') {
            alert("новый раздел:" + this.state.value);
        } else {
            alert("новый продукт:" + this.state.value);
        }
        event.preventDefault();
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder={this.props.placeholder} onChange={this.handleChange}/>
                <input type="submit" value="сохранить" />    
            </form>
        );
    }
}

//---- кнопка удаления раздела или продукта ----//
class ButtonDelete extends React.Component {
    constructor(props) {
        super(props);
       
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {        
        if (this.props.section === true) {
            alert('delete section: ' + this.props.name);
        } else {
            alert('delete product: ' + this.props.name);
        }
        
        event.preventDefault();
    }
    
    render() {
        return (
            <button className="deleteButton" onClick={this.handleClick}><img src={deleteIcon} className="deleteIcon"/></button>
        );
    }
}


//---- чекбоксы для выбора продуктов ----//
class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {isSelected: false, delete: null};
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        
        this.setState({isSelected: target.checked});
        this.props.handleInputChange(target.id, target.dataset.name, target.checked, );
    }
    
    render() {
        return (
            <div className="borderDiv">
              <input type="checkbox" name="selectedProduct" id={this.props.id} checked={this.state.isSelected}
                     onChange={this.handleInputChange} data-name={this.props.name} />
              <label>{this.props.name}</label>
              <ButtonDelete name={this.props.name} />   
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
                <summary>
                    {this.props.name} 
                    <ButtonDelete name={this.props.name} section={true}/>
                </summary>
                {
                    subsection.map((product) => 
                        <CheckBox key={product.id} id={product.id} name={product.name} handleInputChange={this.props.handleInputChange} 
                                    isSelected={this.props.isSelected}/>
                    )
                }
                <Input key={'newProduct' + this.props.name} name={'newProduct' + this.props.name} placeholder={'Введите название продукта'}/>
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
                        <List key={products.id} name={products.topSection} subsection={products.subsection} 
                              handleInputChange={this.props.handleInputChange} isSelected={this.props.isSelected} />
                    )
                }
                <details>
                    <summary>добавить новый раздел</summary>
                    <Input name={'newTopSection'} placeholder={'Введите название раздела'}/>
                </details>  
              </ul>
            </section>
        );
    }
}

export default Leftsidebar;