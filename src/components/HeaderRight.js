import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
// import {  } from 'react-native-ui-lib'

const BASE_COLOR = '173,173,173'
const buttonColor = `rgba(${BASE_COLOR},0.30)`;

styles = StyleSheet.create({
    headerButton: {
        borderRadius: 999,
        padding: 8,
        backgroundColor: buttonColor,
    },
    container: {
        borderWidth: 1,
        borderColor: 'red',
        flexDirection: 'row',
        gap: 8,
    }
})

export const HeaderButton = ({ name }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={styles.headerButton}>
            <Ionicons name={name} color={colors.primary} size={16} />
        </TouchableOpacity>
    )
}

export const headerRightStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
    }
});

// doesn't work, renders 0x0 view
// export default HeaderRight = ({ buttons }) => {
//     const MainView = (
//         <View style={styles.container}>
//             { buttons.map((button, index) => {
//                 <HeaderButton key={index} {...button} />
//             })}
//         </View>
//     )
//     console.log(MainView)
//     return MainView
// }