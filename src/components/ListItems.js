import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';

import { FontAwesome6 } from '@expo/vector-icons';
import { getPlacePhotoUri } from '../api/Google.api';

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
        flexGrow: 1,
        paddingRight: 16,
    },
    rightContainer: {
        paddingRight: 16, 
        flex: '0 1 auto', 
        alignSelf: 'center'
    },
    imageContainer: {
        flexShrink: 1,
        width: 80,
        backgroundColor: 'rgba(0,0,0,0.1)',
        // height: '100%',
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 8,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
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

export const ListItemContainer = ({ content, navigation, navigateTo }) => {
    return (
        <TouchableOpacity flex style={styles.container} onPress={() => navigation.navigate(navigateTo, info)}>
            <View style={styles.leftContainer}>
                {content}
            </View>
            
            <View style={styles.rightContainer}>
                <FontAwesome6 name='chevron-right' style={{ color: 'rgba(0,0,0,0.33)' }} />
            </View>
        </TouchableOpacity>      
    )
}

export const PlaceItem = ({ info, navigation, navigateTo }) => {
    // console.log({info});
    return (
        <ListItem info={info} type={'place'} navigation={navigation} navigateTo={navigateTo} />
    )
}

const PlaceDetails = ({ info }) => {
    const [photoUri, setPhotoUri] = useState();

    useEffect(() => {
        const getPhoto = async () => {
            if (!info.photos) return null;
            const photo = await getPlacePhotoUri({ name: info.photos[0].name, maxHeight: 240 });
            setPhotoUri(photo);
        }

        getPhoto();
    }, []); 
    
    
    return (
        <View style={{ flexDirection: 'row', gap: 8 }}>
            {photoUri 
                ? <Image width={80} resizeMode='cover' source={{ uri: photoUri }} />
                : <View style={styles.imageContainer} />
            }
            <View style={styles.detailsContainer}>
                
                <View>
                    <Text adjustsFontSizeToFit numberOfLines={2} style={styles.title}>{info.emoji ? `${info.emoji} ` : null}{info.title}</Text>
                    <PlaceInfo info={info} />
                </View>
                
                {info.note ? <Text style={styles.placeNote}>{info.note}</Text> : null}
            </View>
        </View>
    )
}

const PlaceInfo = ({ info }) => {
    const { rating, user_rating_count, currentlyOpen = true, closesAt = '8:00 PM', opensAt = '7:00 AM', primary_type } = info;
    // console.log({info})
    const separator = ' • ';

    let itemInfoString = [];

    if (primary_type) {
        itemInfoString.push(primary_type);
    }

    if (closesAt || opensAt) {
        itemInfoString.push(`${separator}`);

        if (currentlyOpen && closesAt) {
            itemInfoString.push(`Open until ${closesAt}`);
        } else if (!currentlyOpen && opensAt) {
            itemInfoString.push(`Closed. Opens at ${opensAt}`);
        }
    }

    if (rating) {
        const ratingCountFormatted = user_rating_count.toLocaleString();
        (itemInfoString.length - 1) % 2 == 0 && itemInfoString.length > 1 ? itemInfoString.push('\n') : itemInfoString.push(`${separator}`);

        itemInfoString.push(`★ ${rating} (${ratingCountFormatted})`);
    }

    // console.log(itemInfoString.length)
    
    return (
        <View style={{ flexDirection: 'column' }}>
            <Text>{itemInfoString}</Text>

        </View>
    )
}