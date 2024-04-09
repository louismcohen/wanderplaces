import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

const MiniMap = ({ place }) => {
    const styles = StyleSheet.create({
        container: {
            borderWidth: 1, 
            borderColor: 'rgba(0,0,0,0.15)', 
            borderRadius: 10, 
            overflow: 'hidden',

            // shadowColor: 'rgba(0,0,0,1.0)',
            // shadowOffset: {
            //     width: 0,
            //     height: 2,
            // },
            // shadowOpacity: 0.05,
            // shadowRadius: 3,

            // elevation: 5,

            // borderWidth: 1,
            // borderColor: 'red',
        },
        marker: { 
            borderRadius: 999, 
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.15)',

            width: 36, 
            height: 36, 
            backgroundColor: 'white', 
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
    });

    console.log(Object.keys(place))
    const { lat, lng } = place;
    const initialRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    }
    return (
        <View style={styles.container}>
            <MapView 
                style={{ height: 200 }}
                initialRegion={initialRegion}
            >
                <Marker 
                    stopPropagation
                    coordinate={initialRegion}
                    title={place.title}
                >
                    <View style={styles.marker}>
                        <Text>😃</Text>
                    </View>
                </Marker>
            </MapView>
         </View>
    )  
};

export default MiniMap;