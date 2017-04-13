import React,{Component,PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  ListView,
  DeviceEventEmitter
} from 'react-native';
import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast'

var data={
  "statusCode": 0,
  "result": [
    {
      "email": "a.sdasd@adsdsa.com",
      "fullName": "张三张三张三张三"
    },
    {
      "email": "b.sdasd@adsdsa.com",
      "fullName": "李四李四"
    },
    {
      "email": "d.sdasd@adsdsa.com",
      "fullName": "王五王五王五"
    },
    {
      "email": "e.sdasd@adsdsa.com",
      "fullName": "王五王五王五"
    },
    {
      "email": "f.sdasd@adsdsa.com",
      "fullName": "王五王五王五"
    },
    {
      "email": "c.sdasd@adsdsa.com",
      "fullName": "王五王五王五"
    }
  ]
};

export default class ListViewTest extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data.result),
      isLoading: true
    }
    this.onLoad()
  }
  renderRow(item) {
    return <View style={styles.row}>
              <TouchableOpacity 
              onPress={() => {
                this.toast.show('你单击了: ' + item.fullName, DURATION.LENGTH_LONG)
              }}>
                <Text style={styles.tips}>{item.fullName}</Text>
                <Text style={styles.tips}>{item.email}</Text>
              </TouchableOpacity>
    </View>
  }
  renderSeparator(sectionID, rowID) {
    return <View key={rowID} style={styles.line}>

    </View>
  }
  renderFooter() {
    return <Image style={{width:400,height:100}} source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}/>
  }
  onLoad() {
    console.log('onload')
    let _this = this
    setTimeout(() => {
      _this.setState({
        isLoading: false
      })
    }, 3000)
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar title={'ListViewTest'}
         style={{
            backgroundColor:'#EE6363'
          }}
        />
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={(item) => this.renderRow(item)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator()}
          renderFooter={() => this.renderFooter()}
          refreshControl={<RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => this.onLoad()} />} 
          />
          <Toast ref={toast => {this.toast=toast}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  tips:{
    fontSize:22
  },
  row: {
    height: 50
  },
  line: {
    height: 1,
    backgroundColor: 'black'
  }
})
