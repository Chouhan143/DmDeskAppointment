import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import Logo from '../../../Asets/GovtLogo.png'
import React from 'react'


const Home = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.text}>Welcome</Text>
          <View style={styles.btnContainer} >
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('login')}>
                <Text style={{fontSize:16, fontWeight:'bold', display:'flex',justifyContent:'center', textAlign:'center'}}>Log In</Text>
            </TouchableOpacity>
            </View>
            </View>
        
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        // marginTop: 150,
        paddingTop:150,
        backgroundColor: '#80B4B4'

    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 15,
        color:'#000',
        fontWeight: 'bold'

    },
    btnContainer:{
        width:'70%',
        border:2,
        borderRadius:10
    },
    btn:{
        borderRadius:10,
        backgroundColor:'#528B8B',
        padding:15,
        marginVertical:20,

    }
    
   
})