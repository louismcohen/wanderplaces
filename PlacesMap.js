import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'; 
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useDerivedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as Haptics from 'expo-haptics';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const SPACE_GROTESK_FAMILY = {
  '300Light': 'SpaceGrotesk_300Light',
  '400Regular': 'SpaceGrotesk_400Regular',
  '500Medium': 'SpaceGrotesk_500Medium',
  '600SemiBold': 'SpaceGrotesk_600SemiBold',
  '700Bold': 'SpaceGrotesk_700Bold',
}

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
import { parse } from 'react-native-svg';

const defaultStyle = {
  // fontFamily: 'SpaceGrotesk_500Medium',
}
const customTextProps = {
  style: defaultStyle,
}

const customViewProps = {
  style: {
    flex: 1,
    ...defaultStyle,
  }
}

const customTextInputProps = {
  style: defaultStyle,
}

setCustomText(customTextProps);
setCustomTextInput(customTextInputProps);
setCustomView(customViewProps);

const POINT_BOTTOM = 15;
const POINT_MIDDLE = 50;
const POINT_TOP = 92;

const Line = () => {
  return <View style={styles.line}></View>
}

const testMarker = {
  latitude: 34.041878080486164,
  longitude: -118.26305772438361,
  title: 'Test Marker',
  description: 'This is a description of the marker'
}

