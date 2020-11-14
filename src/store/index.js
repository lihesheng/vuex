import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //原数组
    list:[],
    //为了实现输入文本双向绑定
    inputDefault:'请输入要添加的文本',
    //暂时定义的一个数据，因为原数据id最大是4
    nextId:5,
    //为了切换按钮的高亮定义
    stringKey:'all'
  },
  mutations: {
    //修改数据，并进行赋值
    initlist(state,list){
      state.list = list
    },

    //实时更新inputDafault的数据
    changeInputData(state,value){
      state.inputDefault = value
    },

    //实现数据的添加
    addItem(state){
      let obj = {
        //这里的id需要格外的注意
        id:state.nextId,
        info:state.inputDefault,
        done:false
      }
      state.list.push(obj)
      state.nextId ++
      state.inputDefault = ' '
      //console.log(state.nextId)
    },

    removeItem(state,id){
      let index = state.list.findIndex(item => item.id === id)  
      if(index == -1){
        throw new error('没有找到对应的索引')
      }
      state.list.splice(index,1)
      //console.log(index)
    },

    //修改state种的done属性
    changeItemDone(state,params){
      //根据id找出对应的索引
      const i = state.list.findIndex(item => item.id === params.id)
      //根据索引进行改值
      state.list[i].done = params.done
    },

    //清除已完成的事件
    deleteComplate(state){
      //这里还是折腾了好久，自己写的还是不如老师写的
      state.list = state.list.filter(item => item.done == false)
    },

    //点击实现高亮切换
    Allchange(state,key){
     state.stringKey = key
    },
    
  },
  actions: {
    //axios是异步操作
    getList(context){
      axios.get('./list.json').then(({data}) => {
        //console.log(data)
       context.commit('initlist',data)
      })
     }
  },
  modules: {

  },
  //计算还有多少条剩余
  getters:{
    unFailItem(state){
      return state.list.filter(item => item.done == false).length
    },
    //整个项目最后的操作
    infoList(state){
      if(state.stringKey === 'all'){
        return state.list
      }else if (state.stringKey === 'undone'){
        return state.list.filter(item => !item.done)
      }else if (state.stringKey === 'done') {
        return state.list.filter(item => item.done)
      }else {
        return state.list
      }
    }
  },
})
