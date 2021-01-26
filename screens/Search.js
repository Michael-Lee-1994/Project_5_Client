import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
 
import { search, clearSearch, updatePage } from "../redux/actions";

// const Search = ({navigation}) => {

const mapStateToProps = (state) => ({
  searchReducer: state.searchReducer,
  arrayResults: state.searchReducer.arrayResults,
  currentPage: state.searchReducer.currentPage,
  pageCap: state.searchReducer.pageCap
})

class Search extends Component {
  state = {
    search: "",
    activeIndex:0
  }

  componentDidMount() {
    //change to just clear
    this.props.clearSearch()
  }
 
  _renderItem = ({item, index}) => {
    // console.log("item",item)
    return (
      <Card style={styles.card}>
        <Card.Title titleStyle={styles.cardTitle} title={item.Title}/>
        <Card.Cover style={styles.image} source={{uri: `${item.Poster}`}}/>
      </Card>
    );
  }

  async fetchSearch(value) {
    console.log("currentPage in fetch", this.props.currentPage)
    this.props.search(value, this.props.currentPage)
  }
  
  async nextPage(value) {
    await this.props.updatePage()
    console.log("currentPage in updatepage", this.props.currentPage)
    this.fetchSearch(value)
  }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput
            placeholder="Search"
              // style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(search) => {
              this.setState({ search })
            }}
            />
            <Button title="Search" onPress={() => {this.fetchSearch(this.state.search)}}/>
          </View>

          <View style={styles.carousel}>
          {this.props.arrayResults ? 
            ( 
            <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.props.arrayResults}
              sliderWidth={400}
              itemWidth={400}
              itemHeight={600}
              sliderHeight={600}
              renderItem={this._renderItem}
              onSnapToItem = { index => this.setState({activeIndex:index}) }
              /> 
            ) : null
          }
          </View>
          {this.props.arrayResults.length > 0 ? 
            this.props.pageCap >= this.props.currentPage ? 
              <View style={styles.button}>
              <Button title="More Results" onPress={() => {this.nextPage(this.state.search)}}/> 
  
            </View>: <Text>No More Results</Text>
          : null
          }
        </View>
      );
    }

}


export default connect(mapStateToProps, { search , clearSearch , updatePage })(Search)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    // paddingLeft: 20,
    color: '#05375a',
  },
  carousel: {
    position: "absolute",
    height: 600
  },
  searchBar: {
    position: "absolute",
    top: 10,
  },
  card: {
    backgroundColor:'#f5f0f0',
    borderRadius: 5,
    height: 500,
    shadowColor: '#00e7fc',
    shadowOffset: {
        width: 0,
        height: 15
    },
    shadowOpacity: .99,
    shadowRadius: 16,
    elevation: 24,
    marginLeft: 25,
    marginRight: 25, 
  },
  image: {
    width: '100%', 
    height: '100%'
  },
  cardTitle: {
    fontSize: 20,
    flex: .1,
    flexWrap: "wrap",
    height: 10,
    justifyContent: 'center'
  },
  button: {
    position: "absolute",
    bottom: 10,
  }
});