import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const SwipeableItem = ({ item, onSwipeableLeftOpen, onSwipeableRightOpen }) => {
  const translateX = new Animated.Value(0);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleOnSwipeableOpen = (event, gestureState, swipeable) => {
    if (gestureState.dx < 0) {
      onSwipeableLeftOpen(item);
    } else {
      onSwipeableRightOpen(item);
    }
    // Reset the translationX value after the swipeable has been opened
    Animated.timing(translateX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  };

  return (
    <Swipeable
      onSwipeableLeftOpen={handleOnSwipeableOpen}
      onSwipeableRightOpen={handleOnSwipeableOpen}
      renderLeftActions={() => <View style={styles.leftActionsContainer}><Text>Left Actions</Text></View>}
      renderRightActions={() => <View style={styles.rightActionsContainer}><Text>Right Actions</Text></View>}
      leftActionActivationDistance={100}
      rightActionActivationDistance={100}
      overshootLeft={false}
      overshootRight={false}
    >
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View style={[styles.itemContainer, { transform: [{ translateX }] }]}>
          <Text>{item}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  leftActionsContainer: {
    backgroundColor: '#00bfff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 16,
  },
  rightActionsContainer: {
    backgroundColor: '#ff6347',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
  },
});

export default SwipeableItem;
