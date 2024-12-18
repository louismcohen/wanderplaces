import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RoundMarker from './RoundMarker';

const MiniMap = ({ place }) => {
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            height: 200,
            borderWidth: 1, 
            borderColor: 'rgba(0,0,0,0.15)', 
            borderRadius: 10, 
            // overflow: 'hidden',

            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.10,
            shadowRadius: 3,

            elevation: 4,

            // borderWidth: 1,
            // borderColor: 'red',
        },
        marker: { 
            borderRadius: 999, 
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.15)',

            width: 36, 
            height: 36, 
            backgroundColor: 'rgba(255,255,255,0.85)', 
            justifyContent: 'center', 
            alignItems: 'center',

            shadowColor: 'rgba(0,0,0,1.0)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.40,
            shadowRadius: 6,

            elevation: 5,
        },
        addressText: {
            fontSize: 13, 
            color: 'rgba(0,0,0,0.5)', 
            alignSelf: 'flex-end',
            fontFamily: 'Mona-Light',
        }
    });

    const initialRegion = {
        latitude: place.lat,
        longitude: place.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    }
    return (
        <View style={{ flexDirection: 'column', gap: 8, }}>
            <View 
                style={styles.container} 
            >
                <MapView 
                    style={{ height: '100%', width: '100%', borderRadius: 10, }}
                    initialRegion={initialRegion}
                >
                    <Marker 
                        stopPropagation
                        coordinate={initialRegion}
                        // title={place.title}
                    >  
                        <RoundMarker emoji={place.emoji} />
                    </Marker>
                </MapView>
            </View>
            <Text style={styles.addressText}>{place.short_formatted_address}</Text>
         </View>
    )  
};

export default MiniMap;