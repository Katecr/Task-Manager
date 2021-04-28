import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading({isVisible, text}) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(54,56,68,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View style={styles.view}>
                <ActivityIndicator 
                    size="large"
                    color="#049cec"
                />
                {
                    text && <Text style={styles.text}>{text}</Text>
                }
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height:150,
        width:150,
        backgroundColor: "#fff",
        borderRadius:100,
        borderWidth:4,
        borderColor:"#88c404",
    },
    view:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        color:"#848c8c",
        marginTop:10
    }
})