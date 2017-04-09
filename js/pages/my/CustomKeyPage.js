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
    Alert,
    Text,
    DeviceEventEmitter
} from 'react-native'
// import CheckBox from 'react-native-check-box'
import NavigationBar from '../../common/NavigationBar'
// import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
// import BackPressComponent from '../../common/BackPressComponent'
// import ArrayUtils from '../../util/ArrayUtils'
import ViewUtils from '../../util/ViewUtils'
// import {ACTION_HOME,FLAG_TAB} from '../HomePage'
export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        // this.backPress=new BackPressComponent({backPress:(e)=>this.onBackPress(e)});
        // this.changeValues = [];
        // this.isRemoveKey=this.props.isRemoveKey?true:false;
        this.state = {
            dataArray: []
        }
    }
    onBack() {
        this.props.navigator.pop()
    }
    render() {
        let rightButtonTitle=this.isRemoveKey? '移除':'保存';
        let title=this.isRemoveKey? '标签移除':'自定义标签';
        // title=this.props.flag===FLAG_LANGUAGE.flag_language?'自定义语言':title;
        let navigationBar =
            <NavigationBar
                title={'自定义标签'}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                style={{backgroundColor: '#6495ED'}}
                statusBar={{
                    paddingTop:10
                }}
            />;
        return (
            <View style={styles.container}> 
                {navigationBar}
                <ScrollView>
                   
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
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})