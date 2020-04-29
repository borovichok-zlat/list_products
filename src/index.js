import React from "react";
import ReactDOM from "react-dom";
import Topbar from "./components/topbar.js";
import Leftsidebar from "./components/leftsidebar.js";
import Table from "./components/table.js";
// import EditorLeftsidebar from "./components/editorLeftsidebar.js";
import './styles/index.css';

let list = [
    {id: "t_1", topSection: "мясо", 
                subsection: [{id: "m_1", name: "курица", isSelected: false},
                             {id: "m_2", name: "говядина", isSelected: false},
                             {id: "m_3", name: "свинина", isSelected: false},
                             {id: "m_4", name: "индейка", isSelected: false}]},
    {id: "t_2", topSection: "рыба",
                subsection: [{id: "f_1", name: "хек", isSelected: false},
                             {id: "f_2", name: "треска", isSelected: false},
                             {id: "f_3", name: "камбала", isSelected: false},
                             {id: "f_4", name: "селедка", isSelected: false}]},
    {id: "t_3", topSection: "овощи",
                subsection: [{id: "v_1", name: "картошка", isSelected: false},
                             {id: "v_2", name: "огурцы", isSelected: false},
                             {id: "v_3", name: "помидоры", isSelected: false}, 
                             {id: "v_4", name: "перец", isSelected: false}]},
    {id: "t_4", topSection: "хлеб", 
                subsection: [{id: "b_1", name: "черный хлеб", isSelected: false},
                             {id: "b_2", name: "багет", isSelected: false}]},
    {id: "t_5", topSection: "фрукты", 
                subsection: [{id: "fr_1", name: "яблоки", isSelected: false}, 
                             {id: "fr_2", name: "бананы", isSelected: false}, 
                             {id: "fr_3", name: "груши", isSelected: false}, 
                             {id: "fr_4", name: "киви", isSelected: false}]},               
    {id: "t_6", topSection: "косметика", 
                subsection: [{id: "c_1", name: "зубная паста", isSelected: false}, 
                             {id: "c_2", name: "дезодорант", isSelected: false}, 
                             {id: "c_3", name: "шампунь", isSelected: false},
                             {id: "c_4", name: "мыло", isSelected: false}]},
    {id: "t_7", topSection: "дети", 
                subsection: [{id: "chld_1", name: "пюре овощное", isSelected: false},
                             {id: "chld_2", name: "подгузники", isSelected: false}, 
                             {id: "chld_3", name: "каша", isSelected: false}, 
                             {id: "chld_4", name: "влажные салфетки", isSelected: false}]}
];

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {list: []};
        
        this.changeSelection = this.changeSelection.bind(this);
    }
    
    componentDidMount() {
        // здесь должен быть запрос в базу
        this.setState({list: [...list]});
    }
    
    componentWillUnmount() {
        
    }
    
    // добавление-удаление продукта из таблицы
    changeSelection(id, idTopSection, isSelected) {
        this.setState(state => {
           const list = state.list.map(item => {
               if (item.id === idTopSection) {
                   const subsection = item.subsection.map(product => {
                       if (product.id === id) {
                           const selectedProduct = {id: product.id, name: product.name, isSelected: isSelected};                               
                           return selectedProduct;
                       }
                       return product;
                   });
                   const newItem = {id: item.id, topSection: item.topSection, subsection: subsection};
                   return newItem;
               } else {
                   return item;
               }
           });

           return {list};
        });
    }
    
    render() {
        return (
            <div>    
                <Topbar />
                <section>    
                    <Leftsidebar data={this.state.list} handleInputChange={this.changeSelection}/>
                    <Table data={this.state.list} handleClick={this.changeSelection}/>
                </section>    
            </div>    
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));