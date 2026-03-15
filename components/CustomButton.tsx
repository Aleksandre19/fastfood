import { CustomButtonProps } from '@/type';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import cn from 'clsx';

const CustomButton = ({
    onPress,
    title='Click Me',
    style,
    textStyle,
    leftIcon,
    isLoading = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
      className={cn('custom-btn', (isLoading || !onPress ) && 'opacity-60',style)} 
      onPress={onPress}
      disabled={isLoading || !onPress}
    >
      {leftIcon}

      <View className='flex-center fdlex-row'>
            {isLoading ? (
                <ActivityIndicator size='small' color='white' />
            ) : (
                <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
                    {title}
                </Text>
            )}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton