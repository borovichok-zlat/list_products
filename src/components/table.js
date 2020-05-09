import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';
import deleteIcon from '../styles/img/deletesweep24px.svg';

//---- таблица покупок ----//
class Tabel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {amount: null, note: null};
                
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChangeAmount(event) {
        
        event.preventDefault();
    }
    
    handleChangeNote(event) {
        
        event.preventDefault();
    }
    
    handleClick(event) {
        const id = event.currentTarget.parentNode.parentNode.id;
        const idSection = event.currentTarget.parentNode.parentNode.dataset.idsection;
        this.props.handleClick(id, idSection, false);
    }
    
    render() {
        let products = [];
        for (let i = 0; i < this.props.data.length; i++) {
            for (let j = 0; j < this.props.data[i].items.length; j++) {
                const items = this.props.data[i].items;
                if (items[j].isSelected === true) {
                    products.push({id: items[j].id, name: items[j].name, idSection: this.props.data[i].id});
                }
            }
        }

        return (
            <section className="main">
                <table className="table">
                    <caption>Список покупок</caption>
                    <tbody>
                        <tr><th>Продукт</th><th>Количество (шт, кг)</th><th>Примечания</th><th>Удалить</th></tr>
                        {
                            products.map((product) => {
                                return (
                                    <tr key={product.id} id={product.id} data-idsection={product.idSection}>
                                        <td>{product.name}</td>
                                        <td>
                                            <input type="number" name={'amount'}/>
                                        </td>
                                        <td>
                                            <input type="text" name={'note'}/>
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

export default Tabel;

/*
 <td contenteditable="true"></td>
 <td contenteditable="true"></td>
*/