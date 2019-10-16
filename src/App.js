import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import "./App.css";
import Images from "./components/Images";
import RuleEditor from "./components/RuleEditor";
import RulesList from "./components/RulesList";
import { Rule } from "./Rule";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategoryId: 15,
      category: "Unknown",
      images: [],
      limit: 50,
      rules: [],
      rule: new Rule(),
      selection: [],
      categories: [],
      minConf: 500
    };
    this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
  }

  getSelected() {
    return this.state.selection;
  }

  getImages(cat, orderby, limit) {
    fetch(
      `http://197.132.0.120:3000/categories/images/${cat}?limit=${limit}&orderby=${orderby}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ images: data.data });
      })
      .catch(console.error);
  }

  getRules(cat, orderby, limit) {
    fetch(`http://197.132.0.120:3000/rules/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ rules: data.data });
      })
      .catch(console.error);
  }

  getCategories() {
    fetch("http://197.132.0.120:3000/categories/")
      .then(res => res.json())
      .then(data => {
        // console.log('fetched',data.data);
        this.setState({ categories: data.data });
      })
      .catch(console.error);
  }

  componentDidMount() {
    this.getImages(15, 50);
    this.getRules();
    this.getCategories();
  }

  onChangeMinConf = index => (render, handle, value, un, percent) => {
    this.setState({ minConf: value[0], maxConf: value[1] });
  };

  onSelectCategory = (eventKey, value) => {
    let cats = this.state.categories.filter(
      cat => cat.scl_categoryid * 1 === eventKey * 1
    );
    if (cats.length === 0) return;
    let cat = cats[0].scl_category;
    this.setState({ showCategoryId: eventKey, category: cat });
    this.getImages(eventKey, this.state.orderby, this.state.limit);
  };

  onSelectLimit = (eventKey, value) => {
    this.setState({ limit: eventKey });
    this.getImages(this.state.showCategoryId, this.state.orderby, eventKey);
  };

  onSelectOrder = (eventKey, value) => {
    this.setState({ orderby: eventKey });
    this.getImages(this.state.showCategoryId, eventKey, this.state.limit);
  };

  handleSelectionChanged(id, selected) {
    let sel = this.state.selection;
    sel[id] = selected;
    let r = this.state.rule;
    let img = this.state.images.find(i => i.scl_imageid === id);
    if (selected) r.AddImage(img);
    else r.DelImage(img);

    // console.log(this.state.selection);
    this.setState(state => ({
      selection: sel,
      rule: r
    }));
  }

  handleConfSliderChange() {}

  renderCmbImageCount() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="cmbImageCount">
          Max Images: {this.state.limit}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {[5, 10, 50, 100, 200, 500].map(c => (
            <Dropdown.Item key={c} eventKey={c} onSelect={this.onSelectLimit}>
              {c}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderCmbCategory() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="cmbCategory">
          Category: {this.state.category}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
              key={0}
              eventKey={0}
              onSelect={this.onSelectCategory}
            >
              [All]
            </Dropdown.Item>

          {this.state.categories.map(cat => (
            <Dropdown.Item
              key={cat.scl_categoryid}
              eventKey={cat.scl_categoryid}
              onSelect={this.onSelectCategory}
            >
              {cat.scl_category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderCmbOrderBy() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="cmbOrderBy">
          Order: {this.state.orderby}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {["timestamp", "length", "model"].map(c => (
            <Dropdown.Item key={c} eventKey={c} onSelect={this.onSelectOrder}>
              {c}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    return (
      <Container fluid={true} className="Main">
        <Row>
          <Col className="SidePanel">
            <div className="title">Filter</div>
            {this.renderCmbImageCount()}
            <div>&nbsp;</div>
            {this.renderCmbCategory()}
            <div>&nbsp;</div>
            {this.renderCmbOrderBy()}{" "}            
          </Col>
          <Col>
            <Images
              images={this.state.images}
              onSelectionChange={this.handleSelectionChanged}
            />
          </Col>
          <Col className="SidePanel">
            <div className="title">Label</div>
            <RulesList rules={this.state.rules} />
            <RuleEditor
              rule={this.state.rule}
              categories={this.state.categories}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
