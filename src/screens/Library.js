import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ApiContext } from '../api/ApiContext';

import { TouchableOpacity, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import hexToRgba from 'hex-to-rgba';

import { Ionicons } from '@expo/vector-icons';

const collectionsHomeItems = [
    {
        id: 1,
        title: 'Collections',
        icon: 'bookmarks',
        iconColor: '#BC6C25',
    }, 
    {
        id: 2,
        title: 'Places',
        icon: 'pin',
        iconColor: '#283618',
    }, 
    {
        id: 3,
        title: 'Categories',
        icon: 'layers',
        iconColor: '#bc4749',
    }, 
    {
        id: 4,
        title: 'Tags',
        icon: 'pricetag',
        iconColor: '#184e77',
    }, 
];

const LibraryListItem = ({ item, navigation }) => {
    const iconContainerStyles = getIconContainerStyles(item.iconColor);

    return (
        <TouchableOpacity style={styles.libraryListItemContainer} onPress={() => navigation.navigate(item.title, item)}>
            <View style={styles.libraryListItem}>
                <View style={iconContainerStyles.libraryListItemIconContainer}>
                    <Ionicons name={item.icon} style={styles.libraryListItemIcon} />
                </View>
                <Text style={styles.libraryListItemTitle}>{item.title}</Text>
            </View>
            
        </TouchableOpacity>
    )
}

export default Library = ({ navigation }) => {
    const { collections, places } = useContext(ApiContext);
    // console.log({collections, places});
    
    return (
        <FlatList
            contentContainerStyle={{ gap: 1 }}
            data={collectionsHomeItems}
            contentInsetAdjustmentBehavior='automatic'
            renderItem={({item}) => <LibraryListItem item={item} navigation={navigation} />}
            keyExtractor={item => item.id}
            scrollEnabled={false}
        />
    )
}

const styles = StyleSheet.create({
    libraryListItemContainer: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(16),
        backgroundColor: '#FFFFFF'

    },
    libraryListItem: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#ffffff',
    },
    libraryListItemIcon: {
        fontSize: 16,
        padding: 8,
        color: '#ffffff'
    },  
    libraryListItemTitle: {
        fontSize: 24,
        fontWeight: 500,
        fontFamily: 'Mona-Medium'
    }
})

const getIconContainerStyles = (iconColor) => StyleSheet.create({
    libraryListItemIconContainer: {
        backgroundColor: `${hexToRgba(iconColor, 0.70)}`,
        // backgroundColor: `${'#1F01B9'}${70}`,
        borderRadius: 999,
        borderColor: 'rgba(0,0,0,0.15)',
        borderWidth: 1,

        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.33,
        shadowRadius: 2,
        elevation: 2,
    },  
})