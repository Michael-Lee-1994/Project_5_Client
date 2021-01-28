import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Button , Image, View} from 'react-native';
import { Text, Caption, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';

import { addToWatchList } from "../redux/actions";

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
    currentUser: state.authReducer.currentUser,
    arrayResults: state.searchReducer.arrayResults,
    watchedList: state.authReducer.watchedList,
    favorites: state.authReducer.favorites,
    watchList: state.authReducer.watchList
  })

const Details = ({navigation, route, addToWatchList, currentUser , authReducer, watchedList, favorites, watchList  }) => {
    const {Poster, Title, Runtime, Released, Genre, Rated, Language, Director, Type, imdbRating, Plot} = route.params.results
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase()+str.slice(1)
    }
    const toWatchList = async ( id, type, title, genre, plot, poster, runtime) => {
        await addToWatchList(id, type, title, genre, plot, poster, runtime)
        await console.log("watchedlist", watchedList)
        await console.log("fav", favorites)
        await console.log("watchlist", watchList)
        await alert("Added to your list")
    }

    const toWatchedList = () => {
        
    }

    const toFavorites = () => {
        
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.image} source={{uri: `${Poster}`}}/> 
            <View>
                <Text style={styles.title}>{Title}</Text>
                <View style={styles.length}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Length:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {parseInt(parseInt(Runtime)/60)} hrs {parseInt(parseInt(Runtime)% 60)} mins
                    </Caption>
                </View>

                <View style={styles.released}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Released:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                        {Released}
                    </Caption>
                </View>

                <View style={styles.genre}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Genre:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {Genre}
                    </Caption>
                </View>

                <View style={styles.rated}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Rated:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {Rated}
                    </Caption>
                </View>

                <View style={styles.language}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Language:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {Language}
                    </Caption>
                </View>

                <View style={styles.director}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                        Director:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {Director}
                    </Caption>
                </View>

                <View style={styles.rating}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Rating:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {imdbRating}
                    </Caption>
                </View>

                <View style={styles.type}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Type:   
                    </Paragraph>
                    <Caption style={styles.caption}>
                    {capitalize(Type)}
                    </Caption>
                </View>

                <View style={styles.plot}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>
                        Plot:   
                    </Paragraph>
                </View>

                <View style={styles.plotContent}>
                    <Caption style={styles.caption}>
                    {Plot}
                    </Caption>
                </View>
            </View>
            <View style={styles.bb}>
                <Button title="Add to Watch List" onPress={()=>{toWatchList(currentUser.id, Type, Title, Genre, Plot, Poster, Runtime)}}/>
            </View>
            {/* <View style={styles.bc}>
                <Button title="Add to Watched List" onPress={()=>{toWatchedList()}}/>
            </View>
            <View style={styles.bd}>
                <Button title="Add to Favorites" onPress={()=>{toFavorites()}}/>
            </View> */}
            {/* <StatusBar style="auto" /> */}
            {/* <Button title="soidhaidho" onPress={() => something()}/> */}
        </ScrollView>
    );
}

export default connect(mapStateToProps, { addToWatchList })(Details) ;

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      backgroundColor: '#fff',
      height: '110%'
    },
    title: {
        top: 300,
        left: 20,
        fontWeight:'bold',
        fontSize: 30
    },
    image: {
        position: 'absolute',
        height: 300,
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
        top: 310,
        flexDirection: 'row',
        alignItems: 'center',
        left: '90%',
    },
    released: {
        top: 293, 
        flexDirection: 'row',
        alignItems: 'center',
        left: '15%',
    },
    genre: {
        top: 401,
        flexDirection: 'row',
        // alignItems: 'center',
        left: '15%',
        width: '70%'
    },
    rated: {
        top: 338, 
        flexDirection: 'row',
        alignItems: 'center',
        left: '60%',
    },
    language: {
        top: 254,
        flexDirection: 'row',
        alignItems: 'center',
        left: '15%',
    },
    director: {
        top: 269.5, 
        flexDirection: 'row',
        alignItems: 'center',
        left: '15%',
    },
    rating: {
        top: 284,
        flexDirection: 'row',
        alignItems: 'center',
        left: '101%',
    },
    type: {
        top: 266, 
        flexDirection: 'row',
        alignItems: 'center',
        left: '15%',
    },
    plot: {
        top: 319,
        flexDirection: 'row',
        alignItems: 'center',
        left: '71%',
    },
    plotContent: {
        top: 315,
        flexDirection: 'row',
        alignItems: 'center',
        left: '17.5%',
        width: '85%'
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


//an async iife lol
// (async () => {  
//     something()
//     // await singleSearch(route.params.id)
//     // console.log(singleResults)   
// })()
