import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native'
import { moderateScale } from 'react-native-size-matters';
import { StyleSheet, View, Text, TouchableOpacity, SectionList, FlatList, TouchableHighlight, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MiniMap from '../components/MiniMap';
import EmojiPicker from 'rn-emoji-keyboard'

import { showLocation } from 'react-native-map-link';


import { ListItemContainer } from '../components/ListItems';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { ApiContext } from '../api/ApiContext';
import { render } from 'react-dom';

const Header = ({ navigation, route, options, back }) => {
    // console.log(route)
    return (
        <View>
            <Text>{route.params.title}</Text>
        </View>
    )
}

const ListItem = ({ icon, title, detail }) => {
    const styles = StyleSheet.create({
        listItem: {
            // flex: 1,
            flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            // paddingVertical: 12,
            paddingHorizontal: 16,
        },
        borderContainer: {
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // borderBottomColor: 'red',
            // borderBottomWidth: 1,
            paddingVertical: 12,
        },
        listItemTitleContainer: {
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 16,
        },
        iconContainer: {
            backgroundColor: `#${(Math.random() * 0xaaaaaa * 1000000).toString(16).slice(0, 6)}`,
            // padding: 6,
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 4,
        },
        listItemTitle: {
            fontSize: 17,
            fontFamily: 'Mona-Medium',
        },
        listItemDetailContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        listItemDetail: {
            fontSize: 14,
            lineHeight: 16,
            color: 'rgba(0,0,0,0.5)',
            textAlign: 'right',
            fontFamily: 'Mona-Regular',
        }
    })



    return (
        <View style={styles.listItem}>
            <View style={styles.borderContainer}>
                <View style={styles.listItemTitleContainer}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name={icon} size={17} color='white' />
                    </View>
                    <Text style={styles.listItemTitle}>{title}</Text>
                </View>
                <View style={styles.listItemDetailContainer}>
                    <Text numberOfLines={3} style={styles.listItemDetail}>{detail}</Text>
                </View>
            </View>

        </View>
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

const HeaderTitle = ({ emoji, title, openEmojiPicker }) => {
    const styles = StyleSheet.create({
        container: {
            overflow: 'visible',
            // backgroundColor: 'white',
            // flex: 1,
            paddingVertical: 16,
            paddingHorizontal: 16,
            paddingTop: 24,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 12,
            // borderColor: 'red',
            // borderWidth: 1,
            overflow: 'hidden',
        },
        emojiContainer: {
            width: 44,
            height: 44,
            borderRadius: 8,
            borderColor: 'rgba(0,0,0,0.20)',
            borderWidth: 1,
            // padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: 'white',

            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.10,
            shadowRadius: 3,

            elevation: 4,
        },
        emoji: {
            fontSize: 24,
            textAlign: 'center',
        },
        title: {
            flex: 1,
            fontSize: 24,
            fontWeight: '700',
            fontFamily: 'Mona-BoldWide',
        },
    })

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.emojiContainer} onPress={openEmojiPicker}>
                <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
            <Text numberOfLines={2} style={styles.title}>{title}</Text>
        </View>
    )
}

const SectionHeader = ({ title, auxComponent }) => {
    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 7,
            // borderColor: 'green',
            // borderWidth: 1,
        },
        sectionHeaderText: {
            flexShrink: 1,
            fontFamily: 'Mona-MediumWide',
            fontSize: 13,
            color: 'rgba(0,0,0,0.5)',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        sectionAuxComponent: {
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
            <View style={styles.sectionAuxComponent}>{auxComponent}</View>
        </View>     
    )
}

const Section = ({ title, auxComponent, content }) => {
    const styles = StyleSheet.create({
        sectionContainer: {
            flexDirection: 'column',
            gap: 7,
            justifyContent: 'center',
            alignItems: 'stretch',
            paddingHorizontal: 16,
            paddingVertical: 12,

            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.10,
            shadowRadius: 3,

            elevation: 5,
        },
    });

    return (
        <View style={styles.sectionContainer}>
            <SectionHeader title={title} auxComponent={auxComponent} />
            {content}
        </View>
    )
}

const SectionAuxLink = ({ icon, text, onPress }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 13,
            color: 'rgba(0,0,0,0.5)',
            fontFamily: 'Mona-RegularWide'
        },
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Ionicons name={icon} style={styles.text} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default PlaceDetail = ({ navigation, route }) => {
    const [viewHeight, setViewHeight] = useState();
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [place, setPlace] = useState();
    const [noteInput, setNoteInput] = useState();
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const { collections, places, setPlaces } = useContext(ApiContext);

    useEffect(() => {    
        setPlace(places.find(p => p._id === route.params._id))
    }, [places])

    useEffect(() => {
        if (place) {
            const updatedPlaces = places.map(p => {
                if (p._id === place._id) {
                    return place
                };
                return p;
            })
    
            setPlaces(updatedPlaces);
        }

    }, [place]);

    useEffect(() => {
        const thisCollection = collections.find(collection => collection._id === route.params.collection_id);

        if (place && !place.emoji) {
            setPlace({
                ...place,
                emoji: thisCollection.emoji,
            })
        }
    }, [place])

    useEffect(() => {
        if (place) {
            setPlace({
                ...place,
                emoji: selectedEmoji,
            })
        }
    }, [selectedEmoji]);

    useEffect(() => {
        if (place) {
            setPlace({
                ...place,
                note: noteInput,
            })
        }

    }, [noteInput]);

    const listData = [
        {
            icon: 'boxes-stacked',
            title: 'Categories',
            detail: place?.types?.split(',').slice(0, 3).join(', '),
        },
        {
            icon: 'star-half-stroke',
            title: 'Rating',
            detail: place?.rating ? `★ ${place.rating?.toLocaleString()} (${place.user_rating_count?.toLocaleString()})` : 'No ratings',
        },
        {
            icon: 'clock',
            title: 'Hours',
            detail: 'Closed now\nOpens tomorrow at 6:00 AM',
        },
        {
            icon: 'check',
            title: 'Visited',
            detail: 'Yes, I\'ve been here',
        },
    ]

    const sectionData = [
        {
            title: 'note',
            data: [route.params],
        },
        {
            title: 'details',
            data: [route.params],
        },
        {
            title: 'location',
            data: [route.params],
        },
        {
            title: 'photos',
            data: [route.params],
        },
    ]
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // padding: 16,
            // overflow: 'visible',
            // gap: 16,
        },
        infoContainer: {
            flex: 1,
            flexDirection: 'column',
            // gap: 16,
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
            paddingHorizontal: 16,
            paddingVertical: 12,

            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.10,
            shadowRadius: 3,

            elevation: 5,
        },
        sectionHeaderText: {
            fontSize: 13,
            fontWeight: '400',
            color: 'rgba(0,0,0,0.67)',
            textTransform: 'uppercase'
        },
        flatList: { 
            backgroundColor: 'white', 
            borderRadius: 10, 
            borderColor: 'rgba(0,0,0,0.15)', 
            borderWidth: 1, 

            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.10,
            shadowRadius: 3,

            elevation: 5,
        },
        listItemContainer: {
            backgroundColor: 'white',
            borderRadius: 10,    
            borderColor: 'rgba(0,0,0,0.15)', 
            borderWidth: 1, 

            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.10,
            shadowRadius: 3,

            elevation: 5,
        },
        listItem: {
            paddingVertical: 12,
            paddingHorizontal: 16,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        },
        inputText: {
            fontSize: 17,
            lineHeight: 17,
            color: 'rgba(0,0,0,0.85)',
            fontFamily: 'Mona-Regular',
            
        },
        listItemTitle: {
            fontSize: 14    ,
        },
        listItemDetail: {
            fontSize: 14,
            color: 'rgba(0,0,0,0.5)',
        }
    });

    const renderSectionHeader = (({ section: { title } }) => {
        if (title === 'location') {
            return (
                <SectionHeader
                    title={title}
                    auxComponent={
                        <SectionAuxLink 
                            icon='open-outline' 
                            text='Open in Maps' 
                                onPress={() => showLocation({
                                latitude: place.lat,
                                longitude: place.lng,
                                title: place.title,
                                googlePlaceId: place.google_place_id,
            
                            })} 
                        />}
                />
            )
        } else {
            return (
                <SectionHeader title={title} />
            )
        };
    });

    const renderSectionItem = ({ item, index, section }) => {
        switch (section.title) {
            case 'note':
                return (
                    <View style={styles.listItemContainer}> 
                        <View style={styles.listItem}>
                            <TextInput 
                                editable
                                multiline
                                style={styles.inputText}
                                placeholder='Any additional info about this place?'
                                onChangeText={(text) => setNoteInput(text)}
                                onEndEditing={(event) => setPlace({ ...place, note: event.nativeEvent.text})}
                                // onSubmitEditing={() => console.log('on submit editing')}
                                defaultValue={place?.note}
                                value={noteInput}
                                numberOfLines={2} 
                                spellCheck={false}
                                // blurOnSubmit={true}
                            />
                        </View>
                    </View>
                );
            case 'details':
                return (
                    <FlatList 
                        style={styles.flatList}
                        data={listData}
                        // contentContainerStyle={{ borderWidth: 1, borderColor: 'red' }}
                        // ListHeaderComponent={<SectionHeader title={'details'} />}
                        renderItem={({ item }) => <ListItem icon={item.icon} title={item.title} detail={item.detail} />}
                        ItemSeparatorComponent={<View style={{ height: 1, marginHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)'}} />}
                    />
                );
            case 'location':
                return (
                    <MiniMap place={item} />
                )
            case 'photos':
                return null;
            default:
                return null;
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerShown: true    ,
            // header: () => <HeaderTitle emoji={place.emoji} title={place.title} />,
            // title: '',
            // headerLargeTitle: false,
            // headerTitleStyle: {
            //     fontSize: 24,
            // },
            // headerLargeTitleStyle: {
            //     fontSize: 24,
            // },
            // headerTitleAlign: 'center',
            // headerTransparent: false,
            // header: ({ navigation, route, options, back }) => <Header route={route} />
    }, [navigation])
})

    return (
        <TouchableWithoutFeedback style={{ flex: 1, }} onPress={Keyboard.dismiss} onLayout={(event) => setViewHeight(event.nativeEvent.layout.height * 0.8)}>
            <View style={styles.container}>
                <HeaderTitle emoji={selectedEmoji || place?.emoji} title={place?.title} openEmojiPicker={() => setIsEmojiPickerOpen(true)} />
                {viewHeight ? <EmojiPicker 
                    open={isEmojiPickerOpen} 
                    onClose={() => setIsEmojiPickerOpen(false)} 
                    onEmojiSelected={(emojiObject) => setSelectedEmoji(emojiObject.emoji)}
                    categoryPosition='bottom'
                    enableRecentlyUsed
                    enableSearchBar
                    defaultHeight={viewHeight}
                    styles={{ header: {
                        fontSize: 13,
                        textTransform: 'uppercase',
                    }}}
                    // enableSearchAnimation
                /> : null}
                <View style={styles.infoContainer}>
                    <SectionList 
                        style={{ flex: 1, paddingHorizontal: 16, }}
                        sections={sectionData}
                        renderItem={renderSectionItem}
                        renderSectionHeader={renderSectionHeader}
                        renderSectionFooter={() => <View style={{ height: 16}} />}
                        ItemSeparatorComponent={() => <View style={{ height: 1, marginHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)'}} />}
                        // CellRendererComponent={({props}) => {props}}
                    />
                    {/* <FlatList
                        data={sectionData}
                        style={styles.flatList}
                        renderItem={renderSectionItem}
                        /> */}
                    {/* <Section
                        title={'note'}
                        content={
                            <View style={styles.listItemContainer}> 
                                <View style={styles.listItem}>
                                    <TextInput 
                                        editable
                                        multiline
                                        style={styles.inputText}
                                        placeholder='Any additional info about this place?'
                                        onChangeText={(text) => setNoteInput(text)}
                                        onEndEditing={(event) => setPlace({ ...place, note: event.nativeEvent.text})}
                                        // onSubmitEditing={() => console.log('on submit editing')}
                                        value={noteInput}
                                        numberOfLines={2} 
                                        spellCheck={false}
                                        // blurOnSubmit={true}
                                    />
                                </View>
                            </View>
                        }
                    />
                    <Section 
                        title={'details'} 
                        content={
                            <FlatList 
                                style={styles.flatList}
                                data={listData}
                                // contentContainerStyle={{ borderWidth: 1, borderColor: 'red' }}
                                // ListHeaderComponent={<SectionHeader title={'details'} />}
                                renderItem={({ item }) => <ListItem icon={item.icon} title={item.title} detail={item.detail} />}
                                ItemSeparatorComponent={<View style={{ height: 1, marginHorizontal: 16, backgroundColor: 'rgba(0,0,0,0.1)'}} />}
                            />    
                        } 
                    />
                    <Section 
                        title={'location'}
                        auxComponent={
                        <SectionAuxLink 
                            icon='open-outline' 
                            text='Open in Maps' 
                                onPress={() => showLocation({
                                latitude: place.lat,
                                longitude: place.lng,
                                title: place.title,
                                googlePlaceId: place.google_place_id,
            
                            })} 
                        />}
                        content={<MiniMap place={place} />}
                    />
                    <Section
                        title={'photos'}
                        content={null
                        } 
                    /> */}
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}