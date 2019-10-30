import React from 'react'
import './Image.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.image = props.image;
    this.state = { selected: this.props.selected };
    this.onSelectionChange = this.props.onSelectionChange;

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick() {
    this.setState(state => ({
        selected: !state.selected
      }));
      this.onSelectionChange(this.image.scl_imageid, !this.state.selected);
  }

renderTooltip = props => {
    let {...obj} = this.image;
    delete obj.topleftx;
    delete obj.toplefty;
    delete obj.toprightx;
    delete obj.toprighty;
    delete obj.bottomleftx;
    delete obj.bottomlefty;
    delete obj.bottomrightx;
    delete obj.bottomrighty;
    delete obj.img;
    delete obj.json;
    delete props.show;
    
    return (
      <Tooltip {...props}>
        {Object.keys(obj).map(attributeName =>
          obj[attributeName] ? (
            <div className="attribute" key={"poplbl_" + attributeName}>
              <span className="attributeName">{attributeName}</span>
              <span className="attributeValue">{obj[attributeName]}</span>
            </div>
          ) : (
            ""
          )
        )}
      </Tooltip>
    );
  };

  render() {
    const classes = this.state.selected ? "thumb selected" : "thumb";
    const descr = this.image.merk + " " + this.image.handelsbenaming;
    return (
      <OverlayTrigger placement="right" overlay={this.renderTooltip}>
        <span className={classes} key={this.image.scl_imageid} onClick={this.handleImageClick}>
          <div className="category">{this.image.scl_category}</div>
          <img            
            className={"thumbImg"}
            alt={this.image.filename}
            src={"http://localhost:3000/" + this.image.img}
          />
          <div className="timestamp">
            <a  rel="noopener noreferrer" target="_blank" href={`http://197.132.0.120:3000/${this.image.img}`}>
              {this.image.timestamp.replace("T", " ").replace(".000Z", "")}
            </a>
          </div>
          <div className="make" title={descr}>
            <span title={descr} className="brand">
              {this.image.merk}
            </span>{" "}
            <span title={descr} className="model">
              {this.image.handelsbenaming}
            </span>
          </div>
          <div className={`plate ${this.image.country}`}>
            <span className="country">{this.image.country}</span>
            <span>{this.image.lp}</span>
            <span className="conf">{Math.round(this.image.conf / 10)}%</span>
          </div>
        </span>
      </OverlayTrigger>
    );
  }
}

export default Image;