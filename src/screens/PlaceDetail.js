import React, { useLayoutEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native'
import { moderateScale } from 'react-native-size-matters';
import { StyleSheet, View, Text, TouchableOpacity, SectionList, FlatList, TouchableHighlight, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { ListItemContainer } from '../components/ListItems';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ navigation, route, options, back }) => {
    // console.log(route)
    return (
        <View>
            <Text>{route.params.title}</Text>
        </View>
    )
}

const ListItem = ({ title, value }) => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            padding: 16,
        },
        item: {
            padding: 16,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    })



    return (
        null 
        // <ListItemContainer content={<Content title={title} value={value} navigation =  />} />
    )

}

const Content = ({ title, value }) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            fontSize: 17,
            // fontWeight: '500',
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text>{value}</Text>
        </View>
    )
}

const HeaderTitle = ({ emoji, title }) => {
    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            paddingTop: 16,
            flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'stretch',
            gap: 8,
            borderColor: 'red',
            borderWidth: 1,
            overflow: 'hidden',
        },
        emojiContainer: {
            width: 36,
            height: 36,
            borderRadius: 8,
            borderColor: 'rgba(0,0,0,0.20)',
            borderWidth: 1,
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            textAlign: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: '700',
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.emojiContainer}>
                <Text>{emoji}</Text>
            </View>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
        </View>
    )
}

export default PlaceDetail = ({ navigation, route }) => {
    const place = route.params;
    const [noteInput, setNoteInput] = useState(place.note);
    const sections = [
        {
            title: 'Emoji',
            data: [place.emoji],
        },
        {
            title: 'Note',
            data: [place.note],
        },
    ];

    const data = [
        {
            title: 'Emoji',
            value: place.emoji,
        },
        {
            title: 'Note',
            value: place.note,
        },
        {
            title: 'Categories',
            value: place.categories
        },
        {
            title: 'Tags',
            value: place.tags
        }
    ];
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            justifyContent: 'flex-start',
            // gap: 16,
        },
        infoContainer: {
            flex: 1,
            flexDirection: 'column',
            gap: 16,
        },
        list: {
            flex: 0,
            borderRadius: 10,
            borderColor: 'red',
            borderWidth: 1,
            // backgroundColor: 'white',
            // padding: 16,
        },
        listItem: {
            padding: 16,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        sectionContainer: {
            flexGrow: 0,
            flexShrink: 1,
            flexDirection: 'column',
            gap: 7,
            justifyContent: 'center',
            alignItems: 'stretch',
        },
        sectionHeaderText: {
            fontSize: 13,
            fontWeight: '400',
            color: 'rgba(0,0,0,0.67)',
            textTransform: 'uppercase'
        },
        listItemContainer: {
            backgroundColor: 'white',
            borderRadius: 10,    
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            alignItems: 'stretch',
        },
        listItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
        },
        inputText: {
            fontSize: 17,
            color: 'rgba(0,0,0,0.85)'
        },
        listItemTitle: {
            fontSize: 14    ,
        },
        listItemDetail: {
            fontSize: 14,
            color: 'rgba(0,0,0,0.5)',
        }
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle emoji={place.emoji} title={place.title} />,
            // title: '',
            headerLargeTitle: false,
            // headerTitleStyle: {
            //     fontSize: 24,
            // },
            // headerLargeTitleStyle: {
            //     fontSize: 24,
            // },
            // headerTitleAlign: 'center',
            headerTransparent: false,
            // header: ({ navigation, route, options, back }) => <Header route={route} />
    }, [navigation])
})

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* <FlatList 
                    style={styles.list}
                    data={data}
                    renderItem={({ item }) => <ListItemContainer content={<Content title={item.title} value={item.value} navigation={navigation} navigateTo={''} />} />}
                    contentContainerStyle={{ gap: 1 }}
                /> */}
                <View style={styles.infoContainer}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionHeaderText}>note</Text>
                            <View style={styles.listItemContainer}> 
                                <View style={styles.listItem}>
                                    <TextInput 
                                        editable
                                        multiline
                                        style={styles.inputText}
                                        onChangeText={(text) => setNoteInput(text)}
                                        value={noteInput}
                                        numberOfLines={2} />
                                </View>
                            </View>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionHeaderText}>details</Text>
                            <View style={styles.listItemContainer}> 
                            <View style={styles.listItem}>
                                <Text style={styles.listItemTitle}>Category</Text>
                                <Text style={styles.listItemDetail}>{place.primary_type}</Text>
                            </View>
                            <View style={styles.listItem}> 
                                <Text style={styles.listItemTitle}>Rating</Text>
                                <Text style={styles.listItemDetail}>★ {place.rating} ({place.user_rating_count})</Text>
                            </View>
                            </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}