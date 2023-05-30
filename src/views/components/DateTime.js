import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTime = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = date => {
      setSelectedDate(date);
      hideDatePicker();
    };
  
    return (
      <View>
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            value={selectedDate ? selectedDate.toString() : ''}
            editable={false}
            placeholder="Select Date and Time"
            placeholderTextColor="gray"
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  };
  
  export default DateTime;