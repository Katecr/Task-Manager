import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import {isEmpty} from 'lodash'


import { addDocumentWithoutId, getCurrentUser} from '../../utils/actions'

export default function AddTaskForm({toastRef, setLoading}) {

    const [error, setError] = useState("")
    const [description, setDescription] = useState(null)
    const navigation = useNavigation()


    const onSubmit = async() => {
        if(!validateForm()){
            return
        }
        
        setLoading(true)
        const data = {
            descriptionTask: description,  
            idUser: getCurrentUser().uid    
        }

        const responseAddDocument = await addDocumentWithoutId("Tasks", data)
        setLoading(false)

        if(!responseAddDocument.statusResponse){
            toastRef.current.show("Error al grabar una tarea, por favor intenta más tarde", 3000)
            return
        }

        navigation.navigate("tasks")
    }

    const validateForm = () =>{
        setError(null)

        if(isEmpty(description)){
            setError("Debes ingresar una descripción de la tarea.")
            return false
        }

        return true
    }

    return (
        <View style={styles.containerView}>
            <Input
                placeholder="Ingresa tarea..."
                containerStyle={styles.textArea}
                defaultValue={description}
                onChange={ (e) => setDescription(e.nativeEvent.text)}
                errorMessage={error}
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
                title="Crear Tarea"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => onSubmit()}
                
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
        marginTop:150
    }
})