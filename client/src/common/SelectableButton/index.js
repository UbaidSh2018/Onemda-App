import React, { Component } from 'react'
import './styles.scss'

class SelectableButton extends Component {

  render() {
    const { selected, value, index, handleSelect } = this.props
    return (
      <div className={`selectable_button ${selected ? 'selectable_button--selected' : ''}`} onClick={() => handleSelect(index)}>{value}</div>
    )
  }
}

SelectableButton.defaultProps = {
  selected: false,
  handleSelect: (val) => {}
}

export default SelectableButton