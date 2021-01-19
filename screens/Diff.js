import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';

const Diff = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text>Hi!</Text>
            <StatusBar style="auto" />
            <Button title="go back" onPress={() => navigation.goBack()}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Diff;