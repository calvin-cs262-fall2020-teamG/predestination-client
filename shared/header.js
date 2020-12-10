import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";

export default function Header({ navigation, customStyle }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View>
      {/* <MaterialIcons
        name='help-outline'
        size={24}
        onPress={() => setModalOpen(true)}
        style={globalStyles.modalHelpIcon}
      /> */}
      <MaterialIcons
        style={globalStyles.topRightMenuIcon}
        name="menu"
        size={28}
        onPress={openMenu}
      />
    </View>
  );
}
