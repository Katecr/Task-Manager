import React from 'react'
import { StyleSheet, ScrollView, Text , Image} from 'react-native'


import Login from './Login'

export default function UserGuest() {
  
    return (
        <ScrollView
            centerContent={true}
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/Logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.description}>Ingresa tus datos para ver tus tareas</Text>
            <Login/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        marginHorizontal:30
    },
    image:{
        height:200,
        width:"100%",
        marginVertical:50,
    },
    description:{
        fontSize: 15,
        textAlign:"center",
        color:"#363844",
        marginTop:20,
        marginBottom:10
    }
})
