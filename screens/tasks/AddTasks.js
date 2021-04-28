import React, {useRef, useState} from 'react'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

import AddTaskForm from '../../components/tasks/AddTaskForm'

export default function AddTask() {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
    return (
        <KeyboardAwareScrollView>
            <AddTaskForm
                toastRef={toastRef} 
                setLoading={setLoading}
            />
            <Loading isVisible={loading} text="Creando Tarea"/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
