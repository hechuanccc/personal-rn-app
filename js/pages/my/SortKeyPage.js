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
    TouchableOpacity,
    Alert
} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import CustomKeyPage from "./CustomKeyPage";
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import ArrayUtils from '../../util/ArrayUtils'
import SortableListView from 'react-native-sortable-listview'
import ViewUtils from '../../util/ViewUtils'

export default class SortKeyPage extends Component {
    constructor(props){
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state={
            checkedArray: []
        }
    }
    componentDidMount() {

        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.loadData()
    }
    loadData() {
        this.languageDao.fetch()
            .then((result) => {
                console.log('本地数据 flag_key')
                console.log(result)
                this.getCheckedItems(result)
            })
            .catch(error => {
                console.log(error)
                console.log('error in loadData')
            })
    }
    getCheckedItems(result) {
        this.dataArray = result
        console.log('dataArray ')
        console.log(this.dataArray)
        let checkedArray = []
        for(let i=0,len=result.length;i<len;i++) {
            let data = result[i]
            if (data.checked) {
                checkedArray.push(data)
            }
        }
        console.log('getCheckedItems')
        console.log(checkedArray)
        this.setState({
            checkedArray: checkedArray
        })
        console.log('checkedArray')
        console.log(checkedArray)
        this.originalCheckedArray = ArrayUtils.clone(checkedArray)
        console.log('clone originalCheckedArray')
        console.log(this.originalCheckedArray)
    }
    onBack() {
        console.log('触发 回退按钮')
        console.log('没有移动？ ' + ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray))
        if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigator.pop()
            return
        }

        Alert.alert(
            '提示',
            '是否保存修改？',
            [
              {text: '不保存', onPress: () => {
                    this.props.navigator.pop()
              }, style: 'cancel'},
              {text: '保存', onPress: () => {this.onSave(true)}},
            ]
        )
    }
    onSave(isChecked) {
        if (!isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            console.log(1)
            this.props.navigator.pop()
            return
        }
        this.getSortResult();
        console.log('onSave this.sortResultArray')
        console.log(this.sortResultArray)
        this.languageDao.save(this.sortResultArray)
        this.props.navigator.pop()
    }
    getSortResult() {
        this.sortResultArray = ArrayUtils.clone(this.dataArray)
        for(let i=0,l=this.originalCheckedArray.length;i<l;i++) {
            let item = this.originalCheckedArray[i]
            let index = this.dataArray.indexOf(item)
            this.sortResultArray.splice(index,1,this.state.checkedArray[i])
        }
    }
    render() {
        let rightButton = <TouchableOpacity onPress={() => this.onSave()}>
                <View style={{margin: 10}}>
                    <Text style={styles.title}>保存</Text>
                </View>
            </TouchableOpacity>
        var navigationBar =
            <NavigationBar
                style={{backgroundColor: '#6495ED'}}
                title='我的'
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                rightButton={rightButton}
                statusBar={{
                    paddingTop:10
                }}/>;
        return (
                <View style={{flex:1}}>
                    {navigationBar}
                    <SortableListView
                        style={{flex: 1}}
                        data={this.state.checkedArray}
                        order={Object.keys(this.state.checkedArray)}
                        onRowMoved={e => {
                            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                            this.forceUpdate();
                        }}
                        renderRow={row => <SortCell data={row} {...this.props} />}
                    />
                </View>
        );
    }

}

class SortCell extends Component {
    render() {
        return (
            <TouchableHighlight
               underlayColor={'#eee'}
               delayLongPress={500}
               style={styles.item}
               {...this.props.sortHandlers}
             >
                <View style={styles.row}>
                    <Image 
                        source={require('./img/ic_sort.png')}
                        style={styles.image}
                    />
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: "#F8F8F8",
        borderBottomWidth:1,
        borderColor: '#eee'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        tintColor: '#2196F3',
        height: 16,
        width:16,
        marginRight: 10
    },
    title: {
        color: 'white',
        fontSize: 18
    },
})