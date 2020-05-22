import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';
import deleteIcon from '../styles/img/deletesweep24px.svg';
import printIcon from '../styles/img/print.png';
import mailIcon from '../styles/img/mail.png';

//---- input ----//
function handleClick(type, view, callback, ...args) {
    let input = document.createElement("input");
    input.type = type;
    if (type === 'number') {
        input.defaultValue = "1";
        input.min = "1";
    }
    input.value = view.innerHTML.trim();
    
    input.onblur = () => {
        input.replaceWith(view);
        view.innerHTML = input.value;
        callback(...args, input.value);
    };

    view.replaceWith(input);
    input.focus();
}

//---- таблица покупок ----//
class Table extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChangeAmount(event) {
        let target = event.target;
        let idproduct = event.target.dataset.idproduct;
        let idsection = event.target.dataset.idsection;
        handleClick('number', event.target, this.props.changeAmount, idproduct, idsection);
    //    event.preventDefault();
    }
    
    handleChangeNote(event) {
        let target = event.target;
        let idproduct = event.target.dataset.idproduct;
        let idsection = event.target.dataset.idsection;
        handleClick('text', event.target, this.props.changeNote, idproduct, idsection);
    //    event.preventDefault();
    }
    
    handleClick(event) {
        const id = event.currentTarget.parentNode.parentNode.id;
        const idSection = event.currentTarget.parentNode.parentNode.dataset.idsection;
        this.props.handleClick(id, idSection, false);
    }
    
    render() {
        return (
            <section className="sectionTable" id="printableTable">    
                <table className="table">
                    <caption>Список покупок</caption>
                    <tbody>
                        <tr><th>Продукт</th><th>Количество (шт, кг)</th><th>Примечания</th><th>Удалить</th></tr>
                        {
                            this.props.products.map((product) => {
                                return (
                                    <tr key={product.id} id={product.id} data-idsection={product.idSection}>
                                        <td>{product.name}</td>
                                        <td onClick={this.handleChangeAmount} data-idproduct={product.id} data-idsection={product.idSection}>       {product.amount}
                                        </td>
                                        <td onClick={this.handleChangeNote} data-idproduct={product.id} data-idsection={product.idSection}>         {product.note}
                                        </td>
                                        <td>
                                            <button onClick={this.handleClick}>
                                                <img src={deleteIcon} className="deleteIcon"/>
                                            </button>
                                        </td>
                                    </tr>
                                )                                   
                            })
                        }
                    </tbody>  
                </table>
             </section>
        );
    }
}
    
class Footer extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClickPrint = this.handleClickPrint.bind(this);
        this.handleClickMail = this.handleClickMail.bind(this);
    }
    
    handleClickPrint(event) {
        let table = document.getElementById("printableTable");
        let table_clone = table.cloneNode(true);
        let rows = table_clone.getElementsByTagName("tr");
        
        if (rows.length > 1) {
            for (let i = 0; i < rows.length; i++) {
                rows[i].removeChild(rows[i].lastChild);
            }
        }
        
        window.frames["print_frame"].document.body.innerHTML = table_clone.innerHTML;
        window.frames["print_frame"].window.focus();
        window.frames["print_frame"].window.print();
    }
    
    handleClickMail(event) {
        alert('mail');
    }
    
    render() {
        return (
            <section className="mainSection">
                <button className="mainButton" onClick={this.handleClickPrint}><img className="icon" src={printIcon}/></button> 
                <button className="mainButton" onClick={this.handleClickMail}><img className="icon" src={mailIcon}/></button>  
                <iframe name="print_frame" width="0" height="0" frameBorder="0" src="about:blank"></iframe>
            </section> 
        );
    }
}

class Main extends React.Component {
    render() {
        let products = [];
        for (let i = 0; i < this.props.data.length; i++) {
            for (let j = 0; j < this.props.data[i].items.length; j++) {
                const items = this.props.data[i].items;
                if (items[j].isSelected === true) {
                    products.push({id: items[j].id, name: items[j].name, amount: items[j].amount, note: items[j].note,
                                   idSection: this.props.data[i].id});
                }
            }
        }

        return (
            <section className="main">
                <Table products={products} handleClick={this.props.handleClick} changeNote={this.props.changeNote} 
                        changeAmount={this.props.changeAmount}/>    
                <Footer />
            </section>
        );
    }
}

export default Main;
