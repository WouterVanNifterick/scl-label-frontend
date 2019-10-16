import React from 'react';
import './RuleEditor.css';

class RuleEditor extends React.Component {
    constructor(props){
        super(props);
        this.state={
            rule : props.rule,
            categories : props.categories
        }        
    }

    render (){                
        console.log("categories",this.state.categories)
        return (
        <div>

        <div>Brand: {this.state.rule.brand}</div>
        <div>Model: {this.state.rule.model}</div>
        <div>Config: {this.state.rule.config}</div>
        <div>Type: {this.state.rule.type}</div>

        {this.state.categories.map(cat=><div>{cat}</div>)}                
            {this.state.categories.map(cat => (
                <div className="form-check form-check" key={"lbl" + cat.scl_categoryid}>
                <input type="radio" name="cmbCategory" id={"lbl_" + cat.scl_categoryid} value={cat.scl_categoryid} />
                <label className="form-check-label" htmlFor={"lbl_" + cat.scl_categoryid}>{cat.scl_category}</label>
                </div>
            ))}
        </div>)
    }
};

export default RuleEditor