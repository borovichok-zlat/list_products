//---- класс редактирования списка продуктов для добавления в таблицу ----//
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

class Item extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        let view = event.target;
        
        let input = document.createElement("input");
        input.type = "text";
        input.className = "edit";
        input.value = view.innerHTML;
        
        let changeNameProduct = this.props.changeNameProduct;
        let id = this.props.id;
        let idTopSection = this.props.idTopSection;
        input.onblur = () => {
            view.innerHTML = input.value;
            input.replaceWith(view);
            changeNameProduct(id, idTopSection, input.value);
        };
        
        view.replaceWith(input);
        input.focus();
    }
    
    render() {
        return (
            <div className="borderDiv">
              <div className="view" onClick={this.handleClick}>{this.props.name}</div>
              <ButtonDelete name={this.props.name} />   
            </div>
        );
    }
}

class Summary extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        let view = event.target;
        
        let input = document.createElement("input");
        input.type = "text";
        input.className = "editTop";
        input.value = view.innerHTML;
        
        let changeNameTopSection = this.props.changeNameTopSection;
        let id = this.props.id;
        let idTopSection = this.props.idTopSection;
        input.onblur = () => {
            view.innerHTML = input.value;
            input.replaceWith(view);
            changeNameTopSection(idTopSection, input.value);
        };
        
        // чтобы не раскрывался список
        input.onkeyup = (event) => {
            event.preventDefault();
        };

        view.replaceWith(input);
        input.focus();
        
        event.preventDefault();
    }
    
    render() {
        return (
            <summary>
                <div className="viewTop" onClick={this.handleClick}>{this.props.name}</div> 
                <ButtonDelete name={this.props.name} section={true}/>
            </summary>
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
                <Summary name={this.props.name} idTopSection={this.props.idTopSection} changeNameTopSection={this.props.changeNameTopSection}/>
                {
                    subsection.map((product) => 
                        <Item key={product.id} id={product.id} name={product.name} isSelected={product.isSelected}
                                    idTopSection={this.props.idTopSection} changeNameProduct={this.props.changeNameProduct}/>
                    )
                }
                <Input key={'newProduct' + this.props.name} name={'newProduct' + this.props.name} placeholder={'Введите название продукта'}/>
            </details>
        );
    }
}

//---- левое меню ----//
class EditorLeftsidebar extends React.Component { 
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.handleClick(true);
    }
    
    render() {
       const data = this.props.data;
        
       return (
            <section className="sidebar_left">
              <ul>
                {
                    data.map((products) => 
                        <List key={products.id} name={products.topSection} subsection={products.subsection} idTopSection={products.id}
                            changeNameProduct={this.props.changeNameProduct} changeNameTopSection={this.props.changeNameTopSection}/>          
                    )
                }
                 <details>
                    <summary>добавить новый раздел</summary>
                    <Input name={'newTopSection'} placeholder={'Введите название раздела'}/>
                </details> 
              </ul>
              <button onClick={this.handleClick}>Закончить редактирование</button>    
            </section>
        );
    }
}

export default EditorLeftsidebar;