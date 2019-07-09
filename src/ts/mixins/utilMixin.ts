import { Component, Prop, Vue, Watch, Emit, Ref } from 'vue-property-decorator';

// T: 操作的数据的数据格式
@Component
export default class UtilMixin<T> extends Vue {
  public confirmDialog(des: string = '确认删除吗?') {
    return this.$confirm(des, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
  }
}
