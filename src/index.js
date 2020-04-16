import React from "react";
import ReactDOM from "react-dom";
import Topbar from "./components/topbar.js";
import Leftsidebar from "./components/leftsidebar.js";
import Table from "./components/table.js";
import './styles/index.css';

let list = [
    {id: 1, topSection: "мясо", subsection: ["курица", "говядина", "свинина", "индейка"]},
    {id: 2, topSection: "рыба", subsection: ["хек", "треска", "камбала", "селедка"]},
    {id: 3, topSection: "овощи", subsection: ["картошка", "огурцы", "помидоры", "перец"]},
    {id: 4, topSection: "хлеб", subsection: ["черный хлеб", "багет"]},
    {id: 5, topSection: "фрукты", subsection: ["яблоки", "бананы", "груши", "киви"]},               
    {id: 6, topSection: "косметика", subsection: ["зубная паста", "дезодорант", "шампунь", "мыло"]},
    {id: 7, topSection: "дети", subsection: ["пюре овощное", "подгузники", "каша", "влажные салфетки"]}
];

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {products: [{name: null, isSelected: true}]};
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickDeleteTr = this.handleClickDeleteTr.bind(this);
    }
    
    handleInputChange(product, isSelected) {         
        if (isSelected) { // добавление продукта
            this.setState((state, props) => {
                let flag = false;
                for (let i = 0; i < state.products.length; i++) {
                    if (state.products[i].name === product) {
                        flag = true;
                        break;
                    }          
                }

                if (flag === false) {
                    return {products: [...state.products, {name: product, isSelected: true}]}
                }
            });
        } else { // удаление продукта из таблицы
            this.deleteProduct(product);
        }  
    }
    
    handleClickDeleteTr(product) {
        this.deleteProduct(product);
    }
    
    deleteProduct(product) {
        this.setState((state, props) => {
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].name === product) {
                    state.products.splice(i, 1);
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
                    <Leftsidebar data={list} handleInputChange={this.handleInputChange} isSelected={false}/>
                    <Table products={this.state.products} handleClick={this.handleClickDeleteTr}/> 
                </section>    
            </div>    
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));