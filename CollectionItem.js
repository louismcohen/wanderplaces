import React, { useEffect, useLayoutEffect, useState} from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { View, Text, SortableList, Button, TouchableOpacity } from 'react-native-ui-lib'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';

import { FontAwesome6, MaterialIcons, Ionicons } from '@expo/vector-icons';

// console.log('in Collections');

const CollectionsStack = createNativeStackNavigator();

const places = [
    {
        id: '1',
        title: 'Kai Tod Fried Chicken',
        emoji: '🍗',
        note: 'Amazing Thai fried chicken with fresh sticky rice bamboo and fruit garden',
        rating: 4.5,
        ratingCount: 891,
        primaryCategory: 'Thai restaurant',
        currentlyOpen: true,
        closesAt: '8:00 PM',
    },
    {
        id: '2',
        title: 'Kong Gnam View Point',
        emoji: '🌁',
        note: 'Need to stop along the way',
        rating: 4.3,
        ratingCount: 111,
        primaryCategory: 'Scenic spot',
        currentlyOpen: true,
    },
    {
        id: '3',
        title: 'Santichon Village',
        emoji: '🇨🇳',
        note: 'Chinese village. try fried shiitake mushrooms and steamed black chicken',
        rating: 4.1,
        ratingCount: 3764,
        currentlyOpen: true,
        primaryCategory: 'Tourist attraction',
        closesAt: '6:00 PM',
    },    
    {
        id: '4',
        title: 'Sunset Bar',
        emoji: '🍹',
        note: 'Go here for Pai sunset to meet people',
        rating: 4.4,
        ratingCount: 65,
        currentlyOpen: true,
        primaryCategory: 'Bar',
        closesAt: '24 hours',
    },    
    {
        id: '5',
        title: 'Noodle Soup House Ban Jabo',
        emoji: '🍜',
        note: 'bomb spicy tom yum with your feet dangling off the side of the wooden building floor',
        rating: 4.4,
        ratingCount: 1904,
        currentlyOpen: true,
        primaryCategory: 'Noodle shop',
        closesAt: '4:00 PM',
    },    
    {
        id: '6',
        title: 'Doi Kiew Lom Viewpoint',
        emoji: '⛰️',
        note: '',
        rating: 4.5,
        ratingCount: 2491,
        currentlyOpen: true,
        primaryCategory: 'Scenic spot',
        closesAt: '',
    },    
]

const ItemInfo = ({ info }) => {
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
        <Text style={styles.placeInfo}>{itemInfoString}</Text>
    )
}

const Item = ({info}) => {
    return (
    <TouchableOpacity flex style={{flexDirection: 'row', backgroundColor: '#ffffff'}}>
        <View style={{
            padding: moderateScale(16),
            flex: '1 1 auto',
            flexGrow: 1,
        }}>
            <View style={styles.placeTextContainer}>
                <View>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.placeTitle}>{info.emoji} {info.title}</Text>
                    <ItemInfo info={info} />
                </View>
                
                {info.note ? <Text style={styles.placeNote}>{info.note}</Text> : null}
            </View>
        </View>
        <View style={{ 
            paddingRight: moderateScale(16), 
            flex: '0 1 auto', 
            alignSelf: 'center'
        }}>
            <FontAwesome6 name='chevron-right' style={{ color: 'rgba(0,0,0,0.33)' }} />
        </View>
    </TouchableOpacity>
    )
}

const filteredResults = (query) => {
    const queryLowerCase = query.toLowerCase();
    const filtered = places.filter(place => 
            place.title.toLowerCase().includes(queryLowerCase)
            || place.primaryCategory.toLowerCase().includes(queryLowerCase)
            || place?.note.toLowerCase().includes(queryLowerCase)
        )   

    return filtered;
}

const ListView = ({data}) => {
    return (
        <FlatList
            contentContainerStyle={{ gap: 1 }}
            contentInsetAdjustmentBehavior='automatic'
            data={data}
            renderItem={({item}) => <Item info={item} />}
            keyExtractor={item => item.id}
            style={{
                // backgroundColor: '#F2F2F7',
            }}
        />
    )
}

const Header = (title) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

const customHeader = ({ navigation, route, options, back }) => {
    const title = getHeaderTitle(options, route.name);

    return (
        <Header
            title={title}
        />
    )
}

const HeaderButton = ({ icon }) => {
    const styles = (pressed) => StyleSheet.create({
        headerButton: {
            borderRadius: 500,
            padding: 8,
            color: `#EBEBF530`,
            opacity: pressed ? 0.5 : 1.0,
            backgroundColor: '#76768024',
        }
    })

    return (
        <Pressable style={({ pressed }) => styles(pressed).headerButton}>
            <Ionicons name={icon} color={'#007AFF'} size={16} />
        </Pressable>
    )
}

const HeaderRight = () => {
    return (
        <View style={{ flexDirection: 'row', gap: 8 }}>
            <HeaderButton icon='pencil' />
            <HeaderButton icon='filter' />
            {/* <HeaderButton icon='swap-vertical' /> */}
        </View>
    )
}



export default CollectionItem = ({ navigation, route }) => {
    // const insets = useSafeAreaInsets();
    // const navigation = useNavigation();
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(places);
    }, [places])

    const [search, setSearch] = useState('');
    useEffect(() => {
        const filtered = filteredResults(search);
        setData(filtered);

    }, [search])

    const { emoji, title } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${emoji} ${title}`,
            headerBackTitleVisible: false,
            headerShadowVisible: true,
            headerLargeTitle: true,
            headerTransparent: true,
            headerBlurEffect: 'regular',
            headerLargeStyle: {
                backgroundColor: `${'#E88484'}${33}`
            },
            headerStyle: {
                backgroundColor: `${'#E88484'}${10}`
            },
            headerRight: () => (
                <HeaderRight />
            ),
            headerSearchBarOptions: {
                placeholder: 'Name, Category, Note, and More',
                onChangeText: (event) => setSearch(event.nativeEvent.text),
                onCancelButtonPress: (event) => setSearch(''),
            },
        })
    }, [navigation])

    return (
        <ListView data={data} />
        // <CollectionsStack.Navigator
        //     screenOptions={{
        //         headerRight: () => (
        //             <HeaderRight />
        //         ),
        //         headerLargeTitle: true,
        //         headerTransparent: true,
        //         headerBlurEffect: 'regular',
        //     }}
        // >
        //     <CollectionsStack.Screen
        //         name='Mae Hong Son Loop'
        //         component={ListView}
        //         options={{
        //             // headerLargeTitle: true,
        //             // headerTransparent: true,
        //             // headerBlurEffect: 'light',
        //         }}
        //     />
        // </CollectionsStack.Navigator>
    )
}

const styles = StyleSheet.create({
    placeTitle: {
        fontSize: 20,
        fontWeight: 700,
    },
    placeNote: {
        fontSize: 13,
        fontWeight: 400,
        color: 'rgba(0,0,0,0.50)',
    },
    placeInfo: {
        fontWeight: 400,
    },
    placeTextContainer: {
        flexDirection: 'column',
        gap: 8,
    },
})