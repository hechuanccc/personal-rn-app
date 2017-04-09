import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Navigator,
  Image
} from 'react-native';
import WelcomePage from './WelcomePage'

function setup() {
	// init some config
	class Root extends Component {
		renderScene(route, navigator) {
			let Component = route.component;
			return <Component navigator={navigator} {...route.params} />
		}
		render() {
			return (
				<Navigator
					initialRoute={{component: WelcomePage}}
					renderScene={(route, navigator) => this.renderScene(route, navigator)} />
			)
		}
	}

	return <Root/>
}

module.exports = setup