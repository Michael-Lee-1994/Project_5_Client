import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { connect } from 'react-redux';
import {  } from "../redux/actions";

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  currentUser: state.authReducer.currentUser,
  watchedList: state.authReducer.watchedList,
  favorites: state.authReducer.favorites,
  watchList: state.authReducer.watchList
})

class Home extends Component {
  componentDidMount() {
    // console.log("watchedList", this.props.watchedList)
  }
  state = {
    activeWatchedIndex: 0,
    activeWatchIndex: 0,
    activeFavoriteIndex: 0
  }

  _renderWatchedItem = ({item, index}) => {
    return (
      <Card style={styles.card} item={item} onPress={() => {this.navigateMyShow(item)}}>
        <Card.Cover style={styles.image} source={{uri: `${item.media.poster}`}}/>
      </Card>
    );
  }

  _renderWatchItem = ({item, index}) => {
    return (
      <Card style={styles.card} item={item} onPress={() => {this.navigateMyShow(item)}}>
        <Card.Cover style={styles.image} source={{uri: `${item.media.poster}`}}/>
      </Card>
    );
  }

  _renderFavoriteItem = ({item, index}) => {
    return (
      <Card style={styles.card} item={item} onPress={() => {this.navigateMyShow(item)}}>
        <Card.Cover style={styles.image} source={{uri: `${item.media.poster}`}}/>
      </Card>
    );
  }

  async navigateMyShow (item) {
    //so instead of sending/setting props refactor to have a state of selected item and send that instead
    this.props.navigation.navigate("MyShow", {item: item})
  } 

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={true} automaticallyAdjustContentInsets={true} contentContainerStyle={styles.container} >
        <View style={styles.watchedCarousel}>
        {this.props.watchedList ? 
          ( 
            <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.props.watchedList}
              itemWidth={250}
              // itemHeight='100%'
              sliderWidth={430}
              // sliderHeight={0}
              renderItem={this._renderWatchedItem}
              onSnapToItem = { index => this.setState({activeWatchedIndex:index}) }
              /> 
          ) : null
          }
        </View>

        <View style={styles.watchedText}>
          <Text style={{fontSize: 20, fontWeight:"bold"}}>
            Watched List
          </Text>
        </View>

        <View style={styles.watchCarousel}>
        {this.props.watchList ? 
          ( 
            <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.props.watchList}
              itemWidth={250}
              // itemHeight='100%'
              sliderWidth={430}
              // sliderHeight={0}
              renderItem={this._renderWatchItem}
              onSnapToItem = { index => this.setState({activeWatchIndex:index}) }
              /> 
          ) : null
          }
        </View>

        <View style={styles.watchText}>
          <Text style={{fontSize: 20, fontWeight:"bold"}}>
            Currently Watching
          </Text>
        </View>

        <View style={styles.favoritesCarousel}>
        {this.props.favorites ? 
          ( 
            <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.props.favorites}
              itemWidth={250}
              // itemHeight='100%'
              sliderWidth={430}
              // sliderHeight={0}
              renderItem={this._renderFavoriteItem}
              onSnapToItem = { index => this.setState({activeFavoriteIndex:index}) }
              /> 
          ) : null
          }
        </View>

        <View style={styles.favoriteText}>
          <Text style={{fontSize: 20, fontWeight:"bold"}}>
            Favorites
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, { })(Home)

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "203%",
    width:'100%'
  },
  card: {
    height: '100%',
    width: '100%'
  },
  watchedCarousel: {
    position: "absolute",
    top: "0%",
    height: 400,
    width: 440,
  },
  watchedText: {
    left: '36%',
    justifyContent: 'center', 
    position:'absolute', 
    top: '29.3%', 
    width:'100%'
  },
  watchCarousel: {
    position: "absolute",
    top: '33.333%',
    height: 400,
    width: 440,
  },
  watchText: {
    left: '28%',
    justifyContent: 'center', 
    position:'absolute', 
    top: '62.3%', 
    width:'100%'
  },
  favoritesCarousel: {
    position: "absolute",
    top: '66.667%',
    height: 400,
    width: 440,
  },
  favoriteText: {
    left: '37%',
    justifyContent: 'center', 
    position:'absolute', 
    top: '95.3%', 
    width:'100%'
  },
  image: {
    height: '100%',
    width: '100%'
}
});