import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  RefreshControl,
  ListView
} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell'

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&page=stars';

export default class PopularPage extends Component{
  constructor(props){
    super(props);
    // 类初始化后才能在自定义函数方法中调用
  }
  render(){
    return (<View style={styles.container}>
      <NavigationBar
        title={'最热'}
          statusBar={{
            paddingTop:10
          }}
      ></NavigationBar>
      <ScrollableTabView
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            tabBarInactiveTextColor="mintcream"
            tabBarBackgroundColor="#2196F3"
            renderTabBar={()=><ScrollableTabBar/>}>
            <PopularTab tabLabel='ios'>ios</PopularTab>
            <PopularTab tabLabel='android'>android</PopularTab>
            <PopularTab tabLabel='java'>java</PopularTab>
            <PopularTab tabLabel='javascript'>js</PopularTab>
    </ScrollableTabView>
    </View>);
  }
}

class PopularTab extends Component {
  constructor(props){
    super(props);
    // 类初始化后才能在自定义函数方法中调用
    this.dataRepository=new DataRepository();
    this.state={
      result:'',
      dataSource: new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2}),
      isLoading: false
    };
  }
  componentDidMount() {
    this.loadData()
  }
  loadData(){
    this.setState({
      isLoading: true
    })
    let url = URL + this.props.tabLabel + QUERY_STR;
    this.dataRepository.fetchNetRepository(url)
    .then(result=>{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result.items),
        isLoading: false
      });
    })
    .catch(error=>{
      console.log(error)
    });
  }
  renderRow(data) {
    return <RepositoryCell data={data}/>
  }
  render() {
    return <View style={{flex:1}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => this.renderRow(data)}
        refreshControl={
          <RefreshControl 
            refreshing={this.state.isLoading}
            onRefresh={() => this.loadData()}
            colors={['#2196F3']}
            tintColor={'#2196F3'}
            title={'Loading...'}
            titleColor={'#2196F3'}
          />
        }
      />
    </View>
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1
  }
})
