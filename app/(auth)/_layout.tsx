import { Slot } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function _Layout() {
  return (
    <SafeAreaView>
      <Text>Auth Layout</Text>
      <Slot />
    </SafeAreaView>
  )
}

export default _Layout