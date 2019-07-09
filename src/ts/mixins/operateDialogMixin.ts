import { Component, Prop, Vue, Watch, Emit, Ref } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form.d';

import { OperateTypesE } from '@/ts/enums';

// T: 操作的数据的数据格式
@Component
export default class OperateDialogMixin<T> extends Vue {
  get title() {
    let title = '';
    switch (this.operateType) {
      case OperateTypesE.Create:
        title = '新增';
        break;
      case OperateTypesE.Update:
        title = '修改';
        break;
      default:
        break;
    }
    return title;
  }
  @Prop({ type: Boolean, required: true }) public visible: boolean;
  @Prop() public id: string; // 被操作的id,若是增加则为''
  @Prop() public operateType: OperateTypesE;
  @Ref('form') public readonly formEl!: ElForm;
  public operateTypes = OperateTypesE;
  public dialogVisible = false; // dialog的显示状态
  public isLoading = false; // 是否加载数据
  public editable = false; // 是否可编辑
  public initForm: any = {};
  public form = { ...this.initForm };

  public commonSureOperateSuccessCallback: any = { // 公用的操作成功后的方法
    [OperateTypesE.Create](...rest) {
      this.$message({
        message: '添加成功',
        type: 'success',
      });
      this.dialogVisible = false;
      this.operateSuccess({ ...this.form });
      this.sureOperateSuccessCallback[OperateTypesE.Create](rest);
    },
    [OperateTypesE.Update](...rest) {
      console.log(this);
      this.$message({
        message: '修改成功',
        type: 'success',
      });
      this.dialogVisible = false;
      this.operateSuccess({ ...this.form });
      this.sureOperateSuccessCallback[OperateTypesE.Update](rest);
    },
  };
  public openCallback: any = {
    [OperateTypesE.Create]() {
      console.error('未重写打开新增对话框方法');
    },
    [OperateTypesE.Update]() {
      console.error('未重写打开更新对话框方法');
    },
    [OperateTypesE.Other]() {
      console.error('未重写打开对话框方法');
    },
  };
  public privateOpenCallback: any = {
    [OperateTypesE.Create]() {
      this.editable = true;
      this.openCallback[OperateTypesE.Create].call(this);
    },
    [OperateTypesE.Update]() {
      this.editable = false;
      this.isLoading = true;
      this.openCallback[OperateTypesE.Update].call(this);
    },
  };
  @Watch('visible')
  public onVisibleChange(val: boolean) {
    if (val) {
      this.dialogVisible = val;
    }
  }
  @Emit() public operateSuccess(operateItem: T) {}
  @Emit('update:visible')
  public onUpdateVisible(visible: boolean) {}
  public onDialogOpenPrepare() {}
  public onDialogClosePrepare() {}
  public onSureOperate() {
    console.log(this.formEl);
    // (this.$refs.form as ElForm).validate((isValid: boolean) => {
    this.formEl.validate((isValid: boolean) => {
      if (isValid) {
        this.sureOperateCallback[this.operateType].call(this);
      } else {
        this.$message.error('有字段未验证成功请修改');
      }
    });
  }
  public onDialogClose() {
    this.onDialogClosePrepare();
    this.onUpdateVisible(this.dialogVisible);
    this.form = { ...this.initForm };
  }
  public onDialogOpen() { // 打开对话框时如果是更新操作,则需要
    this.onDialogOpenPrepare();
    const self = this;
    this.privateOpenCallback[this.operateType].call(self);
    this.openCallback[OperateTypesE.Other].call(self);
    setTimeout(() => {
      // (this.$refs.form as ElForm).clearValidate();
      this.formEl.clearValidate();
    }, 0);
    console.log(this, this.editable, this.operateType);
  }
}
