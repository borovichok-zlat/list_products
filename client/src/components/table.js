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
        if (input.value.trim()) {
            callback(...args, input.value);
        }
    };

    view.replaceWith(input);
    input.focus();
}

class Tds extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td></td><td></td><td></td><td></td>
            </React.Fragment>
        );
    }
}
class Tr extends React.Component {
    render() {
        let num = this.props.num;
        let product = this.props.product;
        return (
            <tr>
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
                {num && <Tds/>}
            </tr>
        );
    }
}

class OneColumn extends React.Component {
    render() {
        return (
            <table className="table">
                <tbody>
                    <tr><th>Продукт</th><th>Количество (шт, кг)</th><th>Примечания</th><th></th></tr>
                    {
                        this.props.products.map((product) => {
                            return (
                                <Tr key={product.id} product={product} handleChangeNote={this.handleChangeNote} 
                                    handleChangeAmount={this.handleChangeAmount} handleClick={this.handleClick} num = {false}/>
                            );
                        })
                    }
                </tbody>  
            </table>
        );
    } 
}

class TwoColumns extends React.Component {    
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
                                    <Tr key={product[0].id} product={product[0]} handleChangeNote={this.handleChangeNote} 
                                        handleChangeAmount={this.handleChangeAmount} handleClick={this.handleClick} num={true}/>
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
                    <OneColumn products={this.props.products} handleChangeNote={this.handleChangeNote} 
                        handleChangeAmount={this.handleChangeAmount} handleClick={this.handleClick}/>    
                );
            } else {
                return (
                    <TwoColumns products={products} handleChangeNote={this.handleChangeNote} 
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
            <section className="main">
                <div id="printTable" className="boxShadow">
                    <p className="tableName">Список покупок</p>
                    <Table products={products} handleClick={this.props.handleClick} changeNote={this.props.changeNote} changeAmount={this.props.changeAmount} changeNameTable={this.props.changeNameTable}/> 
                </div>
            </section>
        );
    }
}

export default Main;
