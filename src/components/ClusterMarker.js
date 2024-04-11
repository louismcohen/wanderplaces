import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';

const ClusterMarker = ({ properties, geometry, id, onPress, tracksViewChanges }) => {
    const styles = StyleSheet.create({
      container: {
        borderRadius: 999,
        borderWidth: 3,
        // borderColor: 'rgba(20,10,255,0.2)',
        borderColor: 'rgba(0,0,0,0.5',

        backgroundColor: 'rgba(0,0,0,0.85)',

        width: 40,
        height: 40,

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
      text: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        color: 'white',
      }
    });
    
    const points = properties.point_count

    const coordinates = {
      longitude: geometry.coordinates[0],
      latitude: geometry.coordinates[1],
    }

    return (
      <Marker
        key={id}
        coordinate={coordinates}
        onPress={onPress}
        style={{ zIndex: points + 1 }}
        tracksViewChanges={tracksViewChanges}
      >
        <TouchableOpacity>
            <View style={styles.container}>
            <Text style={styles.text}>{points}</Text>
            </View>
        </TouchableOpacity>
      </Marker>
    )
}

export default ClusterMarker;
