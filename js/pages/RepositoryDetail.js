import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  WebView,
  TextInput,
  DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../util/ViewUtils'
const URL = 'http://www.imooc.com/'
export default class RepositoryDetail extends Component{
  // 初始化构造函数
  constructor(props){
    super(props);
    this.url = this.props.item.html_url
    let title = this.props.item.full_name
    this.state={
      url: this.url,
      title: title,
      canGoBack: false
    }
  }
  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    }else {
      this.props.navigator.pop()
    }
  }
  go() {
    this.setState({
      url: this.text
    })
  }
  onNavigationStateChange(e) {
      this.setState({
        canGoBack: e.canGoBack,
        url: e.url
      })
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar title={this.state.title}
          statusBar={{
            backgroundColor:'#EE6363',
            paddingTop: 10
          }}
          style={{
            backgroundColor:'#EE6363'
          }}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
        />
        <View style={styles.row}>
          <Text 
            style={styles.tips}
            onPress={() => {
                this.goBack()
            }}
            >返回</Text>
          <TextInput
            style={styles.input}
            defaultValue={URL}
            onChangeText={text => this.text=text} />
          <Text 
            style={styles.tips}
            onPress={() => {
                this.go()
            }}
            >前往</Text>
        </View>
        <WebView
          ref={webView=>this.webView = webView}
          source={{uri: this.state.url}}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
          startInLoadingState={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  tips:{
    fontSize:20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    margin: 2
  }
})
