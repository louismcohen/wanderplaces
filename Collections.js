import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, TouchableOpacity } from 'react-native-ui-lib'
import { moderateScale } from 'react-native-size-matters';
import CollectionItem from './CollectionItem';

const CollectionsStack = createNativeStackNavigator();

const data = [
    {
        id: 1,
        title: 'Mae Hong Son Loop',
        emoji: ''
    },
    {
        id: 2,
        title: 'Samoeng Loop',
        emoji: ''
    }
]

const Item = ({info, onPress, navigation}) => {
    console.log({onPress, navigation})
    
    return (
        <TouchableOpacity style={{padding: moderateScale(16)}} onPress={() => navigation.navigate(info.title)}>
            <Text>{info.emoji} {info.title}</Text>
        </TouchableOpacity>
    )
}

const CollectionsList = () => {
    const navigation = useNavigation();
    console.log(navigation.getState())

    return (
        <FlatList 
            contentInsetAdjustmentBehavior='automatic'
            data={data}
            renderItem={({item}) => <Item info={item} navigation={navigation} onPress={item.title} />}
            keyExtractor={item => item.id}
        />
    )
}

export default Collections = ({ navigation, route }) => {

    return (
        <CollectionsStack.Navigator
            screenOptions={{
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: 'regular',
            }}
        >
            <CollectionsStack.Screen
                name='Collections'
                component={CollectionsList}
            />
            <CollectionsStack.Screen
                name='Mae Hong Son Loop'
                component={CollectionItem}
            />
        </CollectionsStack.Navigator>

    )
}