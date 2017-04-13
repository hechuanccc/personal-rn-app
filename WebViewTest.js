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
import NavigationBar from './NavigationBar';
const URL = 'http://www.imooc.com/'
export default class WebViewTest extends Component{
  // 初始化构造函数
  constructor(props){
    super(props);
    this.state={
      url: URL,
      titile: '',
      canGoBack: false
    }
  }
  goBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    }else {
      DeviceEventEmitter.emit('showToast', '到顶了')
    }
  }
  go() {
    this.setState({
      url: this.text
    })
  }
  onNavigationStateChange(e) {
      console.log(e)
      this.setState({
        canGoBack: e.canGoBack,
        title: e.title
      })
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar title={'WebViewTest'}
          statusBar={{
            backgroundColor:'#EE6363',
            paddingTop: 10
          }}
          style={{
            backgroundColor:'#EE6363'
          }}
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
