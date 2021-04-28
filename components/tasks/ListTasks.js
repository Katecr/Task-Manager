import React, {useState, useRef, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { size } from 'lodash'
import { Button, Icon } from 'react-native-elements'


export default function ListTasks({tasks, navigation, toastRef, setLoading}) {
   

    return (
        <View>
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                renderItem={(task) => (
                    <Task task={task} navigation={navigation} toastRef={toastRef} setLoading={setLoading}  />
                )}
            />
        </View>
    )
}

function Task({task, navigation, toastRef, setLoading}){

    const { descriptionTask, id } = task.item
    

    const goTask = () => {
        navigation.navigate("edit-tasks", { descriptionTask, toastRef, setLoading, id})
    } 

    const deletedTask = async() => {
        setLoading(true)
        const responseDeleteDocument = await deleteTask(descriptionTask)
        setLoading(false)
        if(!responseDeleteDocument.statusResponse){
            toastRef.current.show("Error al eliminar una tarea, por favor intenta más tarde", 3000)
            return
        }

        navigation.navigate("tasks")

    } 

    const removeTask = () => {
        Alert.alert(
            "Completar tarea",
            "¿Estas seguro que deseas marcar como completado?",
            [
                {
                    text:"Cancelar",
                    style:"cancel"
                },
                {
                    text:"Confirmar",
                    onPress: () => {
                        deletedTask()
                    }
                }
            ],
            {
                cancelable:true
            }
        ) 
    }
    
    return (
        <TouchableOpacity >
            <View style={styles.viewTask}>
                <Text style={styles.description}>
                    {
                        size(descriptionTask) > 0
                            ? descriptionTask
                            : `${descriptionTask.substr(0, 60)}...`
                    }
                </Text>
                <View style={styles.viewBtn}>
                    <Button
                        containerStyle={styles.btnContainerEdit}
                        buttonStyle={styles.viewBtnEdit}
                        onPress={goTask}
                        icon={
                            <Icon
                                type="material-community"
                                name="pencil-outline"
                                size={25}
                                color="white"  
                            />
                        }
                    />
                    <Button       
                        containerStyle={styles.btnContainerComplete}
                        buttonStyle={styles.viewMapBtnComplete}
                        onPress={() => removeTask()}
                        icon={
                            <Icon
                                type="material-community"
                                name="check"
                                size={25}
                                color="white"  
                            />
                        }
                    />
                </View>
            </View>
            
    </TouchableOpacity> 
    )
}
const styles = StyleSheet.create({
    viewTask: {
        flexDirection: "row",
        margin: 10,
        backgroundColor:"#fff",
        borderRadius:20,
        padding:20
    },
    description: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    },
    viewBtn:{
        flexDirection:"row",
        justifyContent: 'center',
        marginTop: 10
    },
    btnContainerComplete: {        
        paddingRight: 5,
        marginHorizontal:5
    },
    btnContainerEdit: {
        paddingLeft: 5
    },
    viewMapBtnComplete: {
        backgroundColor: "#8ac404"
    },
    viewBtnEdit: {
        backgroundColor: "#E7C407"
    },
})
