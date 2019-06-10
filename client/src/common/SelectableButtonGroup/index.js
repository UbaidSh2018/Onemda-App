import React, { Component } from 'react'
import SelectableButton from '../SelectableButton'
import './styles.scss'

class SelectableButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedID: null, 
    }
  }

  handleSelect = (id) => {
    this.setState({ selectedID: id })
    this.props.handleSelect({
      id: this.props.id, selectedID: id, value: this.props.values[id]
    })
  }

  render() {
    const { values } = this.props
    return (
      <div className='selectable-button-group'>
        {values.map((v, index) => {
          return <SelectableButton
            handleSelect={this.handleSelect}
            key={index}
            index={index}
            value={v}
            selected={index === this.state.selectedID ? true : false} />
        })}
      </div>
    )
  }
}

export default SelectableButtonGroup