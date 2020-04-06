import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';
import deleteIcon from '../styles/img/deletesweep24px.svg';

//---- создание строки таблицы ----//
function Columns(props) {
    return (
        <React.Fragment>
            <tr><td>{props.name}</td><td></td><td></td><td></td></tr>
        </React.Fragment>
    )
}

//---- таблица покупок ----//
class Tabel extends React.Component {
    render() {
        const products = this.props.products;
        
        return (
            <section className="main">
                <table className="table">
                    <caption>Список покупок</caption>
                    <tbody>
                        <tr><th>Продукт</th><th>Количество</th><th>Примечания</th><th>Удалить</th></tr>
                        {
                            products.map((product) => 
                                <Columns key={product} name={product}/>
                            )
                        }
                    </tbody>  
                </table>  
            </section>
        );
    }
}

export default Tabel;