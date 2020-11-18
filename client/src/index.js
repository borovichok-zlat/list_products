import React from "react";
import ReactDOM from "react-dom";
import Topbar from "./components/topbar.js";
import Main from "./components/table.js";
import EditorLeftsidebar from "./components/editorLeftsidebar.js";
import Leftsidebar from "./components/leftsidebar.js";
import './styles/index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {list: [], hideEditor: true, idTable: '0123', nameTable: 'Список покупок'};
        
        
        this.handleClickHideEditor = this.handleClickHideEditor.bind(this);
        this.changePropertyProduct = this.changePropertyProduct.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.changeNameItem = this.changeNameItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.changeNameSection = this.changeNameSection.bind(this);
        this.addSection = this.addSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.changeNameTable = this.changeNameTable.bind(this);
    }
    
    componentDidMount() {
        // получение данных из коллекции every_day
        fetch("api/list")
        .then(response => response.json())
        .then(list => {
          this.setState({list: [...list]});
        });
    }
    
    componentWillUnmount() {
        
    }
        
    // скрыть-показать редактор
    handleClickHideEditor(value) {
        this.setState({hideEditor: value});
    }
    
    changePropertyProduct(id, idSection, name, isSelected, note, amount) {
        let i, j;
        let list = this.state.list;
        
        for (i = 0; i < list.length; i++) {
            if (list[i]._id === idSection) {
                for (j = 0; j < list[i].items.length; j++) {
                    if (list[i].items[j].id === id) {
                        const item = list[i].items[j];
                        let selectedItem;
                       
                        if (isSelected !== null) {
                            selectedItem = {id: item.id, name: item.name, isSelected: isSelected, note: "", amount: 1}; 
                        } else if (name !== null) {
                            selectedItem = {id: item.id, name: name, isSelected: item.isSelected, note: item.note, amount: item.amount};
                        } else if (note !== null) {
                            selectedItem = {id: item.id, name: item.name, isSelected: item.isSelected, note: note, amount: item.amount}; 
                        } else {
                            selectedItem = {id: item.id, name: item.name, isSelected: item.isSelected, note: item.note, amount: amount}; 
                        }

                        let data = {_id: list[i]._id,  item: selectedItem};
                        fetch("api/product", {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(item => {
                            list[i].items[j] = item;
                            this.setState({list: [...list]});
                        }) 
                        .catch(err => console.log(err + " changePropertyProduct"));

                        break;
                    }
                }
                break;
            }
        }
    }
    
    // добавление-удаление продукта из таблицы
    changeSelection(id, idSection, isSelected) {
        this.changePropertyProduct(id, idSection, null, isSelected, null, null);
    }    
    
    // меняем назание продукта
    changeNameItem(id, idSection, name) {
        this.changePropertyProduct(id, idSection, name, null, null, null);
    }
    
        
    // изменяем примечание
    changeNote(id, idSection, note) {
        this.changePropertyProduct(id, idSection, null, null, note, null);
    }
    
    // изменяем количество
    changeAmount(id, idSection, amount) {
        this.changePropertyProduct(id, idSection, null, null, null, amount);
    }
    
    // добавление нового продукта
    addItem(id, idSection, name) {
        let i;
        let list = this.state.list;
        
        for (i = 0; i < list.length; i++) {
            if (list[i]._id === idSection) {
                let item = {id: id, name: name, isSelected: false, note: "", amount: 1};
                let items = [...list[i].items, item];

                let data = {_id: list[i]._id, item: item};
                fetch("api/addProduct", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(item => {
                    const newSection = {_id: list[i]._id, section: list[i].section, items: items};
                    list[i] = newSection;
                    this.setState({list: [...list]});
                })
                .catch(err => console.log(err + " addItem"));
                
                break;
            }
        }
    }
    
    // удаляем продукт
    deleteItem(id, idSection) {
        let i, j;
        let list = this.state.list;
        
        for (i = 0; i < list.length; i++) {
            if (list[i]._id === idSection) {
                for (j = 0; j < list[i].items.length; j++) {
                    if (list[i].items[j].id === id) {
                        let data = {_id: list[i]._id, item: list[i].items[j]};
                        fetch("api/deleteProduct", {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(item => {
                            list[i].items.splice(j, 1);
                            this.setState({list: [...list]});
                        })
                        .catch(err => console.log(err + " deleteItem"));
                        break;
                    }
                }
                break;
            }
        }
    }
    
    // изменяем название таблицы
    changeNameTable(value) {
        this.setState({nameTable: value});
    }
    
    // меняем название секции
    changeNameSection(id, name) {
        let i;
        let list = this.state.list;
        
        for (i = 0; i < list.length; i++) {
            if (list[i]._id === id) {
                let data = {_id: list[i]._id,  section: name};
                fetch("api/changeNameSection", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.text())
                .then(section => {
                    list[i].section = section;
                    this.setState({list: [...list]});
                })
                .catch(err => console.log(err + " changeNameSection"));
                
                break;
            }
        }
    }
    
    // добавление нового раздела
    addSection(name) {
        let section = {section: name, items: []};
        fetch("api/addSection",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(section)
        })
        .then(response => response.json())
        .then(section => {
            this.setState({list: [...this.state.list, section]});
        });
    }
    
    // удаление раздела
    deleteSection(id) {
        this.setState(state => {
            const list = state.list.filter(section => {
                if (section._id !== id) {
                    return section;
                } else {
                    fetch("/api/section/"+section._id, {
                        method: 'DELETE'
                    })
                    .catch(err => console.log(err + " deleteSection")); 
                }
            }); 

            return {list};
        });
    }
   
    render() {
        if (this.state.list.length !== 0) {
            return (
                <div className="divRoot">    
                    <Topbar/>
                    <Main nameTable={this.state.nameTable} data={this.state.list} handleClick={this.changeSelection} changeNote={this.changeNote} 
                                changeAmount={this.changeAmount} changeNameTable={this.changeNameTable}/>
                    {
                        this.state.hideEditor ? (
                            <Leftsidebar data={this.state.list}  handleClick={this.handleClickHideEditor} 
                                handleInputChange={this.changeSelection}/>
                        ) : (
                            <EditorLeftsidebar data={this.state.list} handleClick={this.handleClickHideEditor} 
                                changeNameItem={this.changeNameItem} changeNameSection={this.changeNameSection}
                                addItem={this.addItem} addSection={this.addSection}
                                deleteItem={this.deleteItem} deleteSection={this.deleteSection}/>
                        )
                    }              
                </div>    
            );
        } else {
            return (
                <div className="divRoot">    
                    <Topbar/> 
                </div>
            );
        }
        
    }
}

ReactDOM.render(<App />, document.getElementById("root"));