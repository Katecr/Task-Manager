import React, { useState} from 'react'
import { StyleSheet, View} from 'react-native'
import { Button, Input } from 'react-native-elements'


import { updateDocument, getCurrentUser } from '../../utils/actions'

export default function EditTask({ route, navigation}) {

    const { descriptionTask, toastRef, setLoading, id } = route.params

    const [description, setDescription] = useState(null)
    
  
    const onUpdate = async() => {
        setLoading(true)
        const data = {
            descriptionTask: description,
            idUser: getCurrentUser().uid   
        }
        const responseAddDocument = await updateDocument("Tasks",id, data)
        setLoading(false)

        if(!responseAddDocument.statusResponse){
            toastRef.current.show("Error al actualizar una tarea, por favor intenta más tarde", 3000)
            return
        }

        navigation.navigate("tasks")
    }


    return (
        <View style={styles.containerView}>
            <Input
                placeholder="Modificar tarea..."
                containerStyle={styles.textArea}
                defaultValue={descriptionTask}
                onChange={ (e) => setDescription(e.nativeEvent.text)}
                multiline
                leftIcon={{
                    type:"material-community",
                    name:"feather",
                    color:"#8ac404",
                    size:30,
                    containerStyle:{
                        backgroundColor:"#fff",
                        shadowColor: "#989898",
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.50,
                        shadowRadius: 2,
                        elevation: 2,
                        padding: 5,
                        borderRadius:10,
                        marginHorizontal:5,
                    }
                }}
            />
            <Button
                title="Modificar tarea"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => onUpdate()}  
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    btnContainer: {
        width:"95%"
    },
    btn:{
        borderRadius:20,
        backgroundColor:"#8ac404",
        paddingVertical:10,
        marginHorizontal:100,
        marginBottom:20,
        width:"50%"
    },
    textArea: {
        height: 200,
        width: "95%",
        padding: 0,
        marginTop:80
    }
})
