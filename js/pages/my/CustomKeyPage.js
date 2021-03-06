/**
 * 添加Trending语言,Popular 关键字
 * @flow
 * **/

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Image,
    Text,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import CheckBox from 'react-native-check-box'
import NavigationBar from '../../common/NavigationBar'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
// import BackPressComponent from '../../common/BackPressComponent'
import ArrayUtils from '../../util/ArrayUtils'
import ViewUtils from '../../util/ViewUtils'
// import {ACTION_HOME,FLAG_TAB} from '../HomePage'
export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        // this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)});
        this.changeValues = [];
        this.isRemoveKey=this.props.isRemoveKey?true:false;
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.state = {
            dataArray: []
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        this.languageDao.fetch()
            .then((result) => {
                console.log('keyData')
                console.log(result)
                this.setState({
                    dataArray: result
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    onSave() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop()
            return
        }
        console.log('存之前的dataArray')
        console.log(this.state.dataArray)
        if(this.isRemoveKey){
            for(let i=0,l=this.changeValues.length;i<l;i++){
                ArrayUtils.remove(this.state.dataArray,this.changeValues[i]);
            }
        }
        console.log('存之后的dataArray')
        console.log(this.state.dataArray)
        this.languageDao.save(this.state.dataArray)
        this.props.navigator.pop()
    }
    onClick(data) {
        if(!this.isRemoveKey)data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data)
    }
    onBack() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop()
            return
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
              {text: '不保存', onPress: () => {
                    this.props.navigator.pop()
              }, style: 'cancel'},
              {text: '保存', onPress: () => {this.onSave()}},
            ]
        )
        this.props.navigator.pop()
    }
    renderCheckBox(data) {
        let leftText = data.name
        let isChecked = this.isRemoveKey ? false : data.checked
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                leftText={leftText}
                isChecked={isChecked}
                checkedImage={<Image
                    source={require('./img/ic_check_box.png')} />}
                unCheckedImage={<Image
                    source={require('./img/ic_check_box_outline_blank.png')} />}
                onClick={() => {
                    this.onClick(data)
                }} />
        )
    }


    renderView() {
        let len = this.state.dataArray.length
        if (!this.state.dataArray || len===0) return null
        let views = []
        for(let i=0,l=len-2;i<l;i+=2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len-2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views

    }
    render() {
        let rightButtonTitle=this.isRemoveKey? '移除':'保存';
        let rightButton = <TouchableOpacity onPress={() => this.onSave()}>
                <View style={{margin: 10}}>
                    <Text style={styles.title}>{rightButtonTitle}</Text>
                </View>
            </TouchableOpacity>
        let title=this.isRemoveKey? '标签移除':'自定义标签';
        // title=this.props.flag===FLAG_LANGUAGE.flag_language?'自定义语言':title;
        let navigationBar = <NavigationBar
                title={title}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                rightButton={rightButton}
                style={{backgroundColor: '#6495ED'}}
                statusBar={{
                    paddingTop:10
                }}
            />;
            
        return (
            <View style={styles.container}> 
                {navigationBar}
                <ScrollView>
                   {this.renderView()}
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    title: {
        color: 'white',
        fontSize: 18
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})