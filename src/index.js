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
    render() {
        return (
            <div>    
                <Topbar />
                <section>    
                    <Leftsidebar data={list}/>
                    <Table /> 
                </section>    
            </div>    
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));