import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { CheckBox } from 'react-native-elements'
 
import { search, clearSearch, updatePage,  singleSearch } from "../redux/actions";

// const Search = ({navigation}) => {

const mapStateToProps = (state) => ({
  searchReducer: state.searchReducer,
  arrayResults: state.searchReducer.arrayResults,
  currentPage: state.searchReducer.currentPage,
  pageCap: state.searchReducer.pageCap,
  singleSearchId: state.searchReducer.singleSearchId,
  singleResults: state.searchReducer.singleResults
})

class Search extends Component {
  state = {
    input: "",
    activeIndex:0,
    searchType: true,
    search: "", 
    searchPressed: false,
    morePressed: false
  }

  componentDidMount() {
    //change to just clear
    this.props.clearSearch()
  }
 
  _renderItem = ({item, index}) => {
    // console.log("item",item)
    return (
      <Card style={styles.card} onPress={() => {this.fetchSinglePage(item.imdbID)}}>
        <Card.Title titleStyle={styles.cardTitle} title={item.Title}/>
        <Card.Cover style={styles.image} source={{uri: `${item.Poster}`}}/>
        {/* <Card.Actions>
          <Button />
        </Card.Actions> */}
      </Card>
    );
  }

  async fetchSearch(input, search) {
    if(input === "") {
      alert("Search is empty")
    } else if(search === "") {
      await this.setState({ search: input, searchPressed: false})
      await this.props.search(this.state.search, this.props.currentPage, this.state.searchType)
    } else if (this.state.input === this.state.search && this.state.searchPressed === true) {
      //probs wont ever hit here 
      await this.props.search(this.state.search, this.props.currentPage, this.state.searchType)
    } else if (this.state.input === this.state.search && this.state.searchPressed === false && this.state.morePressed === true ) {
      await this.setState({morePressed: false})
      await this.props.search(this.state.search, this.props.currentPage, this.state.searchType)
    } else {
      console.log("in else?")
      this.setState({
        search: input,
        searchPressed: false,
        morePressed: false
      })
      await this.props.clearSearch()
      await this.props.search(this.state.search, this.props.currentPage, this.state.searchType)
    }
    // await s.props.search(search, this.props.currentPage, this.state.searchType)
    // console.log("currentPage in fetch", this.props.currentPage)
    // this.state.searchType ? this.props.search(value, this.props.currentPage, this.state.searchType) : this.props.search(value, this.props.currentPage, this.state.searchType)
  }

  async fetchSinglePage(id) {
    // console.log(id)
    // console.log("IN single page")
    // console.log(this.props.navigation)
    await this.props.singleSearch(id)
    this.navigateDetails()
  }
  
  async navigateDetails () {
    // console.log("result", this.props.singleResults)
    this.props.navigation.navigate("Details", {results: this.props.singleResults})
  } 

  async nextPage(value) {
    await this.props.updatePage()
    // console.log("currentPage in updatepage", this.props.currentPage)
    this.fetchSearch(value)
  }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <View style={styles.searchInput}>
              <TextInput
              placeholder="Search"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(input) => {
                this.setState({ input })
              }}
              />
              <View style={styles.searchBtn}>
                <Button title="Search" onPress={() => {
                  this.setState({searchPressed: true})
                  this.fetchSearch(this.state.input, this.state.search)
                  }}/>
              </View>
            </View>
            <View style={styles.checkBox}>
              <CheckBox 
              title={this.state.searchType ? "Movie Search" : "TV Search"}
              checked={this.state.searchType}
              onPress={ async () => {await this.setState({searchType: !this.state.searchType})}}
              /> 
            </View>
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
          {this.props.arrayResults.length > 0 && this.state.input === this.state.search ? 
            this.props.pageCap >= this.props.currentPage ? 
              <View style={styles.button}>
              <Button title="More Results" onPress={() => {
                this.setState({morePressed: true})
                this.nextPage(this.state.search)
                }}/> 
  
            </View>: <Text>No More Results</Text>
          : null
          }
        </View>
      );
    }

}


export default connect(mapStateToProps, { search , clearSearch , updatePage, singleSearch })(Search)

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
    left: 60,
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
  searchInput: {
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    left: -150,
    backgroundColor: '#e8eaeb',
    width: '150%',
    height: 59
  },
  searchBtn: {
    left: -50
  },
  checkBox: {
    // position: 'absolute',
    left: 130,
    backgroundColor: '#e8eaeb',
    width: '100%',
    height: 59
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