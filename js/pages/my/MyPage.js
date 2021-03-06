/**
 * 我的页面
 * @flow
 * **/
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    ScrollView,
    TouchableHighlight,
    DeviceEventEmitter
} from "react-native";
import NavigationBar from "../../common/NavigationBar";
// import {MORE_MENU} from "../../common/MoreMenu";
// import BaseComponent from '../BaseComponent'
import CustomKeyPage from "./CustomKeyPage";
import SortKeyPage from "./SortKeyPage";
// import SortKeyPagePage from "./SortKeyPagePage";
// import {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
// import GlobalStyles from '../../../res/styles/GlobalStyles'
// import CustomThemePage from './CustomTheme'
// import ViewUtils from '../../util/ViewUtils'
// import AboutPage from '../about/AboutPage'
// import AboutMePage from '../about/AboutMePage'

export default class MyPage extends Component {
    constructor(props){
        super(props);
        this.state={
            customThemeViewVisible:false,
            theme:this.props.theme
        }
    }
    render() {
        var navigationBar =
            <NavigationBar
                style={{backgroundColor: '#6495ED'}}
                title='我的'
                statusBar={{
                    paddingTop:10
                }}/>;
        return (
            <View style={{flex:1}}>
                {navigationBar}
                <Text 
                    onPress={() => {
                        this.props.navigator.push({
                            component: CustomKeyPage
                        })
                    }}>自定义标签页</Text>
                <Text 
                    onPress={() => {
                        this.props.navigator.push({
                            component: SortKeyPage
                        })
                    }}>标签排序</Text>
                <Text 
                    onPress={() => {
                        this.props.navigator.push({
                            component: CustomKeyPage,
                            params: {
                                ...this.props,
                                isRemoveKey: true
                            }
                        })
                    }}>标签移除</Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
})