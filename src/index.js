import React from "react";
import ReactDOM from "react-dom";
import Topbar from "./components/topbar.js";
import Leftsidebar from "./components/leftsidebar.js";
import Table from "./components/table.js";
import './styles/index.css';

let list = [
    {id: "t_1", topSection: "мясо", 
                subsection: [{id: "m_1", name: "курица"},
                             {id: "m_2", name: "говядина"},
                             {id: "m_3", name: "свинина"},
                             {id: "m_4", name: "индейка"}]},
    {id: "t_2", topSection: "рыба",
                subsection: [{id: "f_1", name: "хек"},
                             {id: "f_2", name: "треска"},
                             {id: "f_3", name: "камбала"},
                             {id: "f_4", name: "селедка"}]},
    {id: "t_3", topSection: "овощи",
                subsection: [{id: "v_1", name: "картошка"},
                             {id: "v_2", name: "огурцы"},
                             {id: "v_3", name: "помидоры"}, 
                             {id: "v_4", name: "перец"}]},
    {id: "t_4", topSection: "хлеб", 
                subsection: [{id: "b_1", name: "черный хлеб"},
                             {id: "b_2", name: "багет"}]},
    {id: "t_5", topSection: "фрукты", 
                subsection: [{id: "fr_1", name: "яблоки"}, 
                             {id: "fr_2", name: "бананы"}, 
                             {id: "fr_3", name: "груши"}, 
                             {id: "fr_4", name: "киви"}]},               
    {id: "t_6", topSection: "косметика", 
                subsection: [{id: "c_1", name: "зубная паста"}, 
                             {id: "c_2", name: "дезодорант"}, 
                             {id: "c_3", name: "шампунь"},
                             {id: "c_4", name: "мыло"}]},
    {id: "t_7", topSection: "дети", 
                subsection: [{id: "chld_1", name: "пюре овощное"},
                             {id: "chld_2", name: "подгузники"}, 
                             {id: "chld_3", name: "каша"}, 
                             {id: "chld_4", name: "влажные салфетки"}]}
];

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {products: [{id: null, name: null, isSelected: true}]};
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickDeleteTr = this.handleClickDeleteTr.bind(this);
    }
    
    componentDidMount() {
        // здесь должен быть запрос в базу
        let products = [];
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].subsection.length; j++) {
                products.push({id: list[i].subsection[j].id, name: list[i].subsection[j].name, isSelected: false});
            }
        }
        this.setState({products: products});
    }
    
    componentWillUnmount() {
        
    }
    
    handleInputChange(id, name, isSelected) {         
        if (isSelected) { // добавление продукта
            this.setState((state, props) => {
                let flag = false;
                for (let i = 0; i < state.products.length; i++) {
                    if (state.products[i].id === id) {
                        state.products[i].isSelected = isSelected;
                        break;
                    }          
                }

                return {products: state.products}
            });
        } else { // удаление продукта из таблицы
            this.deleteProduct(id);
        }  
    }
    
    handleClickDeleteTr(id) {
        this.deleteProduct(id);
    }
    
    deleteProduct(id) {
        this.setState((state, props) => {
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].id === id) {
                    state.products[i].isSelected = false;
                    break;
                }
            }
            
            return {products: state.products};
        });
    }
    
    render() {
        return (
            <div>    
                <Topbar />
                <section>    
                    <Leftsidebar data={list} handleInputChange={this.handleInputChange}/>
                    <Table products={this.state.products} handleClick={this.handleClickDeleteTr}/>
                </section>    
            </div>    
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));