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
        
        event.preventDefault();
    }
    
    render() {
        const products = this.props.products;
        
        return (
            <section className="main">
                <table className="table">
                    <caption>Список покупок</caption>
                    <tbody>
                        <tr><th>Продукт</th><th>Количество (шт, кг)</th><th>Примечания</th><th>Удалить</th></tr>
                        {
                            products.map((product) => 
                                <tr key={product}>
                                    <td>{product}</td>
                                    <td>
                                        <input type="number" name={'amount'}/>
                                    </td>
                                    <td>
                                        <input type="text" name={'note'}/>
                                    </td>
                                    <td>
                                        <button>
                                            <img src={deleteIcon} className="deleteIcon"/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>  
                </table>  
            </section>
        );
    }
}


export default Tabel;