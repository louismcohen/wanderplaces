import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons/'

const componentShadow = {
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,

    elevation: 3,
}

const FilterButton = ({ text, count }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            borderRadius: 16,
            height: 32,
            backgroundColor: 'rgba(255,255,255,1.0)',

            flexDirection: 'row',
            gap: 6,
            justifyContent: 'center',
            alignItems: 'center',

            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.15)',

            ...componentShadow,
            
        },
        count: {
            borderRadius: 999,
            // height: 20,
            // width: 20, 
            minWidth: 20,
            paddingHorizontal: 4,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'rgba(0,0,0,0.70)',
        },
        countText: {
            fontSize: 12,
            lineHeight: 20,
            color: 'rgba(255,255,255,1.0)',
            textAlign: 'center',
            fontFamily: 'Mona-Bold'
        },
        text: {
            color: 'rgba(0,0,0,0.70)',
            fontSize: 13,
            lineHeight: 16,
            fontFamily: 'Mona-Medium'
        },
    });

    return (
        <TouchableOpacity style={styles.container}>
            {count ? <View style={styles.count}>
                <Text style={styles.countText}>{count}</Text>
            </View> : null}
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
};

const MapSearch = () => {
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'stretch',
            width: '100%',
            marginBottom: 8,
            paddingHorizontal: 8,

            
        },
        innerContainer: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: 12,
            borderColor: 'rgba(0,0,0,0.15)',
            borderWidth: 1,

            paddingVertical: 12,
            paddingHorizontal: 12,

            flexDirection: 'column',
            gap: 8,


        },
        shadowContainer: {
            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.33,
            shadowRadius: 4,
        },
        textInputContainer: {
            backgroundColor: 'rgba(255,255,255,1.0)',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.15)',

            paddingVertical: 12,
            paddingHorizontal: 12,

            flexDirection: 'row',
            gap: 8,
            justifyContent: 'flex-start',
            alignItems: 'center',

            ...componentShadow,
        },
        textInputIcon: {
            height: 20,
            width: 20,
        },
        textInput: {
            flex: 1,
            fontSize: 17,
            lineHeight: 17,
            fontFamily: 'Mona-Regular',
        },
        filterButtonContainer: {
            flexDirection: 'column',
            // flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'space-between',
        },
    });

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.shadowContainer}>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.05)']}
                        locations={[0.75, 1.0]}
                        style={styles.innerContainer}
                    >
                        <View style={styles.textInputContainer}>
                            <View style={styles.textInputIcon}>
                                <Ionicons name='search' size={20} color='rgba(0,0,0,0.20)' />
                            </View>
                            <TextInput 
                                style={styles.textInput}
                                placeholder='Search for a place' 
                            />
                        </View>

                        <View style={styles.filterButtonContainer}>
                            <FilterButton text='Collections' count='12' />
                            <View style={{ flexDirection: 'row', gap: 4, }}>
                                <FilterButton text='Categories' count='2' />
                                <FilterButton text='Tags' />
                            </View>

                        </View>
                    </LinearGradient>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

export default MapSearch;