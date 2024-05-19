import React from 'react'
import {View, Text} from 'react-native'
import headerStyle from '../styles/header'



const Header = (props: {name : string})=>{

return <View style={headerStyle.titleContainer}>
         <Text style={headerStyle.textStyle}>{props.name}</Text>
    </View>
}

export default Header