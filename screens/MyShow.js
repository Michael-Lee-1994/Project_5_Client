import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Button , Image, View, TextInput} from 'react-native';
import { Text, Caption, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';

import { updateFavorite, updateWatch } from "../redux/actions";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
    currentUser: state.authReducer.currentUser,
    arrayResults: state.searchReducer.arrayResults,
    watchedList: state.authReducer.watchedList,
    favorites: state.authReducer.favorites,
    watchList: state.authReducer.watchList
  })

const MyShow = ({navigation, route, updateFavorite, updateWatch }) => {

const {poster, title, length, plot, genre} = route.params.item.media
const {current_episode, currently_watching, favorite, reviews, id} = route.params.item
    
const favoritePatch = async (id, favorite) => {
    // console.log("int patch")
    await updateFavorite(id, favorite)
}

const watchPatch = async (id, currently_watching) => {
    // console.log("int patch")
    await updateWatch(id, currently_watching)
}

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.image} source={{uri: `${poster}`}}/> 
            <View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.length}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Length:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {parseInt(parseInt(length)/60)} hrs {parseInt(parseInt(length)% 60)} mins
                    </Caption>
                </View>

                <View style={styles.genre}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Genre:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {genre}
                    </Caption>
                </View>

                <View style={styles.plot}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Plot:   
                    </Paragraph>
                </View>

                <View style={styles.plotContent}>
                    <Caption style={styles.caption}>
                    {plot}
                    </Caption>
                </View>

                <View style={styles.heart}>
                    { favorite ? 
                        <Icon
                            name="heart"
                            color="red"
                            size={40}
                        /> :
                        <Icon
                        name="heart-o"
                        color="red"
                        size={40}
                        /> 
                    }
                     <Button
                    title= {favorite ? "Remove from favorite" : "Add to favorites"}
                    onPress={() => {favoritePatch(id, favorite)}}
                    />
                </View>

                <View style={styles.watch}>
                    { currently_watching ? 
                        <Icon
                            name="eye"
                            color="grey"
                            size={40}
                        /> :
                        <Icon
                            name="eye-slash"
                            color="grey"
                            size={40}
                        /> 
                    }
                    <Button
                    title= {currently_watching ? "Remove from currently watching" : "Add to currently watching"}
                    onPress={() => {watchPatch(id, currently_watching)}}
                    />
                </View>

                <View style={styles.noteTite}>
                    <Text style={{fontSize: 15}}> Notes</Text>
                </View>  

                <View style={styles.note}>
                    {reviews[0] ? 
                        <TextInput
                            value={reviews[0].notes}
                        /> :
                        <Button 
                            title="Add a note"
                            onPress={() => {alert("Hey")}}
                        />
                    }
                </View>          
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { updateFavorite , updateWatch})(MyShow) ;

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      backgroundColor: '#fff',
      height: '130%'
    },
    title: {
        position: 'absolute',
        top: 425,
        left: 20,
        fontWeight:'bold',
        fontSize: 20
    },
    image: {
        position: 'absolute',
        height: '43%',
        width: '100%'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    length: {
        position: 'absolute',
        top: 460,
        flexDirection: 'row',
        alignItems: 'center',
        left: '33%',
    },
    genre: {
        position: 'absolute',
        top: 480,
        flexDirection: 'row',
        // alignItems: 'center',
        left: '15%',
        width: '70%'
    },
    plot: {
        position: 'absolute',
        top: 510,
        flexDirection: 'row',
        alignItems: 'center',
        left: '45%',
    },
    plotContent: {
        position: 'absolute',
        top: 530,
        flexDirection: 'row',
        alignItems: 'center',
        left: '11.5%',
        width: '85%'
    },
    heart: {
        position: 'absolute',
        top: 600,
        flexDirection: 'row',
        alignItems: 'center',
        left: '11.5%',
        width: '85%'  
    },
    watch: {
        position: 'absolute',
        top: 650,
        flexDirection: 'row',
        alignItems: 'center',
        left: '11.5%',
        width: '85%'  
    },
    noteTite:{
        position: 'absolute',
        top: 700,
        flexDirection: 'row',
        alignItems: 'center',
        left: '11.5%',
        width: '85%'  
    },
    note: {
        position: 'absolute',
        top: 720,
        flexDirection: 'row',
        alignItems: 'center',
        left: '11.5%',
        width: '85%',
        height: 100,
        backgroundColor: 'grey'
    },
    bb: {
        top: 380 
    },
    bc: {
        top: 350 
    },
    bd: {
        top: 360 
    }

});