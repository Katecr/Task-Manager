import React, {useState} from 'react'
import { StyleSheet, View, LogBox } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import { isEmpty } from 'lodash'


import { validateEmail} from '../../utils/helpers'
import { loginWithEmailAndPassword } from '../../utils/actions'
import Loading from '../Loading'

export default function LoginForm() {

    LogBox.ignoreLogs(['Setting a timer']);
    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

      
    

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const doLogin = async() => {
        if (!validateData()) {
            return
        }

        setLoading(true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)

        if (!result.statusResponse) {
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }
        
        navigation.navigate("tasks")
    }


    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if(!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }

        if (isEmpty(formData.password)) {
            setErrorPassword("Debes de ingresar tu contraseña.")
            isValid = false
        }

        return isValid
    }
    

    return (
        <View style={styles.container}>
            <Input
                placeholder="Ingresa email..."
                containerStyle={styles.input}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
                keyboardType="email-address"
                leftIcon={{
                    type:"material-community",
                    name:"email",
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
            <Input
                placeholder="Ingresa contraseña..."
                containerStyle={styles.input}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                leftIcon={{
                    type:"material-community",
                    name:"lock-reset",
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
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off" : "eye" }
                        color="#8ac404"
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
             <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading isVisible={loading} text="Iniciando sesión"/>
        </View>
    )
}

const defaultFormValues = () => {
    return { email: "", password: "" }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input:{
        width:"100%",
        marginVertical:10,
        height:60,
        opacity:0.9,
        borderRadius:10,  
        paddingVertical:5,
    },
    btnContainer: {
        width:"95%"
    },
    btn:{
        marginTop: 20,
        borderRadius:20,
        backgroundColor:"#8ac404",
        paddingVertical:10,
        marginHorizontal:80,
        marginBottom:20,
        width:"50%"
    }
})