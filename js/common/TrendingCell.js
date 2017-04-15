import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview'

export default class TrendingCell extends Component{
    render() {
        let description = '<p>' + this.props.data.description + '</p>'
        return <TouchableOpacity 
                style={styles.container}
                onPress={this.props.onSelect}>
            <View style={styles.cell_container}>
                      <Text style={styles.title}>{this.props.data.fullName}</Text>
                      <HTMLView
                        value={description}
                        onLinkPress={(url) => {}}
                        stylesheet={{
                            p: styles.description,
                            a: styles.description
                        }}
                      />
                      <Text style={styles.description}>{this.props.data.meta}</Text>
                      <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.description}>Build by:</Text>
                            {this.props.data.contributors.map((result,i,arr) => {
                                return <Image
                                    key={i}
                                    style={{height: 22,width: 22}}
                                    source={{uri: arr[i]}}
                                />
                            })}
                        </View>
                        <Image style={{width: 22,height: 22}} source={require('../../res/images/ic_star.png')} />
                      </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 2
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        shadowColor:'gray',
        shadowOffset:{width:0.5,height: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2
    }
})