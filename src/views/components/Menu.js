import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';


const Menu = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          
                <TouchableOpacity stytle={styles.buttonStyle} onPress={() => navigation.navigate('pending')}>
        
                    <Text style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical:responsiveWidth(4),
                paddingHorizontal:responsiveWidth(6),
                borderRightWidth:1,
                borderRightColor:'#3e2465',
                // borderLeftWidth:1,
                borderLeftColor:'#3e2465',
                color: '#fff',
                fontSize:responsiveFontSize(1.7),
                textTransform: 'uppercase',
            
              }} >Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity stytle={styles.buttonStyle} onPress={() => navigation.navigate('cancel')}>
                <Text style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',           
                paddingVertical:responsiveWidth(4),
                paddingHorizontal:responsiveWidth(6),
                borderRightWidth:1,
                borderRightColor:'#3e2465',
                color: '#fff',
                fontSize:responsiveFontSize(1.7),
                textTransform: 'uppercase',
            
              }} >Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity stytle={styles.buttonStyle} onPress={() => navigation.navigate('complete')}>
                    <Text style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical:responsiveWidth(4),
                paddingHorizontal:responsiveWidth(6),
                // borderRightWidth:1,
                borderRightColor:'#3e2465',
                color: '#fff',
                fontSize:responsiveFontSize(1.7),
                textTransform: 'uppercase',
            
              }} >Complete</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

export default Menu

const styles = StyleSheet.create({
  
    textStyle: {
        textTransform: 'uppercase',
        fontSize: 15,
        color: '#306060',
    },


})