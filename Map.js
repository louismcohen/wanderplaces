import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { useBottomSheet } from '@gorhom/bottom-sheet';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Line = () => {
  return <View style={styles.line}></View>
}

export default GoogleMap = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['15%', '50%', '92%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    console.log({containerHeight: Object.keys(bottomSheetRef.current)});
    if (index === 0) {
      // Keyboard.dismiss();
      // markerSelectedRef.current?.hideCallout()
    }
  }, []);
  const handleSheetAnimation = useCallback((fromIndex, toIndex) => {
    if (toIndex !== 2) {
      Keyboard.dismiss();
    }
  }, []);

  const changeBottomSheetPosition = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const markerSelectedRef = useRef(null);
  const [markerSelected, setMarkerSelected] = useState(); 

  const onLayout = (event) => {
    const {x, y, height, width} = event.nativeEvent.layout;
    console.log({x, y, height, width});
  }

  const handleMarkerChange = () => {

  }
  
  useEffect(() => {
    console.log({bottomSheetRef: bottomSheetRef.current})
    if (bottomSheetRef.current.index === 0) {
      setMarkerSelected(null);
    } else {
      setMarkerSelected(markerSelectedRef.current);
    }
    
    console.log({useEffect: markerSelected});
  }, [markerSelectedRef])
  
  return (
    <GestureHandlerRootView styles={styles.container} onLayout={onLayout}>
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.map }
        initialRegion={{
          latitude: 34.041878080486164,
          longitude: -118.26305772438361,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        onMarkerPress={
          (e) => {
            changeBottomSheetPosition(1)
            setMarkerSelected(markerSelectedRef.current)
            console.log('Marker pressed')
        }}
        onPress={
          (e) => {
            bottomSheetRef.current.collapse()
            setMarkerSelected(null);
            console.log('Map pressed')
          }
        }
        >
        <Marker
          ref={markerSelectedRef}
          draggable
          stopPropagation
          coordinate={{
            latitude: 34.041878080486164,
            longitude: -118.26305772438361,
          }}
          title={'Test Marker'}
          description={'This is a description of the marker'}
        />
          {/* <Image source={require('./src/images/restaurant_pinlet.png')} style={{maxWidth: 30, maxHeight: 30, objectFit: 'contain'}} /> */}
          {/* </Marker> */}
      </MapView>
      <Line style={styles.line} />
        <BottomSheet
          ref={bottomSheetRef}
          style={styles.bottomSheet}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          onAnimate={handleSheetAnimation}
          keyboardBehavior='extend'
          >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={ styles.contentContainer }>
              <Text style={ styles.headerText }>{markerSelectedRef.current?.props.title}</Text>
              <Text>{markerSelectedRef.current?.props.description}</Text>
              
              <TextInput
                style={styles.textInput}
                placeholder={'Search for a place'}
                onFocus={() => bottomSheetRef.current.expand()}
              />
            </View>
          </TouchableWithoutFeedback>
        </BottomSheet>

    </GestureHandlerRootView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: moderateScale(16),
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.33,
    shadowRadius: 15,

    elevation: 11,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    backgroundColor: '#00000010',
    borderRadius: 1000,
    marginVertical: moderateScale(16),
  }, 
  line: {
    flex: 1,
    height: 1,
    width: '100%',
    backgroundColor: 'red',
    position: 'absolute',
    top: '8%',
    left: 0,
  }
});