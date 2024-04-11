import { memo } from 'react'
import { Marker } from 'react-native-maps';
import RoundMarker from './RoundMarker';

const MapMarker = ({ place, onPress }) => {
    return (
        <Marker
            stopPropagation
            coordinate={{ latitude: place.lat, longitude: place.lng }}
            onPress={onPress}
        >
            <RoundMarker emoji={place.emoji} />
        </Marker>
    )
}

export default MapMarker;