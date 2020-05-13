//---- класс редактирования списка продуктов для добавления в таблицу ----//
import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';
import deleteIcon from '../styles/img/deletesweep24px.svg';

//---- input ----//
function handleClick(view, isValue, className, callback, ...args) {
    let input = document.createElement("input");
    input.type = "text";
    input.className = className;
    if (isValue) {
       input.value = view.innerHTML; 
    } else {
        input.placeholder = view.innerHTML;
    }

    input.onblur = () => {
        input.replaceWith(view);
        if (input.value.trim()) {
            callback(...args, input.value);
        }
    };

    view.replaceWith(input);
    input.focus();
    
    // чтобы не раскрывался список
    input.onkeyup = (event) => {
        event.preventDefault();
    };
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
        handleClick(event.target, true, "edit", this.props.changeNameItem, this.props.id, this.props.idSection);
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
        handleClick(event.target, false, "edit", this.props.addItem, this.props.id, this.props.idSection);
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
        handleClick(event.target, true, "editTop", this.props.changeNameSection, this.props.idSection);
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

//----добавление нового раздела----//
class NewSummary extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        handleClick(event.target, false, "editTop", this.props.addSection, this.props.id);                
    }
    
    render() {
        return (
            <div className="addSection">
                <div className="viewTop" onClick={this.handleClick}>Добавить новый раздел</div>
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
        let index, id;
        if (items.length > 0) {
            index = items[0].id.lastIndexOf("_");
            id = items[0].id.substr(0, index + 1) + (items.length + 1);
        } else {
            index = this.props.idSection;
            id = index + "_1";
        }        
        
        return (
            <details>
                <Summary name={this.props.name} idSection={this.props.idSection} changeNameSection={this.props.changeNameSection}/>
                {
                    items.map((item) =>                     
                       <Item key={item.id} id={item.id} name={item.name} isSelected={item.isSelected}
                                    idSection={this.props.idSection} changeNameItem={this.props.changeNameItem}/>
                    )
                }
                <NewItem key={id} id={id} idSection={this.props.idSection} addItem={this.props.addItem}/>
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
       let index = data[0].id.lastIndexOf("_");
       let id = data[0].id.substr(0, index + 1) + (data.length + 1);    
        
       return (
            <section className="sidebar_left">
              <ul>
                {
                    data.map((items) => 
                        <List key={items.id} name={items.section} items={items.items} idSection={items.id}
                            changeNameItem={this.props.changeNameItem} changeNameSection={this.props.changeNameSection}
                            addItem={this.props.addItem}/>          
                    )
                }
                <NewSummary id={id} addSection={this.props.addSection}/>  
              </ul>
              <button onClick={this.handleClick}>Закончить редактирование</button>    
            </section>
        );
    }
}

export default EditorLeftsidebar;