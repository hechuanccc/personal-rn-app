/**
 * RespositoryDao
 * @flow
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';
import keysData from '../../../res/data/keys.json'
import langsData from '../../../res/data/langs.json'


export var FLAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'}

export default class LanguageDao {
    constructor(flag) {
        this.flag = flag
    }
    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
               if(error){
                   reject(error);
                   return;
               } else if (result) {
                   try {
                       resolve(JSON.parse(result))
                   } catch(e) {
                       reject(e)
                   }
               } else {
                   var data=this.flag===FLAG_LANGUAGE.flag_key? keysData:langsData;
                   this.save(data);
                   resolve(data);
               }
            })
        }) 
    }
    save(objectData){
        var stringData=JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag,stringData,(error,result)=>{

        });
    }
    clear(){
        AsyncStorage.removeItem(this.flag,(error) => {
            if (!error) {
                console.log('删除字段 ' + this.flag + 'successfully')
            } else {
                console.log(error)
            }
        })
    }
}