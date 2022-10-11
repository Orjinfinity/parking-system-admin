import React from 'react'
import { View } from '../components'
import { assetHelper } from '../utils'

const NotFound = () => {
  return (
    <View>
        <img src={assetHelper('404.jpg')} alt="404_not_found" />
    </View>
  )
}

export default NotFound