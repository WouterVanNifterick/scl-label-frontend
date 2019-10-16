import React, { Component } from 'react';


class RulesList extends Component {
    constructor(props) {
      super(props);
      this.rules = props.rules;
    }
    

    render() {
        if(this.rules.length===0)
          return null;

        return (
          <table className="rules">
            <thead>
              <tr>
                <th>Category</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Configuration</th>
                <th>VehicleType</th>
              </tr>
              </thead>
              <tbody>
              {this.rules.map(r => (
                <tr key={r.scl_ruleid}>
                  <td><b>{r.scl_category}</b></td>
                  <td>{r.merk}</td>
                  <td>{r.model}</td>
                  <td>{r.inrichting}</td>
                  <td>{r.voertuigsoort}</td>
                </tr>
              ))}
              </tbody>
            </table>

        );
    }
}

export default RulesList;