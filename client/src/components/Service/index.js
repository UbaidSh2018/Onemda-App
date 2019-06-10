import React, { Component } from 'react'

class Service extends Component {
  render() {
    return (
      <li className="service__item">
        {this.props.service.name}
      </li>
    )
  }
}

export default Service
