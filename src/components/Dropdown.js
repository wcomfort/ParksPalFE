
import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const businesses = [{id: 'Restaurants', text: 'Restaurants', value: 'Restaurants'}, {id: 'Bars', text: 'Bars', value: 'Bars'}, {id: 'Hotels', text: 'Hotels', value: 'Hotels'}]


const BDropdown = (props) => (
    <Dropdown
      onChange={props.businessSearch}
      placeholder='Search For'
      fluid
      selection
      id = {businesses}
      options={businesses}
    />
  )

export default BDropdown