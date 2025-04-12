import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            elevation: 0,
            borderTopWidth: 0,
            backgroundColor: colorScheme === 'dark' ? '#151718' : '#fff',
            height: 60, // Set a fixed height for the tab bar
          },
        }),
        tabBarItemStyle: {
          paddingVertical: 6, // Reduced padding to bring elements closer
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 0, // Remove the extra margin that was pushing labels down
          paddingBottom: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0, // Remove bottom margin from icons
        },
        // tabBarPressColor: 'transparent',
        // tabBarPressOpacity: 0.7,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Levels',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="safari.fill" color={color} />,
        }}
      />   
    </Tabs>
  );
}
