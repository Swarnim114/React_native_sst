import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className="bg-emerald-600 px-5 py-4 shadow-lg">
        <View className="flex-row items-center justify-between">
          {/* Delivery Info */}
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-white text-xs font-medium opacity-90">
                Delivery in
              </Text>
              <View className="bg-white/20 px-2 py-1 rounded-full ml-2">
                <Text className="text-white text-xs font-bold">9 mins</Text>
              </View>
            </View>
            <View className="flex-row items-center mt-1">
              <Text className="text-white text-base font-bold">
                Home
              </Text>
              <Text className="text-white text-lg ml-1">📍</Text>
            </View>
            <Text className="text-white/80 text-xl mt-0.5">
              Neeladari Nagar , Electornic city Bengaluru
            </Text>
          </View>

          <View>

            <View className="bg-white rounded-xl px-4 py-3 flex-row items-center">
              <Text className="text-gray-400 mr-2">🔍</Text>
              <TextInput
                className="flex-1 text-gray-800"
                placeholder="Search for products..."
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>


        </View>


      </View>

      {/* Main Content */}
      <View className="flex-1 px-4 mt-4">
        <Text className="text-xl font-bold text-gray-800">
          Shop by Category
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Home