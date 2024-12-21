import {View} from 'react-native';
// import AppNavigator from './AppNavigator.tsx';
import LoginScreen from './screens/LoginScreen.tsx';

function AppContainer() {
    return (
        <View style={{flex:1}}>
            {/*<AppNavigator />*/}
            <LoginScreen />
        </View>
    );
}

export default AppContainer;
