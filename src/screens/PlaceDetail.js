import React, { useLayoutEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';

const Header = ({ navigation, route, options, back }) => {
    // console.log(route)
    return (
        <View>
            <Text>{route.params.title}</Text>
        </View>
    )
}

export default PlaceDetail = ({ navigation, route }) => {
    const info = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${info.emoji} ${info.title}`,
            headerTitleStyle: {
                fontSize: 24,
            },
            headerLargeTitleStyle: {
                fontSize: 24,
            },
            headerTitleAlign: 'center',
            headerTransparent: false,
            // header: ({ navigation, route, options, back }) => <Header route={route} />
    }, [navigation])
})

    return (
        <View style={{padding: moderateScale(16), flexDirection: 'column', gap: 16}}>
            <Text>Emoji</Text>
            <Text>Note</Text>
            <Text>Category</Text>
            <Text>Tags</Text>
        </View>
    )
}