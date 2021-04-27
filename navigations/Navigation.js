import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Account from '../screens/account/Account'
import Tasks from '../screens/tasks/Tasks'
import AddTasks from '../screens/tasks/AddTasks'
import EditTasks from '../screens/tasks/EditTasks'



const Stack = createStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="account"
                    component={Account}
                    options={{title: "Iniciar Sesión"}}
                />
                <Stack.Screen
                    name="tasks"
                    component={Tasks}
                    options={{title: "Tareas"}}
                />
                <Stack.Screen
                    name="add-tasks"
                    component={AddTasks}
                    options={{title: "Agregar Tarea"}}
                />
                <Stack.Screen
                    name="edit-tasks"
                    component={EditTasks}
                    options={{title: "Editar Tarea"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

