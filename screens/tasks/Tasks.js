import React, { useState, useRef, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import { size } from 'lodash'


import { getCurrentUser, getTask } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import ListTasks from '../../components/tasks/ListTasks'


export default function Tasks() {

    const toastRef = useRef()
    const navigation = useNavigation()

    const [user, setUser] = useState(null)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [reloadTasks, setReloadTasks] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
    },[])

    useFocusEffect(
        useCallback(() => {
            (async() => {
                setLoading(true)
                const response = await getTask()
                if (response.statusResponse) {
                    setTasks(response.tasks)
                    setReloadTasks(false)
                }
                setLoading(false)
            })()
        }, [reloadTasks])
    )

    return (
        <ScrollView>
            {
                user && (
                    <View>
                        <InfoUser 
                            user={user} 
                        />
                    </View>
                )
            }
            <View style={styles.containerButtom}>
                {
                    user &&  (
                        <Icon
                        type="material-community"
                        name="plus"
                        color="#b2dd5c"
                        reverse={true}
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate("add-tasks")}
                        />
                    )                
                }
            </View>
            <View style={styles.containerTasks}>
                {
                    size(tasks) > 0 ? (
                        <ListTasks
                            tasks={tasks}
                            navigation={navigation}
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setReloadTasks={setReloadTasks}
                        />
                    ) : (
                        <View style={styles.notFoundView}>
                            <Text style={styles.notFoundText}>No tienes tareas guardadas.</Text>
                        </View>
                    )
                }
            </View>
            <Toast ref={toastRef} position="top" opacity={0.9}/>
            <Loading isVisible={loading} text="Cargando tareas..."/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold",
        color:"#858f8f"
    },
    btnContainer:{
        position:"absolute",
        bottom: 1,
        right:1,
        shadowColor:"black",
        textShadowOffset:{width:2, height:2},
        shadowOpacity:0.5
    },
    containerButtom:{
        marginVertical:40
    },
    containerTasks:{
        marginVertical:20
    }
})
