import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, TouchableOpacity } from 'react-native-ui-lib'
import { moderateScale } from 'react-native-size-matters';
import CollectionItem from '../components/CollectionItem';

import JsonSearch from 'search-array';
import { QuickJsonSearch } from '../utils/utils';
import getColorForEmoji from '../utils/emojiColor';
import hexToRgba from 'hex-to-rgba';
import { LinearGradient } from 'expo-linear-gradient';

const data = [
    {
        id: 1,
        title: 'Mae Hong Son Loop',
        emoji: '🛵',
        placesCount: 67,
    },
    {
        id: 2,
        title: 'Samoeng Loop',
        emoji: '🏍️',
        placesCount: 13,
    },
    {
        id: 3,
        title: 'Koh Phangan',
        emoji: '🏝️',
        placesCount: 36,
    },
    {
        id: 4,
        title: 'Vang Vieng',
        emoji: '🇱🇦',
        placesCount: 18,
    },
]

const Icon = ({item}) => {
    const backgroundColor = getColorForEmoji(item.emoji);
    const styles = iconStyles(backgroundColor);

    const colors = [
        hexToRgba(backgroundColor, 0.45),
        hexToRgba(backgroundColor, 0.65)
    ]

    return (
        <Text style={styles.icon}>{item.emoji}</Text>
        // <View style={styles.iconContainer}>
        //     <LinearGradient colors={colors} style={styles.iconBackground}>
                
        //     </LinearGradient>
        // </View>
    )
}

const Item = ({item, onPress, navigation}) => {
    // console.log({onPress, navigation})
    
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate(item.title, item)}>
            <Icon item={item} />
            <View style={styles.itemTitleContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.placesCount} Places</Text>
            </View>
            
        </TouchableOpacity>
    )
}

const CollectionsList = ({ data, navigation }) => {
    return (
        <FlatList 
            contentContainerStyle={{ gap: 1 }}
            contentInsetAdjustmentBehavior='automatic'
            data={data}
            renderItem={({item}) => <Item item={item} navigation={navigation} onPress={item.title} />}
            keyExtractor={item => item.id}
        />
    )
}

export default Collections = ({ navigation, route }) => {
    const [search, setSearch] = useState('');
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);

    useEffect(() => {
        const dataWithEmojiColors = data.map(collection => ({
            ...collection,
            emojiColor: getColorForEmoji(collection.emoji),
        }))

        setCollections(dataWithEmojiColors);
    }, [data]);

    useEffect(() => {
        if (search === '') {
            setFilteredCollections(collections);
        } else {
            const filtered = QuickJsonSearch(search, collections);
            setFilteredCollections(filtered);
        }

    }, [search, collections])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Name, Places, Categories, and More',
                onChangeText: (event) => setSearch(event.nativeEvent.text),
                onCancelButtonPress: (event) => setSearch(''),
                autoCapitalize: 'none',
            },
        })
    }, [navigation])
    

    return (
        <CollectionsList data={filteredCollections} navigation={navigation} />

    )
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(12),
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1.0)'
    },
    itemTitleContainer: {
        flexDirection: 'column',
        gap: 2,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 700,
    },
    itemSubtitle: {
        fontSize: 13,
        fontWeight: 400,
        color: 'rgba(0,0,0,0.50)'
    }
})

const iconStyles = (color) => StyleSheet.create({
    icon: {
        fontSize: 24,
        display: 'flex',
        lineHeight: 40,
        width: 40,
        height: 40,
        textAlign: 'center',

        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.33,
        // shadowRadius: 3,
        // elevation: 2,
    },
    iconBackground: {
        // backgroundColor: `${hexToRgba(color, 0.25)}`,
        borderRadius: '50%',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'middle',
    },
    iconContainer: {
        // backgroundColor: hexToRgba(color, 0.15),
        backgroundColor: '#FFFFFF',
        borderRadius: '50%',

        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.33,
        shadowColor: `${hexToRgba(color, 0.5)}`,
        shadowRadius: 2,
        elevation: 2,
    

        // borderWidth: 1,
    }
})