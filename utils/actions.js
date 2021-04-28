import { firebaseApp } from './firebase'
import * as firebase from 'firebase'

const db = firebase.firestore(firebaseApp)

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}

export const getTask = async() => {
    const result = { statusResponse: true, error: null, tasks: [] }
    try {
        const response = await db
            .collection("Tasks")
            .where("idUser", "==", getCurrentUser().uid)
            .get()
            response.forEach((doc) => {
                const task = doc.data()
                task.id = doc.id
                result.tasks.push(task)
            })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}
