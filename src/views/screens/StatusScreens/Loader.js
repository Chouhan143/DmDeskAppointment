import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loader = ({ size }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={size || "large"} />
    </View>
  );
};

export default Loader;