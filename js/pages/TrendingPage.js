import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  RefreshControl,
  DeviceEventEmitter,
  ListView
} from 'react-native';
import RepositoryDetail from './RepositoryDetail'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository, { FLAG_STORAGE} from '../expand/dao/DataRepository';
import TrendingCell from '../common/TrendingCell'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'

const API_URL='https://github.com/trending/';

export default class TrendingPage extends Component{
  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language)
    // 类初始化后才能在自定义函数方法中调用
    this.state = {
      languages: [],
      result: ''
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
      this.languageDao.clear()
      this.languageDao.fetch()
          .then((result) => {
              console.log('keyData')
              console.log(result)
              this.setState({
                  languages: result
              })
          })
          .catch((error) => {
              console.log(error)
          })
  }

  render(){
    let content = this.state.languages.length > 0 ? <ScrollableTabView
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            tabBarInactiveTextColor="mintcream"
            tabBarBackgroundColor="#2196F3"
            renderTabBar={()=><ScrollableTabBar/>}>

            {this.state.languages.map((result,i,arr) => {
                let lan = arr[i]
                return lan.checked ? <TrendingTab key={i} tabLabel={lan.name} {...this.props}></TrendingTab> : null
            })}
      </ScrollableTabView> : null
    return (<View style={styles.container}>
      <NavigationBar
        title={'趋势'}
          statusBar={{
            paddingTop:10
          }}
      ></NavigationBar>
      {content}
    </View>);
  }
}

class TrendingTab extends Component {
  constructor(props){
    super(props);
    // 类初始化后才能在自定义函数方法中调用
    this.dataRepository=new DataRepository(FLAG_STORAGE.flag_trending);
    this.state={
      result:'',
      dataSource: new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2}),
      isLoading: false
    };
  }
  componentDidMount() {
    this.loadData()
  }
  onSelect(item) {
    this.props.navigator.push({
      component: RepositoryDetail,
      params: {
        item: item,
        ...this.props
      }
    })
  }
  loadData(){
    this.setState({
      isLoading: true
    })
    let url = this.genFetchUrl('?since=daily', this.props.tabLabel)
    console.log('url ' + url)
    this.dataRepository.fetchRepository(url)
      .then(result=>{
          let items = result && result.items ? result.items : result ? result : []
          console.log('items')
          console.log(items)
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            isLoading: false
          });
          if (result && result.update_date && !this.dataRepository.checkData(result.update_date)) {
            DeviceEventEmitter.emit('showToast', '显示缓存数据')
            return this.dataRepository.fetchNetRepository(url)
          } else {
            DeviceEventEmitter.emit('showToast', '数据过时')
          }
      })
      .then(items => {
        if (!items || items.length === 0) return;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
        });
        DeviceEventEmitter.emit('showToast', '显示网络数据')
      })
      .catch(error=>{
          console.log(error)
      });
  }
  genFetchUrl(timeSpan, category) {
    return API_URL + category + timeSpan
  }
  renderRow(data) {
    return <TrendingCell 
              data={data}
              key={data.id}
              onSelect={() => this.onSelect(data)}
           />
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
