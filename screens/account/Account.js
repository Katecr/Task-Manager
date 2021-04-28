import React, {useState, useCallback} from 'react'
import { StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'


import UserGuest from './UserGuest'
import Loading from '../../components/Loading'
import {getCurrentUser } from '../../utils/actions'


export default function Account() {
    const [login, setLogin] = useState(null)
    
    

    useFocusEffect(
        useCallback(() => {
            const user= getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )
    
    if(login == null){
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return <UserGuest/>
}

const styles = StyleSheet.create({})
