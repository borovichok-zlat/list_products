import React from "react";
// import ReactDOM from "react-dom";
import '../styles/index.css';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClickPrint = this.handleClickPrint.bind(this);
    }
    
    handleClickPrint(event) {
        let table = document.getElementById("printableTable");
        let table_clone = table.cloneNode(true);
        let rows = table_clone.getElementsByTagName("tr");
        
        if (rows[0].children.length === 4) {
            for (let i = 0; i < rows.length; i++) {
                rows[i].removeChild(rows[i].lastChild);
            }
        } else {
            for (let i = 0; i < rows.length; i++) {
                rows[i].removeChild(rows[i].children[3]);
                rows[i].removeChild(rows[i].lastChild);
            }
        }
        
        window.frames["print_frame"].document.body.innerHTML = table_clone.innerHTML;
        window.frames["print_frame"].window.focus();
        window.frames["print_frame"].window.print();
    }
    
    render() {
        return (
            <section className="menu">
                <button className="menuBtn">создать список</button>
                <button className="menuBtn">открыть</button>
                <button className="menuBtn">сохранить</button>
                <button className="menuBtn" onClick={this.handleClickPrint}>печать</button>
                <iframe name="print_frame" title="print_frame" width="0" height="0" frameBorder="0" src="about:blank"></iframe>
            </section>
        );
    }
    
}

export default Topbar;