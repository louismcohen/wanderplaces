import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'; 
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SPACE_GROTESK_FAMILY = {
  '300Light': 'SpaceGrotesk_300Light',
  '400Regular': 'SpaceGrotesk_400Regular',
  '500Medium': 'SpaceGrotesk_500Medium',
  '600SemiBold': 'SpaceGrotesk_600SemiBold',
  '700Bold': 'SpaceGrotesk_700Bold',
}

import {
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

const defaultStyle = {
  fontFamily: 'SpaceGrotesk_500Medium',
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

export default PlacesMap = () => {
  SplashScreen.preventAutoHideAsync();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          SpaceGrotesk_300Light,
          SpaceGrotesk_400Regular,
          SpaceGrotesk_500Medium,
          SpaceGrotesk_600SemiBold,
          SpaceGrotesk_700Bold,
        })
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [`${POINT_BOTTOM}%`, `${POINT_MIDDLE}%`, `${POINT_TOP}%`], []);
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
    // console.log({containerHeight: Object.keys(bottomSheetRef.current)});
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
    console.log(markerSelectedRef.current.props.title)
  }, []);

  const markerSelectedRef = useRef(null);

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
          }}
          onPress={
            (e) => {
              bottomSheetRef.current.collapse()
            }
          }
          >
          <Marker
            ref={markerSelectedRef}
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
        {/* <Line style={styles.line} /> */}
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
  }
  
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
    fontFamily: SPACE_GROTESK_FAMILY['700Bold'],
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    fontSize: 20,
    fontFamily: SPACE_GROTESK_FAMILY['400Regular'],
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