import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Animated, Platform } from 'react-native';
import React, { useRef } from 'react';

export function HapticTab(props: BottomTabBarButtonProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (ev: any) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Subtle fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    }).start();
    
    props.onPressIn?.(ev);
  };

  const handlePressOut = (ev: any) => {
    // Subtle fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    
    props.onPressOut?.(ev);
  };

  return (
    <PlatformPressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={null}
      style={[
        props.style,
        { opacity: fadeAnim }
      ]}
    />
  );
}
