import Vue from 'vue';
import Vuex from  'vuex';
import storage from "../storage/index"
Vue.use(Vuex);

const state={
     tokenr:storage.getData('token')||null
}

const mutations={
     addtoken(state,token){
          state.tokenr=token
           storage.setData('token',state.tokenr)
     }
}

export default new Vuex.Store({
    state,mutations
})