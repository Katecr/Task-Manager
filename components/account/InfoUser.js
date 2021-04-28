import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function InfoUser({ user }) {
    return (
        <View style={styles.infoUser}>
            <Text style={styles.title}>Bienvenido <Text style={styles.textEmail}>{user.email}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoUser: {
        marginVertical:50,
        marginHorizontal:20,
    },
    title:{
        fontWeight:"bold",
        fontSize:60,
        color:"#8ac404",
        
        textAlign:"center"
    },
    textEmail:{
        fontSize:20,
        color:"#858f8f",
        fontWeight:"400"
    }
})
