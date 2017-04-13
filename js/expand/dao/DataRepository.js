import {
    AsyncStorage,
} from 'react-native';

export default class DataRepository {
	fetchRepository(url) {
		return new Promise((resolve, reject) => {
			this.fetchLocalRepository(url)
				.then((result) => {
					if (result) {
						resolve(result)
					}else {
						this.fetchNetRepository(url)
							.then((result) => {
								resolve(result)
							})
							.catch((err) => {
								reject(err)
							})
					}
				})
				.catch(e => {
					this.fetchNetRepository(url)
						.then((result) => {
							resolve(result)
						})
						.catch((err) => {
							reject(err)
						})
				})
		})
	}
	fetchLocalRepository(url) {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem(url, (error, result) => {
				if (!error) {
					try {
						resolve(JSON.parse(result))
					} catch(e) {
						reject(e)
					}
				} else {
					reject(error)
				}
			})
		})
	}
	fetchNetRepository(url){
		let _this = this
		return new Promise((resolve, reject) => {
			fetch(url)
				.then(response => response.json())
				.then(result => {
					if (!result) {
						return reject(new Error('responseData is null'))
					}
					this.saveRepository(url, result.items, () => {
						console.log('存储成功')
					})
					resolve(result.items)
				})
				.catch(error => {
					reject(error)
				})
		})
	}
	saveRepository(url, items, cb) {
		if (!url || items.length === 0) return
		let wrapData = {items: items, update_date: new Date().getTime()}
		AsyncStorage.setItem(url, JSON.stringify(wrapData), cb)
	}
	checkData(longTime) {
		return false
		let cDate = new Date()
		let tDate = new Date()
		tDate.setTime(longTime)
		if (cDate.getMonth() !== tDate.getMonth()) return false
		if (cDate.getDay() !== tDate.getDay()) return false
		if (cDate.getHours() - tDate.getHours() > 4) return false
		return true
	}
	clear(url){
		AsyncStorage.removeItem(url,(error) => {
		    if (!error) {
		        console.log('删除字段 ' +url + 'successfully')
		    } else {
		        console.log(error)
		    }
		})
	}
}
