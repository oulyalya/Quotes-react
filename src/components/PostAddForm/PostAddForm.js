import React, { Component } from 'react';
import './PostAddForm.css';

export default class PostAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texxt: ''
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(evt) {
    this.setState({
      text: evt.target.value
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.props.onAdd(this.state.text);
    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <form
        className="bottom-panel d-flex"
        onSubmit={this.onSubmit}>
        <input
          className="form-control new-post-label"
          type="text"
          placeholder="О чём вы думаете сейчас?"
          onChange={this.onValueChange}
          value={this.state.text} />
        <button
          className="btn btn-outline-secondary"
          type="submit">
          Добавить
      </button>
      </form>
    )
  }
}

// export default PostAddForm;
// ({ onAdd }) =>
