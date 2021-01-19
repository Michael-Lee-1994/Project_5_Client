import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';

const Profile = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text>Profile!</Text>
            <StatusBar style="auto" />
            {/* <Button title="diff screen" onPress={() => navigation.navigate("Diff")}/> */}
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

export default Profile