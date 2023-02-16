export const Uselogout = ({navigation}) => {
    console.log("as")
    AsyncStorage.clear()
    navigation.replace('login');
}