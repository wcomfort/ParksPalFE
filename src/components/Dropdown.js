
import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const businesses = [{id: 'Restaurants', text: 'Restaurants', value: 'Restaurants'}, {id: 'Bars', text: 'Bars', value: 'Bars'}, {id: 'Hotels', text: 'Hotels', value: 'Hotels'}, {id: 'Tours', text: 'Tours', value: 'Tours'}, {id: 'Physicians', text: 'Physicians', value: 'Physicians'}]


const BDropdown = (props) => (
    <Dropdown
      onChange={props.businessSearch}
      placeholder='Search For'
      fluid
      selection
      id = 'Restaurants'
      options={businesses}
    />
  )

export default BDropdown