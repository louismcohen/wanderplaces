import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const RoundMarker = ({ emoji }) => {
    const styles = StyleSheet.create({
        container: { 
            borderRadius: 999, 
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.15)',

            width: 36, 
            height: 36, 
            backgroundColor: 'rgba(255,255,255,0.85)', 
            justifyContent: 'center', 
            alignItems: 'center',

            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.40,
            shadowRadius: 6,

            elevation: 5,
        },
    })

    return (
        <View style={styles.container}>
            <Text>{emoji}</Text>
        </View>
    )
}

export default RoundMarker;