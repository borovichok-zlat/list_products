import React from "react";
import ReactDOM from "react-dom";
import Topbar from "./components/topbar.js";
import Leftsidebar from "./components/leftsidebar.js";
import Main from "./components/table.js";
import EditorLeftsidebar from "./components/editorLeftsidebar.js";
import './styles/index.css';

let list = [
    {id: "t_1", section: "мясо", 
                     items: [{id: "m_1", name: "курица", isSelected: false, note: "", amount: 1},
                             {id: "m_2", name: "говядина", isSelected: false, note: "", amount: 1},
                             {id: "m_3", name: "свинина", isSelected: false, note: "", amount: 1},
                             {id: "m_4", name: "индейка", isSelected: false, note: "", amount: 1}]},
    {id: "t_2", section: "рыба",
                     items: [{id: "f_1", name: "хек", isSelected: false, note: "", amount: 1},
                             {id: "f_2", name: "треска", isSelected: false, note: "", amount: 1},
                             {id: "f_3", name: "камбала", isSelected: false, note: "", amount: 1},
                             {id: "f_4", name: "селедка", isSelected: false, note: "", amount: 1}]},
    {id: "t_3", section: "овощи",
                     items: [{id: "v_1", name: "картошка", isSelected: false, note: "", amount: 1},
                             {id: "v_2", name: "огурцы", isSelected: false, note: "", amount: 1},
                             {id: "v_3", name: "помидоры", isSelected: false, note: "", amount: 1}, 
                             {id: "v_4", name: "перец", isSelected: false, note: "", amount: 1},
                             {id: "v_5", name: "кабачок", isSelected: false, note: "", amount: 1}]},
    {id: "t_4", section: "хлеб", 
                     items: [{id: "b_1", name: "черный хлеб", isSelected: false, note: "", amount: 1},
                             {id: "b_2", name: "багет", isSelected: false, note: "", amount: 1}]},
    {id: "t_5", section: "фрукты", 
                      items: [{id: "fr_1", name: "яблоки", isSelected: false, note: "", amount: 1}, 
                             {id: "fr_2", name: "бананы", isSelected: false, note: "", amount: 1}, 
                             {id: "fr_3", name: "груши", isSelected: false, note: "", amount: 1}, 
                             {id: "fr_4", name: "киви", isSelected: false, note: "", amount: 1}]},               
    {id: "t_6", section: "косметика", 
                     items: [{id: "c_1", name: "зубная паста", isSelected: false, note: "", amount: 1}, 
                             {id: "c_2", name: "дезодорант", isSelected: false, note: "", amount: 1}, 
                             {id: "c_3", name: "шампунь", isSelected: false, note: "", amount: 1},
                             {id: "c_4", name: "мыло", isSelected: false, note: "", amount: 1},
                             {id: "c_5", name: "гель для душа", isSelected: false, note: "", amount: 1},
                             {id: "c_6", name: "зубная нить", isSelected: false, note: "", amount: 1}]},
    {id: "t_7", section: "дети", 
                     items: [{id: "chld_1", name: "пюре овощное", isSelected: false, note: "", amount: 1},
                             {id: "chld_2", name: "подгузники", isSelected: false, note: "", amount: 1}, 
                             {id: "chld_3", name: "каша", isSelected: false, note: "", amount: 1}, 
                             {id: "chld_4", name: "влажные салфетки", isSelected: false, note: "", amount: 1}]}
];

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {list: [], hideEditor: true};
        
        
        this.handleClickHideEditor = this.handleClickHideEditor.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.changeNameItem = this.changeNameItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.changeNameSection = this.changeNameSection.bind(this);
        this.addSection = this.addSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        
    }
    
    componentDidMount() {
        // здесь должен быть запрос в базу
        this.setState({list: [...list]});
    }
    
    componentWillUnmount() {
        
    }
        
    // скрыть-показать редактор
    handleClickHideEditor(value) {
        this.setState({hideEditor: value});
    }
    
    // добавление-удаление продукта из таблицы
    changeSelection(id, idSection, isSelected) {
        this.setState(state => {
            const list = state.list.map(section => {
               if (section.id === idSection) {
                   const items = section.items.map(item => {
                       if (item.id === id) {
                           const selectedItem = {id: item.id, name: item.name, isSelected: isSelected, note: "", amount: 1};
                           return selectedItem;
                       }
                       return item;
                   });
                   const newSection = {id: section.id, section: section.section, items: items};
                   return newSection;
               } else {
                   return section;
               }
           });

           return {list};
        });
    }    
    
    // меняем назание продукта
    changeNameItem(id, idSection, name) {
        this.setState(state => {
           const list = state.list.map(section => {
               if (section.id === idSection) {
                   const items = section.items.map(item => {
                       if (item.id === id) {
                           const selectedItem = {id: item.id, name: name, isSelected: item.isSelected, note: item.note, amount: item.amount};  
                           return selectedItem;
                       }
                       return item;
                   });
                   const newSection = {id: section.id, section: section.section, items: items};
                   return newSection;
               } else {
                   return section;
               }
           });

           return {list};
        });
    }
    
    // добавление нового продукта
    addItem(id, idSection, name) {
        this.setState(state => {
           const list = state.list.map(section => {
               if (section.id === idSection) {
                   let item = {id: id, name: name, isSelected: false, note: "", amount: 1};
                   let items = [...section.items, item];
                   
                   const newSection = {id: idSection, section: section.section, items: items};
                   return newSection;
               } else {
                   return section;
               }
           });

           return {list};
        });
    }
    
    // удаляем продукт
    deleteItem(id, idSection) {
        this.setState(state => {
            const list = state.list.map(section => {
                if (section.id === idSection) {
                    const items = section.items.filter(item => {
                        if (item.id !== id) {
                            return item;
                        }
                    });
                    const newSection = {id: section.id, section: section.section, items: items};
                    return newSection;
                } else {
                    return section;
                }
            });
           
            return {list};
        });
    }
    
    // изменяем примечание
    changeNote(id, idSection, note) {
        this.setState(state => {
           const list = state.list.map(section => {
               if (section.id === idSection) {
                   const items = section.items.map(item => {
                       if (item.id === id) {
                           const noteItem = {id: item.id, name: item.name, isSelected: item.isSelected, note: note, amount: item.amount};  
                           return noteItem;
                       }
                       return item;
                   });
                   const newSection = {id: section.id, section: section.section, items: items};
                   return newSection;
               } else {
                   return section;
               }
           });

           return {list};
        });
    }
    
    // изменяем количество
    changeAmount(id, idSection, amount) {
        this.setState(state => {
           const list = state.list.map(section => {
               if (section.id === idSection) {
                   const items = section.items.map(item => {
                       if (item.id === id) {
                           const amountItem = {id: item.id, name: item.name, isSelected: item.isSelected, note: item.note, amount: amount};  
                           return amountItem;
                       }
                       return item;
                   });
                   const newSection = {id: section.id, section: section.section, items: items};
                   return newSection;
               } else {
                   return section;
               }
           });

           return {list};
        });
    }
    
    // меняем название секции
    changeNameSection(id, name) {
        this.setState(state => {
           const list = state.list.map(section => {
               if (section.id === id) {
                   const newSection = {id: id, section: name, items: section.items};
                   return newSection;
               } else {
                   return section;
               }
           });

           return {list};
        });
    }
    
    // добавление нового раздела
    addSection(id, name) {
        let section = {id: id, section: name, items: []};
        this.setState({list: [...this.state.list, section]});
    }
    
    // удаление раздела
    deleteSection(id) {
        this.setState(state =>{
           const list = state.list.filter(section => {
               if (section.id !== id) {
                   return section;
               }
           }) 
           
           return {list};
        });
    }
   
    render() {
        return (
            <div>    
                <Topbar handleClick={this.handleClickHideEditor}/>
                <section> 
                    {
                        this.state.hideEditor ? (
                            <Leftsidebar data={this.state.list} handleInputChange={this.changeSelection}/>
                        ) : (
                            <EditorLeftsidebar data={this.state.list} handleClick={this.handleClickHideEditor} 
                                changeNameItem={this.changeNameItem} changeNameSection={this.changeNameSection}
                                addItem={this.addItem} addSection={this.addSection}
                                deleteItem={this.deleteItem} deleteSection={this.deleteSection}/>
                        )
                    }            
                    <Main data={this.state.list} handleClick={this.changeSelection} changeNote={this.changeNote} 
                        changeAmount={this.changeAmount}/>
                </section>    
            </div>    
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));