import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TextInput, Image} from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import { CheckBox } from 'react-native-elements'

import { searchAnime, clearSearchAnime, updatePageAnime,  singleSearchAnime } from "../redux/actions";

const mapStateToProps = (state) => ({
  searchAnimeReducer: state.searchAnimeReducer,
  arrayResultsAnime: state.searchAnimeReducer.arrayResultsAnime,
  currentPageAnime: state.searchAnimeReducer.currentPageAnime,
  pageCapAnime: state.searchAnimeReducer.pageCapAnime,
  singleSearchIdAnime: state.searchAnimeReducer.singleSearchIdAnime,
  singleResultsAnime: state.searchAnimeReducer.singleResultsAnime,
  nextSearchLink: state.searchAnimeReducer.nextSearchLink
})

class Anime extends Component {
  state = {
    input: "",
    activeIndex:0,
    search: "", 
    searchPressed: false,
    morePressed: false
  }

  componentDidMount() {
    //change to just clear
    // console.log("MY page cap", this.props.pageCapAnime)
    // this.props.clearSearchAnime()
  }

  _renderItem = ({item, index}) => {
    // console.log("item",item.attributes)
    return (
      <Card style={styles.card} onPress={() => {this.fetchSingleAnimePage(item.imdbID)}}>
        <Card.Title titleStyle={styles.cardTitle} title={item.attributes.titles.en? item.attributes.titles.en : item.attributes.titles.en_jp}/>
        <Card.Cover style={styles.image} source={{uri: `${item.attributes.posterImage.large}`}}/>
      </Card>
    );
  }

    async fetchAnimeSearch(input, search) {
    if(input === "") {
      alert("Search is empty")
    } else if(search === "") {
      await this.setState({ search: input, searchPressed: false})
      await this.props.searchAnime(this.state.search)
    } else if (this.state.input === this.state.search && this.state.searchPressed === false && this.state.morePressed === true ) {
      console.log("more search")
      await this.setState({morePressed: false})
      await this.props.searchAnime(this.state.search, this.props.nextSearchLink)
    } else {
      console.log("in else?")
      this.setState({
        search: input,
        searchPressed: false,
        morePressed: false
      })
      await this.props.clearSearchAnime()
      await this.props.searchAnime(this.state.search, this.props.currentPageAnime)
    }
  }

  async fetchSingleAnimePage(id) {
    await this.props.singleSearchAnime(id)
    this.navigateAnimeDetails()
  }
  
  async navigateAnimeDetails () {
    // console.log("result", this.props.singleResults)
    // this.props.navigation.navigate("Details", {results: this.props.singleResults})
  } 

  async nextAnimePage(value) {
    await this.props.updatePageAnime()
    // console.log("currentPage in ANimeupdatePageAnime", this.props.currentPage)
    this.fetchAnimeSearch(value)
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
                this.fetchAnimeSearch(this.state.input, this.state.search)
                }}/>
            </View>
          </View>
        </View>

        <View style={styles.carousel}>
        {this.props.arrayResultsAnime ? 
          ( 
          <Carousel
            layout={"default"}
            ref={ref => this.carousel = ref}
            data={this.props.arrayResultsAnime}
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
        {this.props.arrayResultsAnime.length > 0 && this.state.input === this.state.search ? 
          this.props.pageCapAnime >= this.props.currentPageAnime ? 
            <View style={styles.button}>
            <Button title="More Results" onPress={() => {
              this.setState({morePressed: true})
              this.nextAnimePage(this.state.search)
              }}/> 

          </View>: <Text>No More Results</Text>
        : null
        }
      </View>
    );
  }
}

export default connect(mapStateToProps, { searchAnime, clearSearchAnime, updatePageAnime, singleSearchAnime})(Anime);

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
    // position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    // left: 100,
    backgroundColor: '#e8eaeb',
    width: '150%',
    height: 59
  },
  searchBtn: {
    left: -50
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