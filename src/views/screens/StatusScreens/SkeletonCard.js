import { View } from "react-native";
import { StyleSheet } from "react-native";
import { FadeLoading } from "react-native-fade-loading";

export const SkeletonCard = ({ width, height }) => {
    return (
      <View style={[styles.card, { width: width, height: height }]}>
        <FadeLoading 
          style={styles.fadeLoading} 
          primaryColor="#e0e0e0" 
          secondaryColor="#f5f5f5" 
          duration={500} 
        />
        <FadeLoading 
          style={styles.fadeLoading} 
          primaryColor="#e0e0e0" 
          secondaryColor="#f5f5f5" 
          duration={500} 
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff"
    },
    card: {
      margin: 10,
      padding: 20,
      borderRadius: 10,
      backgroundColor: "#fff",
      elevation: 5
    },
    fadeLoading: {
      margin: 10,
      height: 20
    }
  });