import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';

const Search = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text>Search!</Text>
            <StatusBar style="auto" />
            {/* <Button title="Home screen" onPress={() => navigation.navigate("Diff")}/> */}
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

export default Search