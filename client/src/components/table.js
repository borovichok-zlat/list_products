import React from "react";
// import ReactDOM from "react-dom";
import '../styles/index.css';
import deleteIcon from '../styles/img/delete2.png';

//---- input ----//
function handleClick(type, view, callback, className, ...args) {
    let input = document.createElement("input");
    input.type = type;
    input.className = className;
    if (type === 'number') {
        input.defaultValue = "1";
        input.min = "1";
    }
    input.value = view.innerHTML.trim();
    
    input.onblur = () => {
        input.replaceWith(view);
        if (args.length != 0) {
            callback(...args, input.value);
        } else {
            if (input.value.trim()) {
                callback(input.value);
            }
        }
        
    };

    view.replaceWith(input);
    input.focus();
}

class OneColumn extends React.Component {
    /*
    constructor(props) {
        super(props);
    }
    */

    render() {
        return (
            <table className="table">
                <tbody>
                    <tr><th>Продукт</th><th>Количество (шт, кг)</th><th>Примечания</th><th></th></tr>
                    {
                        this.props.products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td onClick={this.props.handleChangeAmount} data-idproduct={product.id} 
                                        data-idsection={product.idSection}>       {product.amount}
                                    </td>
                                    <td onClick={this.props.handleChangeNote} data-idproduct={product.id} 
                                        data-idsection={product.idSection}>         {product.note}
                                    </td>
                                    <td>
                                        <button className="deleteBtn deleteBtnTable" onClick={this.props.handleClick} 
                                            data-idproduct={product.id} data-idsection={product.idSection}>
                                            <img src={deleteIcon} className="deleteIcon" alt=""/>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>  
            </table>
        );
    } 
}

class TwoColumns extends React.Component {
    /*
    constructor(props) {
        super(props);
    }
    */
    
    render() {
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <th>Продукт</th><th>Количество (шт, кг)</th><th>Примечания</th><th></th>
                        <th>Продукт</th><th>Количество (шт, кг)</th><th>Примечания</th><th></th>
                    </tr>
                    {
                        this.props.products.map((product) => {
                            if (product.length === 2) {
                                return (
                                    <tr key={product[0].id}>
                                        <td>{product[0].name}</td>
                                        <td onClick={this.props.handleChangeAmount} data-idproduct={product[0].id} 
                                            data-idsection={product[0].idSection}>       {product[0].amount}
                                        </td>
                                        <td onClick={this.props.handleChangeNote} data-idproduct={product[0].id} 
                                            data-idsection={product[0].idSection}>         {product[0].note}
                                        </td>
                                        <td>
                                            <button className="deleteBtn deleteBtnTable" onClick={this.props.handleClick} 
                                                data-idproduct={product[0].id} data-idsection={product[0].idSection}>
                                                <img src={deleteIcon} className="deleteIcon" alt=""/>
                                            </button>
                                        </td>
                                        <td>{product[1].name}</td>
                                        <td onClick={this.props.handleChangeAmount} data-idproduct={product[1].id} 
                                            data-idsection={product[1].idSection}>       {product[1].amount}
                                        </td>
                                        <td onClick={this.props.handleChangeNote} data-idproduct={product[1].id} 
                                            data-idsection={product[1].idSection}>         {product[1].note}
                                        </td>
                                        <td>
                                            <button className="deleteBtn deleteBtnTable" onClick={this.props.handleClick} 
                                                data-idproduct={product[1].id} data-idsection={product[1].idSection}>
                                                <img src={deleteIcon} className="deleteIcon" alt=""/>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            } else if (product.length === 1) {
                                return (
                                    <tr key={product[0].id}>
                                        <td>{product[0].name}</td>
                                        <td onClick={this.props.handleChangeAmount} data-idproduct={product[0].id} 
                                            data-idsection={product[0].idSection}>       {product[0].amount}
                                        </td>
                                        <td onClick={this.props.handleChangeNote} data-idproduct={product[0].id} 
                                            data-idsection={product[0].idSection}>         {product[0].note}
                                        </td>
                                        <td>
                                            <button className="deleteBtn deleteBtnTable" onClick={this.props.handleClick} 
                                                data-idproduct={product[0].id} data-idsection={product[0].idSection}>
                                                <img src={deleteIcon} className="deleteIcon" alt=""/>
                                            </button>
                                        </td>
                                        <td></td><td></td><td></td><td></td>
                                    </tr>
                                );
                            }
                        })
                    }
                </tbody>  
            </table>
        );
    }
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
        let idproduct = target.dataset.idproduct;
        let idsection = target.dataset.idsection;
        handleClick('number', target, this.props.changeAmount, "tableInput", idproduct, idsection);
    }
    
    handleChangeNote(event) {
        let target = event.target;
        let idproduct = target.dataset.idproduct;
        let idsection = target.dataset.idsection;
        handleClick('text', target, this.props.changeNote, "tableInput", idproduct, idsection);
    }
    
    handleClick(event) {
        const idProduct = event.currentTarget.dataset.idproduct;
        const idSection = event.currentTarget.dataset.idsection;
        this.props.handleClick(idProduct, idSection, false);
    }
    
    render() {
        let products = [];
        
        if (this.props.products.length > 10) {
            for (let i = 0; i < this.props.products.length - 1; i = i + 2) {
                let product1 = this.props.products[i];
                let product2 = this.props.products[i + 1];
                products.push([product1, product2]);
            }
            if (this.props.products.length % 2 !== 0) {
                products.push([this.props.products[this.props.products.length - 1]]);
            }
        }
        
        if (this.props.products.length > 0) {
            if (this.props.products.length <= 10) {
                return (
                    <OneColumn nameTable={this.props.nameTable} products={this.props.products} handleChangeNote={this.handleChangeNote}               handleChangeAmount={this.handleChangeAmount} handleClick={this.handleClick}/>    
                );
            } else {
                return (
                    <TwoColumns nameTable={this.props.nameTable} products={products} handleChangeNote={this.handleChangeNote} 
                        handleChangeAmount={this.handleChangeAmount} handleClick={this.handleClick}/>
                );
            }
        } else {
            return (
                <table className="table">
                    <tbody>
                        <tr><th>Продукт</th><th>Количество (шт, кг)</th><th>Примечания</th><th></th></tr>
                    </tbody>  
                </table>
            );
        }
        
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleChangeNameTable = this.handleChangeNameTable.bind(this);
    }
    
    handleChangeNameTable(event) {
        let target = event.target;
        handleClick('text', target, this.props.changeNameTable, "tableInputNameTable");
    }
    
    render() {
        let products = [];
        for (let i = 0; i < this.props.data.length; i++) {
            for (let j = 0; j < this.props.data[i].items.length; j++) {
                const items = this.props.data[i].items;
                if (items[j].isSelected === true) {
                    products.push({id: items[j].id, name: items[j].name, amount: items[j].amount, note: items[j].note,
                                   idSection: this.props.data[i]._id});
                }
            }
        }

        return (
            <section className="main" id="printableTable">
                <div className="boxShadow">
                    <p className="tableName" onClick={this.handleChangeNameTable}>{this.props.nameTable}</p>
                    <Table nameTable={this.props.nameTable} products={products} handleClick={this.props.handleClick} changeNote={this.props.changeNote} changeAmount={this.props.changeAmount} changeNameTable={this.props.changeNameTable}/> 
                </div>
            </section>
        );
    }
}

export default Main;
