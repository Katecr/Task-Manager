import React from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginForm from '../../components/account/LoginForm'


export default function Login() {


    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
            <LoginForm/>
            </View>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        marginHorizontal:5
    },
    divider:{
        backgroundColor:"#CED7E4",
        margin:40
    },
    register:{
        marginTop:15,
        alignSelf:"center",
    },
    btnRegister:{
        color:"#25C3C9",
        fontWeight:"bold",
    }
})
