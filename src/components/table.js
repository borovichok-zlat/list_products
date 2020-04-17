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
        const idTopSection = event.currentTarget.parentNode.parentNode.dataset.idtopsection;
        this.props.handleClick(id, idTopSection);
        
        event.preventDefault();
    }
    
    render() {
        let products = [];
        for (let i = 0; i < this.props.data.length; i++) {
            for (let j = 0; j < this.props.data[i].subsection.length; j++) {
                const subsection = this.props.data[i].subsection;
                if (subsection[j].isSelected === true) {
                    products.push({id: subsection[j].id, name: subsection[j].name, idTopSection: this.props.data[i].id});
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
                                    <tr key={product.id} id={product.id} data-idtopsection={product.idTopSection}>
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