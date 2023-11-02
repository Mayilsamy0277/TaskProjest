import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Welcome = ({navigation}) => {
  return (
    <View>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: 670,
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: 'white',
          }}>
          <Image
            style={{
              height: 200,
              width: 200,
              bottom: 90,
              alignItems: 'center',
              alignSelf: 'center',
            }}
            source={require('../assets/group-pic.jpg')}
          />
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              margin: 30,
              bottom: 30,
            }}>
            <Text
              style={{
                fontSize: 30,
                color: 'blue',
                bottom: 10,
                fontWeight: 'bold',
              }}>
              Welcome!
            </Text>
            <Text style={{fontSize: 18, color: 'seagreen'}}>
              We're glade you're here
            </Text>
            <Text style={{fontSize: 18, color: 'seagreen'}}>
              Lets get started.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{
                top: 70,
                bottom: 100,
                height: 60,
                width: 350,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'blue',
                borderRadius: 30,
                shadowColor: 'blue',
                shadowOffset: {width: 5, height: 10},
                shadowRadius: 2,
                shadowOpacity: 1,
                elevation: 8,
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
