<template>
  <div id="app">
    <a-input placeholder="请输入任务" @change="getValue" :value="inputDefault" class="my_ipt" />
    <a-button type="primary" @click="addEvent">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <!-- :checked是复选框选中 -->
        <a-checkbox :checked='item.done' @change="(e) => {changeStatus(e,item.id)}">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeEvent(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unFailItem}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="stringKey === 'all' ? 'primary' : 'default'" @click="All('all')">全部</a-button>
          <a-button :type="stringKey === 'undone' ? 'primary' : 'default'" @click="All('undone')">未完成</a-button>
          <a-button :type="stringKey === 'done' ? 'primary' : 'default'" @click="All('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="deleComplate">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import {mapState , mapGetters} from 'vuex'
export default {
  name: "app",
  data() {
    return {};
  },
  //请求数据
  created(){
    this.$store.dispatch('getList')
  },
  //挂载属性
  computed:{
    /* 在最后一步要将这里来替换 list 换成 infoList */
    // ...mapState(['list','inputDefault','count','stringKey']),
    ...mapState(['inputDefault','count','stringKey']),
    ...mapGetters(['unFailItem','infoList'])
  },
  methods:{
    //获取文本框种的值
    getValue(e){
      //console.log(e.target.value)
      this.$store.commit('changeInputData',e.target.value)
    },
    //数据的添加
    addEvent(){
      this.$store.commit('addItem')
    },
    //删除数据
    removeEvent(id){
      this.$store.commit('removeItem',id)
    },
    //改变复选框状态
    changeStatus(e,id){
      //console.log(e.target.checked)
      const params = {
        id:id,
        done:e.target.checked
      }
      this.$store.commit('changeItemDone',params)
    },
    //清除已完成
    deleComplate(){
      this.$store.commit('deleteComplate')
    },
    //切换按钮的高亮
    All(key){
      this.$store.commit('Allchange',key)
      // console.log(key)
    }
  }
};
</script>

<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
