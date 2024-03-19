import React from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';

import { FontAwesome6 } from '@expo/vector-icons';

const getItemType = (type, info) => {
    switch (type) {
        case 'library':
        case 'place':
            return <PlaceDetails info={info} />
        case 'collection':
        case 'category':
        case 'tag':
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,1.0)',
    },
    leftContainer: {
        padding: 16,
        flex: '1 1 auto',
        flexGrow: 1,
    },
    rightContainer: {
        paddingRight: 16, 
        flex: '0 1 auto', 
        alignSelf: 'center'
    },
    detailsContainer: {
        flexDirection: 'column',
        gap: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    placeNote: {
        fontSize: 13,
        opacity: 0.5,
    },
})

export const ListItem = ({ info, type, navigation, navigateTo }) => {
    return (
        <TouchableOpacity flex style={styles.container} onPress={() => navigation.navigate(navigateTo, info)}>
            <View style={styles.leftContainer}>
                {getItemType(type, info)}
            </View>
            
            <View style={styles.rightContainer}>
                <FontAwesome6 name='chevron-right' style={{ color: 'rgba(0,0,0,0.33)' }} />
            </View>
        </TouchableOpacity>
    )
}

export const PlaceItem = ({ info, navigation, navigateTo }) => {
    return (
        <ListItem info={info} type={'place'} navigation={navigation} navigateTo={navigateTo} />
    )
}

const PlaceDetails = ({ info }) => {
    return (
        <View style={styles.detailsContainer}>
            <View>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>{info.emoji} {info.title}</Text>
                <PlaceInfo info={info} />
            </View>
            
            {info.note ? <Text style={styles.placeNote}>{info.note}</Text> : null}
        </View>
    )
}

const PlaceInfo = ({ info }) => {
    const { rating, ratingCount, currentlyOpen, closesAt, opensAt, primaryCategory } = info;
    // console.log({info})
    const separator = ' • ';

    let itemInfoString = '';

    if (primaryCategory) {
        itemInfoString += primaryCategory;
    }

    if (closesAt || opensAt) {
        itemInfoString += `${separator}`;

        if (currentlyOpen && closesAt) {
            itemInfoString += `Open until ${closesAt}`;
        } else if (!currentlyOpen && opensAt) {
            itemInfoString += `Closed. Opens at ${opensAt}`;
        }
    }

    if (rating) {
        const ratingCountFormatted = ratingCount.toLocaleString();

        itemInfoString += `${separator}★ ${rating} (${ratingCountFormatted})`
    }

    return (
        <Text>{itemInfoString}</Text>
    )
}