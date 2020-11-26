//---- класс редактирования списка продуктов для добавления в таблицу ----//
import React from "react";
// import ReactDOM from "react-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles/index.css';
import deleteIcon from '../styles/img/delete2.png';
import listIcon from '../styles/img/list.png';

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
        // при нажатии на enter снимаем фокус
        if (event.key === "Enter") {
            input.blur();
        }
    };
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }
    
    handleClick(event) {
        handleClick(event.target, true, "inputElement", this.props.changeNameItem, this.props.id, this.props.idSection);
    }
    
    handleClickDelete(event) {
        if (this.props.isSelected) {
            const deleteItem = () => {this.props.deleteItem(this.props.id, this.props.idSection)};
            const options = {
                message: 'Данный продукт находится в списке покупок. Вы действительно хотите его удалить?',
                buttons: [
                    {
                        label: 'Удалить',
                        onClick: deleteItem
                    },
                    {
                        label: 'Не удалять'
                    }
                ],
                closeOnEscape: false,
                closeOnClickOutside: false
            };
            confirmAlert(options);
        } else {
            this.props.deleteItem(this.props.id, this.props.idSection);
        }
    }
    
    render() {
        return (
            <div className="editDiv">
              <div className="editElement" onClick={this.handleClick}>{this.props.name}</div>
              <button className="deleteBtn" onClick={this.handleClickDelete}><img src={deleteIcon} className="deleteIcon" alt=""/></button>   
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
        handleClick(event.target, false, "inputElement", this.props.addItem, this.props.id, this.props.idSection);
    }
    
    render() {
        return (
            <div className="editDiv">
              <div className="editElement" onClick={this.handleClick}>Введите название продукта</div>
            </div>
        );
    }
}

class Summary extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }
    
    handleClick(event) {
        handleClick(event.target, true, "inputElement", this.props.changeNameSection, this.props.idSection);
        event.preventDefault();
    }
    
    handleClickDelete(event) {
        if (this.props.isSelectedProduct) {
            const deleteSection = () => {this.props.deleteSection(this.props.idSection)};
            const options = {
                message: 'Продукты из данного раздела находится в списке покупок. Вы действительно хотите его удалить?',
                buttons: [
                    {
                        label: 'Удалить',
                        onClick: deleteSection
                    },
                    {
                        label: 'Не удалять'
                    }
                ],
                closeOnEscape: false,
                closeOnClickOutside: false
            };
            confirmAlert(options);
        } else {
            this.props.deleteSection(this.props.idSection);
        }
        event.preventDefault();
    }
    
    render() {
        return (
            <summary>            
                <div className="editSummary" onClick={this.handleClick}>{this.props.name}</div> 
                <button className="deleteBtnSummary" onClick={this.handleClickDelete}>
                    <img src={deleteIcon} className="deleteIcon" alt=""/>
                </button>   
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
        handleClick(event.target, false, "inputElement", this.props.addSection);                
    }
    
    render() {
        return (
            <div className="divNewSummary"> 
                +&nbsp;
                <div className="editSummary" onClick={this.handleClick}>Добавить новый раздел</div>
            </div>
        );
    }
}

//---- разделы с продуктами ----//
class List extends React.Component {
    /*
    constructor(props) {
        super(props);
    }
    */
    
    render() {
        const items = this.props.items;
        let num, index, id;
        if (items.length > 0) {
            index = items[0].id.lastIndexOf("_");
            num = Number(items[items.length - 1].id.substr(index + 1)) + 1;
            id = items[0].id.substr(0, index + 1) + num;
        } else {
            index = this.props.idSection;
            id = index + "_1";
        }
        
        let isSelectedProduct = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i].isSelected) {
                isSelectedProduct = true;
                break;
            }
        }
                
        return (
            <details>
                <Summary name={this.props.name} idSection={this.props.idSection} changeNameSection={this.props.changeNameSection}
                        deleteSection={this.props.deleteSection} isSelectedProduct={isSelectedProduct}/>
                <div className="divCheckboxes">
                    {
                        items.map((item) =>                     
                           <Item key={item.id} id={item.id} name={item.name} isSelected={item.isSelected}
                                        idSection={this.props.idSection} changeNameItem={this.props.changeNameItem}
                                        deleteItem={this.props.deleteItem}/>
                        )
                    }
                    <NewItem key={id} id={id} idSection={this.props.idSection} addItem={this.props.addItem}/>
                </div>    
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
            <section className="sidebar">
              <button className="editorListBtn" onClick={this.handleClick}><img src={listIcon} className="icon" alt=""/></button>
                {
                    data.map((items) => 
                        <List key={items._id} name={items.section} items={items.items} idSection={items._id}
                            changeNameItem={this.props.changeNameItem} changeNameSection={this.props.changeNameSection}
                            addItem={this.props.addItem} deleteSection={this.props.deleteSection}
                            deleteItem={this.props.deleteItem}/>          
                    )
                }
                <NewSummary addSection={this.props.addSection}/>  
            </section>
        );
    }
}

export default EditorLeftsidebar;