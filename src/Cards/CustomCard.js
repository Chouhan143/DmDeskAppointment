import React from 'react'
import { View } from 'react-native'

const CustomCard = () => {
  return (
    <View style={styles.MainWraper}>
    <View style={[styles.UserName, { backgroundColor: '#36648B' }]}>
      <Text
        style={{
          color: '#fff',
          fontSize: responsiveFontSize(2),
          fontWeight: 'bold',
        }}>
        {item.user_name} ({item.noofpeople})
      </Text>

    </View>
    <View style={styles.OuterWraper}>
      <View style={styles.ImageWraper}>

        <TouchableOpacity onPress={() => watchFullImage(`https://srninfotech.com/projects/dmdesk/public/uploads/${item.img}`)}>
          <Image
            source={
              item.img
                ? {
                  uri: `https://srninfotech.com/projects/dmdesk/public/uploads/${item.img}`,
                }
                : Avtar
            }
            style={{
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              borderWidth: 0.2,
              borderRadius: 10,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ContentWraper}>
        <View style={styles.ListRow}>
          <Text style={styles.textHeading}>मिलने का कारण :- </Text>
          <Text numberOfLines={6} style={styles.textSubHeading}>
            {item.purpose}
          </Text>
        </View>
        <View style={styles.ListRow}>
          <Text style={styles.textHeading}>
            व्यक्तियो की संख्या :-
          </Text>
          <Text style={styles.textSubHeading}>{item.noofpeople}</Text>
        </View>
        <View style={styles.ListRow}>
          <Text style={styles.textHeading}>तारीख :- </Text>
          <Text style={styles.textSubHeading}>{item.date}</Text>
        </View>
        <View style={styles.ListRow}>
          <Text style={styles.textHeading}>समय :- </Text>
          <Text style={styles.textSubHeading}>{item.time}</Text>
        </View>
        {/* <View style={{ flexDirection: 'row' }}>
          <View style={styles.ViewMore}>
            <TouchableOpacity onPress={() => onPressHandler(item)}>
              <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5) }}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.ViewMore, { marginLeft: responsiveWidth(2) }]}>
            <TouchableOpacity onPress={() => navigateToEdit(item.id)}>
              <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5) }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <View>
        </View>
      </View>
    </View>
  </View>
  )
}



export default CustomCard


const styles = StyleSheet.create({
    MainWraper: {
        // flex: 1,
        display: 'flex',
        width: width - 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginVertical: 5,
        overflow: 'hidden',
        flexWrap: 'wrap',
        position: 'relative',
      },
      UserName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000',
        padding: 8,
        borderColor: 'trasperant',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        width: '100%',
      },
      OuterWraper: {
        display: 'flex',
        flexDirection: 'row',
      },
      ImageWraper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
      },
      ContentWraper: {
        overflow: 'hidden',
        flexWrap: 'wrap',
        width: responsiveWidth(100) - 100,
      },
      ListRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-start',
        marginHorizontal: 5,
        flexWrap: 'wrap',
        overflow: 'hidden',
      },
      textHeading: {
        color: '#000',
        paddingVertical: 5,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.5),
      },
      textSubHeading: {
        color: '#8B8989',
        fontSize: responsiveFontSize(1.3),
      },
      ViewMore: {
        backgroundColor: '#36648B',
        padding: 5,
        width: 70,
        borderWidth: 0.2,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        // marginLeft: 150,
    
      },
      ViewMore1: {
        backgroundColor: '#36648B',
        padding: 5,
        width: 70,
        borderWidth: 0.2,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 200,
      },
})