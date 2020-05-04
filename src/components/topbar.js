import React from "react";
import ReactDOM from "react-dom";
import '../styles/index.css';
import editorIcon from '../styles/img/editor.png';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
       this.props.handleClick(false); 
    }
    
    render() {
        return (
            <section className="topbar">
              <p>Меню списка покупок</p>
             <button onClick={this.handleClick}>
                <img src={editorIcon} className="deleteIcon"/>
             </button>
            </section>
        );
    }
}

export default Topbar;