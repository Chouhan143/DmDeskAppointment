import { View } from "react-native";
import { StyleSheet } from "react-native";
import { FadeLoading } from "react-native-fade-loading";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

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
      marginVertical: responsiveHeight(2), // 1.25% of screen height
      marginHorizontal: responsiveWidth(4), // 2.5% of screen width
      paddingVertical: responsiveHeight(4), // 2.5% of screen height
      paddingHorizontal: responsiveWidth(7), // 5% of screen width
      borderRadius: responsiveHeight(3), // 1.25% of screen height
      height:responsiveHeight(20),
      backgroundColor: "#fff",
      elevation: 5
    },
    fadeLoading: {
      margin: 10,
      height: 20
    }
  });