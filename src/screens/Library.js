import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';

import Collections from '../../Collections';
import { TouchableOpacity, Text, View } from 'react-native-ui-lib';
import { moderateScale } from 'react-native-size-matters';
import hexToRgba from 'hex-to-rgba';

import { Ionicons } from '@expo/vector-icons';
import PlaceDetail from './PlaceDetail';


const CollectionsHomeStack = createNativeStackNavigator();

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

const LibraryList = () => {
    const navigation = useNavigation();

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

export default Library = ({ navigation, route }) => {
    return (
        <CollectionsHomeStack.Navigator
            screenOptions={{
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: 'regular',
            }}
        >
            <CollectionsHomeStack.Group>
                <CollectionsHomeStack.Screen 
                    name='Library'
                    component={LibraryList}
                />
                <CollectionsHomeStack.Screen 
                    name='Collections'
                    component={Collections}
                />
                {/* <CollectionsHomeStack.Screen 
                    name='Places'
                />
                <CollectionsHomeStack.Screen 
                    name='Categories'
                />
                <CollectionsHomeStack.Screen 
                    name='Tags'
                /> */}
                <CollectionsHomeStack.Screen
                    name='Mae Hong Son Loop'
                    component={CollectionItem}
                />
            </CollectionsHomeStack.Group>
           
           <CollectionsHomeStack.Group
                screenOptions={{
                    presentation: 'modal',
                }}
           >
            <CollectionsHomeStack.Screen
                    name='PlaceDetail'
                    component={PlaceDetail}
                />
           </CollectionsHomeStack.Group>


        </CollectionsHomeStack.Navigator>
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
        gap: 8,
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
    }
})

const getIconContainerStyles = (iconColor) => StyleSheet.create({
    libraryListItemIconContainer: {
        backgroundColor: `${hexToRgba(iconColor, 0.70)}`,
        // backgroundColor: `${'#1F01B9'}${70}`,
        borderRadius: '50%',
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