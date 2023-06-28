import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Dimensions, Image } from "react-native";
import Home from "../../src/views/screens/Home/HomeScreen";
import Profile from "../../src/views/screens/Profile/ProfileScreen";
import AddAblum from "../views/Dialog/AddAblum";
import ProfileSettings from "../../src/views/screens/Setting/SettingScreen";
import { getPathDown } from "./curve";
import { Svg, Path } from "react-native-svg";
import { scale } from "react-native-size-scaling";
import SeachScreen from "../views/screens/Search/SeachScreen";
import LibraryScreen from "../views/screens/Library/LibraryScreen";
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
export const BottomTabNavigator = () => {
  const [maxWidth, setMaxWidth] = useState(Dimensions.get("window").width);
  const returnpathDown = getPathDown(maxWidth, 60, 50);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "#E0EFFE",
          },
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color={'#5E94FF'} />
          ),
          tabBarLabel: () => (
            <Text className="text-black text-xs" style={{color:'#5E94FF'}}>Home</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Seach"
        component={SeachScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "#E0EFFE",
          },
          tabBarIcon: () => (
            <Ionicons name="search-outline" size={24} color={'#5E94FF'} />
          ),
          tabBarLabel: () => (
            <Text className="text-black text-xs" style={{color:'#5E94FF'}}>Seach</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ADD"
        component={AddAblum}
        options={{
          headerShown: false,
          unmountOnBlur: false,
          tabBarItemStyle: {
            margin: 0,
            zIndex: -50,
          },
          tabBarIcon: () => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 56,
                width: 56,
                backgroundColor: "#5E94FF",
                borderRadius: 35,
              }}
            >
              <Ionicons name="duplicate-outline" size={24} color={'#fff'} />
            </View>
          ),
          tabBarLabel: () => (
            <View>
              <Svg width={maxWidth} height={scale(60)}>
                <Path fill={"#E0EFFE"} {...{ d: returnpathDown }} />
              </Svg>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Lirary"
        component={LibraryScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "#E0EFFE",
          },
          tabBarIcon: () => (
            <Ionicons name="albums-outline" size={24} color={'#5E94FF'} />
          ),
          tabBarLabel: () => (
            <Text className="text-black text-xs" style={{color:'#5E94FF'}}>Library</Text>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileSetting"
        component={ProfileSettings}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: "#E0EFFE",
          },
          tabBarIcon: () => (
            <Ionicons name="search-outline" size={24} color={'#5E94FF'} />
          ),
          tabBarLabel: () => (
            <Text className="text-black text-xs" style={{color:'#5E94FF'}}>Settings</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
