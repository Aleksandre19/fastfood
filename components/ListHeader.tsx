import { images } from '@/constants'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import CartButton from './CartButton'

// We implemented the FlatList header in the separate component
// because to render only once when the FlatList component is created
// and not every render as it happens in case of inline implementation.
const ListHeader = () => {
  return (
    <View className="flex-between flex-row w-full my-5 px-5">
        <View className="flex-start">
        <Text className="small-bold text-primary">DELIVER TO</Text>
        
        <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
            <Text className="paragraph-bold text-dark-100">Georgia</Text>
            <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
        </TouchableOpacity>
        </View>

        <CartButton />
    </View>
  )
}

export default ListHeader