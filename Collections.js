import React, { useLayoutEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { View, Text, SortableList, Button } from 'react-native-ui-lib'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';

import { FontAwesome6, MaterialIcons, Ionicons } from '@expo/vector-icons';

// console.log('in Collections');

const CollectionsStack = createNativeStackNavigator();

const data = [
    {
        id: '1',
        title: 'Kai Tod Fried Chicken',
        emoji: '🍗',
        note: 'Amazing Thai fried chicken with fresh sticky rice bamboo and fruit garden',
    },
    {
        id: '2',
        title: 'Kong Gnam View Point',
        emoji: '🌁',
        note: 'Need to stop along the way',
    },
    {
        id: '3',
        title: 'Santichon Village',
        emoji: '🇨🇳',
        note: 'Chinese village. try fried shiitake mushrooms and steamed black chicken',
    },    
]

const Item = ({title, emoji, note}) => {
    console.log({title, emoji, note});

    return (
    <View flex style={{flexDirection: 'row'}}>
        <View style={{
            padding: moderateScale(16),
            flex: '1 1 auto',
            flexGrow: 1,
        }}>
            <Text style={styles.placeTitle}>{emoji} {title}</Text>
            <Text style={styles.placeNote}>{note}</Text>
        </View>
        <View style={{ 
            paddingRight: moderateScale(16), 
            flex: '0 1 auto', 
            alignSelf: 'center'
        }}>
            <FontAwesome6 name='chevron-right' style={{ color: 'rgba(0,0,0,0.33)' }} />
        </View>
    </View>
    )
}

const ListView = () => {
    return (
        <SortableList
            contentInsetAdjustmentBehavior='automatic'
            data={data}
            renderItem={({item}) => <Item title={item.title} emoji={item.emoji} note={item.note} />}
            keyExtractor={item => item.id}
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
            color: `#ffffff`,
            backgroundColor: pressed ? 'rgba(0,0,0,0.33)' : 'rgba(0,0,0,0.20)',
        }
    })

    return (
        <Pressable style={({ pressed }) => styles(pressed).headerButton}>
            <Ionicons name={icon} color={'#ffffff'} size={16} />
        </Pressable>
    )
}

const HeaderRight = () => {
    return (
        <View style={{ flexDirection: 'row', gap: 8 }}>
            <HeaderButton icon='pencil' />
            <HeaderButton icon='filter' />
            <HeaderButton icon='swap-vertical' />
        </View>
    )
}



export default Collections = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerSearchOptions: {
                onChangeText: (event) => console.log(event),
                placeholder: 'Search',
                hideWhenScrolling: false,
                autoCapitalize: 'none'
                // shouldShowHintSearchIcon: true,
            },
        })
    }, [navigation])

    return (
        <CollectionsStack.Navigator
            screenOptions={{
                headerRight: () => (
                    <HeaderRight />
                )
            }}
        >
            <CollectionsStack.Screen
                name='Mae Hong Son Loop'
                component={ListView}
                options={{
                    headerLargeTitle: true
                }}
            />
        </CollectionsStack.Navigator>
    )
}

const styles = StyleSheet.create({
    placeTitle: {
        fontSize: 24,
        fontWeight: 700,
    },
    placeNote: {
        fontSize: 13,
        fontWeight: 400,
        color: 'rgba(0,0,0,0.50)',
    }
})