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
        if (this.props.name === 'newSection') {
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
        let oldInnerHTML = view.innerHTML;
        
        let changeNameProduct = this.props.changeNameProduct;
        let id = this.props.id;
        let idSection = this.props.idSection;
        input.onblur = () => {
            view.innerHTML = input.value;
            input.replaceWith(view);
            if (input.value.trim()) {
                changeNameProduct(id, idSection, input.value);
            } else {
                view.innerHTML = oldInnerHTML;
            }
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

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        let view = event.target;
        
        let input = document.createElement("input");
        input.type = "text";
        input.className = "edit";
        input.placeholder = view.innerHTML;
        
        let addNewProduct = this.props.addNewProduct;
        let id = this.props.id;
        let idSection = this.props.idSection;
        input.onblur = () => {
            view.innerHTML = input.value;
            input.replaceWith(view);
            if (input.value.trim()) { // удаляем лишние пробелы и проверяем, что строка не пустая
                addNewProduct(id, input.value, idSection);
            } else {
                view.innerHTML = input.placeholder;
            }
        };
        
        view.replaceWith(input);
        input.focus();
    }
    
    render() {
        return (
            <div className="borderDiv">
              <div className="view" onClick={this.handleClick}>Введите название продукта</div>
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
        let oldInnerHTML = view.innerHTML;
        
        let changeNameSection = this.props.changeNameSection;
        let id = this.props.id;
        let idSection = this.props.idSection;
        input.onblur = () => {
            view.innerHTML = input.value;
            input.replaceWith(view);
            if (input.value.trim()) {
                changeNameSection(idSection, input.value);
            } else {
                view.innerHTML = oldInnerHTML;
            } 
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
        const items = this.props.items;
        let index = items[0].id.lastIndexOf("_");
        let newId = items[0].id.substr(0, index + 1) + (items.length + 1);
        
        return (
            <details>
                <Summary name={this.props.name} idSection={this.props.idSection} changeNameSection={this.props.changeNameSection}/>
                {
                    items.map((product) =>                     
                       <Item key={product.id} id={product.id} name={product.name} isSelected={product.isSelected}
                                    idSection={this.props.idSection} changeNameProduct={this.props.changeNameProduct}/>
                    )
                }
                <NewItem key={newId} id={newId} idSection={this.props.idSection} addNewProduct={this.props.addNewProduct}/>
            </details>
        );
    }
}

// <Input key={'newProduct' + this.props.name} name={'newProduct' + this.props.name} placeholder={'Введите название продукта'}/>

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
                        <List key={products.id} name={products.section} items={products.items} idSection={products.id}
                            changeNameProduct={this.props.changeNameProduct} changeNameSection={this.props.changeNameSection}
                            addNewProduct={this.props.addNewProduct}/>          
                    )
                }
                 <details>
                    <summary>добавить новый раздел</summary>
                    <Input name={'newSection'} placeholder={'Введите название раздела'}/>
                </details> 
              </ul>
              <button onClick={this.handleClick}>Закончить редактирование</button>    
            </section>
        );
    }
}

export default EditorLeftsidebar;