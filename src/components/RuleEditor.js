import React from 'react';
import './RuleEditor.css';
import Button from 'react-bootstrap/Button';

class RuleEditor extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {categoryid:0}
    }

    render (){                
        // console.log("categories",this.state.categories)
        return (
        <div className="RuleEditor">

        <div><label className="fieldLabel">Brand: </label>{this.props.rule.brand}</div>
        <div><label className="fieldLabel">Model: </label>{this.props.rule.model}</div>
        <div><label className="fieldLabel">Config: </label>{this.props.rule.config}</div>
        <div><label className="fieldLabel">Type: </label>{this.props.rule.type}</div>
        <div><label className="fieldLabel">Category: </label>
        {this.props.categories.map(cat => (
            <div className="form-check" key={"lbl" + cat.scl_categoryid}>
                <input type="radio" name="cmbCategory" id={"lbl_" + cat.scl_categoryid} value={cat.scl_categoryid} />
                <label onClick={(e)=>console.log(e.value)} className="form-check-label" htmlFor={"lbl_" + cat.scl_categoryid}>{cat.scl_category}</label>
            </div>
        ))}
        </div>
        <hr />
        <Button onClick={e=>this.props.onSaveRule({
                scl_categoryid:this.state.categoryid, 
                merk:this.props.rule.brand, 
                model:this.props.rule.model, 
                inrichting:this.props.rule.config, 
                voertuigsoort:this.props.rule.type
            })}>
            Save as Rule
        </Button>
        </div>)
    }
};

export default RuleEditor