export default PlacesMap = () => {
  const bottomTabBarHeight = useBottomTabBarHeight();

  SplashScreen.preventAutoHideAsync();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // await Font.loadAsync({
        //   SpaceGrotesk_300Light,
        //   SpaceGrotesk_400Regular,
        //   SpaceGrotesk_500Medium,
        //   SpaceGrotesk_600SemiBold,
        //   SpaceGrotesk_700Bold,
        // })
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [bottomTabBarHeight + 100, `${POINT_MIDDLE}%`, `${POINT_TOP}%`], []);
  const bottomSheetPosition = useSharedValue(0);

  const recenterMap = async (fromSnapHeight, toSnapHeight) => {
    console.log('in recenterMap\n\n');
    const window = Dimensions.get('window');
    const currentMapHeight = Math.round(window.height - fromSnapHeight);
    const newMapHeight = Math.round(window.height - toSnapHeight);
    const heightDiff = fromSnapHeight - toSnapHeight;
    // const currentPoints = await getPointsforCoordinate({latitude: mapRegion.latitude, longitude: mapRegion.longitude});
    console.log({heightDiff, fromSnapHeight, toSnapHeight, currentMapHeight, newMapHeight})

    const desiredCenterPoint = {
      x: window.width / 2,
      y: window.height / 2 - heightDiff / 2,
    };
    const desiredCoordinates = await getCoordinatesForPoint(desiredCenterPoint);

    // console.log({currentPoints, mapHeight, desiredCenterPoint})

    mapViewRef.current.animateToRegion({
      latitude: markerSelected ? markerSelected.latitude : desiredCoordinates.latitude,
      longitude: desiredCoordinates.longitude,
      latitudeDelta: mapRegion.latitudeDelta,
      longitudeDelta: mapRegion.longitudeDelta,
    }, 500)
  }

  const mapViewRef = useRef(null);

  const getPointsforCoordinate = async (coordinate) => {
    const points = await mapViewRef.current.pointForCoordinate(coordinate);
    console.log({points});
    return points;
  }

  const getCoordinatesForPoint = async (point) => {
    const coordinates = await mapViewRef.current.coordinateForPoint(point);
    console.log({coordinates});
    return coordinates;
  }

  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
    // console.log({containerHeight: Object.keys(bottomSheetRef.current)});
    if (index === 0) {
      // Keyboard.dismiss();
      // markerSelectedRef.current?.hideCallout()
    }
    
  }, []);

  const calculateSnapPointHeight = (snapPoint, window) => {
    return snapPoint.toString().includes('%')
    ? parseFloat(snapPoint) / 100 * window.height
    : snapPoint
  }

  const handleSheetAnimation = useCallback((fromIndex, toIndex) => {
    console.log('in handleSheetAnimation\n');
    console.log({fromIndex, toIndex});
    if (toIndex !== 2) {
      Keyboard.dismiss();

      if (fromIndex !== 2) {
        const fromSnapPoint = snapPoints[fromIndex];
        const toSnapPoint = snapPoints[toIndex];
        const window = Dimensions.get('window');
        
        const fromSnapHeight = calculateSnapPointHeight(fromSnapPoint, window);
        const toSnapHeight = calculateSnapPointHeight(toSnapPoint, window);
       
        recenterMap(fromSnapHeight, toSnapHeight);
      }
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const changeBottomSheetPosition = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const initialRegion= {
    latitude: 34.041878080486164,
    longitude: -118.26305772438361,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  const [mapRegion, setMapRegion] = useState(initialRegion);

  const handleMapRegionChangeComplete = useCallback((region, details) => {
    console.log({regionChangeComplete: region});
    setMapRegion(region);
  }, []);

  useEffect(() => {
    const points = getPointsforCoordinate({latitude: mapRegion.latitude, longitude: mapRegion.longitude});
    console.log({mapRegion, points});
  }, [mapRegion]);

  const [markerSelected, setMarkerSelected] = useState(null);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  
  if (!appIsReady) {
    return null;
  }
  else {
    return (
      <GestureHandlerRootView styles={styles.container} onLayout={onLayoutRootView}>
        <MapView
          ref={mapViewRef}
          provider={ PROVIDER_GOOGLE }
          style={ styles.map }
          initialRegion={initialRegion}
          onRegionChangeComplete={handleMapRegionChangeComplete}
          showsUserLocation
          onMarkerPress={
            (e) => {
              changeBottomSheetPosition(1)
          }}
          onPress={
            (e) => {
              bottomSheetRef.current.collapse()
              setMarkerSelected(null);
            }
          }
          >
          <Marker
            stopPropagation
            coordinate={{
              latitude: testMarker.latitude,
              longitude: testMarker.longitude,
            }}
            title={testMarker.title}
            description={testMarker.description}
            onPress={() => setMarkerSelected(testMarker)}
          />
            {/* <Image source={require('./src/images/restaurant_pinlet.png')} style={{maxWidth: 30, maxHeight: 30, objectFit: 'contain'}} /> */}
            {/* </Marker> */}
        </MapView>
        {/* <Line style={styles.line} /> */}
          <Animated.View style={{top: bottomSheetPosition}} />
            <BottomSheet
              ref={bottomSheetRef}
              animatedPosition={bottomSheetPosition}
              style={styles.bottomSheet}
              snapPoints={snapPoints}
              // enableDynamicSizing
              onChange={handleSheetChanges}
              onAnimate={handleSheetAnimation}
              keyboardBehavior='extend'
              containerOffset={bottomTabBarHeight}
              // bottomInset={bottomTabBarHeight}
              >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <BottomSheetScrollView style={{
                  ...styles.contentContainer,
                  marginBottom: bottomTabBarHeight,
                  }}>
                  {markerSelected 
                    ? <><Text style={ styles.headerText }>{markerSelected?.title}</Text>
                      <Text>{markerSelected.description}</Text></>
                    : null
                  }
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Search for a place'}
                    onFocus={() => bottomSheetRef.current.expand()}
                  />
                </BottomSheetScrollView>
              </TouchableWithoutFeedback>
            </BottomSheet>        
  
      </GestureHandlerRootView>
    )
  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: '#fff',
  },
  contentContainer: {
    paddingHorizontal: moderateScale(16),
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
    // borderColor: 'red',
    // borderWidth: '3px',
  },
  headerText: {
    // fontFamily: SPACE_GROTESK_FAMILY['700Bold'],
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    fontSize: 20,
    // fontFamily: SPACE_GROTESK_FAMILY['400Regular'],
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    backgroundColor: '#00000010',
    borderRadius: 8,
    borderColor: '#00000015',
    borderWidth: 1,
    marginVertical: moderateScale(16),
  }, 
  line: {
    flex: 1,
    height: 1,
    width: '100%',
    backgroundColor: 'red',
    position: 'absolute',
    top: `${100 - POINT_TOP}%`,
    left: 0,
  }
});