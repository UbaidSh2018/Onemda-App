import React, { Component } from 'react'
import './styles.scss'

class ListItem extends Component {
  render() {
    const { value, className } = this.props
    return (
      <div className={className}>
        {value}
      </div> 
    )
  }
}

export default ListItem