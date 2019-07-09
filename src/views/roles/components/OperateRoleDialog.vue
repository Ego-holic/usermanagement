<!---->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="onDialogOpen"
    @close="onDialogClose"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="mini"
      :rules="rules"
      v-loading="isLoading"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" :disabled="nameDisabled"></el-input>
      </el-form-item>
      <el-form-item label="显示名称" prop="displayName">
        <el-input v-model="form.displayName"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSureOperate">确定</el-button>
        <el-button
          @click="
            () => {
              this.dialogVisible = false;
            }
          "
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Ref } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { ElForm } from 'element-ui/types/form.d';

import { OperateTypesE } from '@/ts/enums';
import { RoleI } from '@/ts/types/models';
import OperateDialogMixin from '@/ts/mixins/operateDialogMixin';
import apis from '../../../ts/apis/apis';
@Component
export default class operateRoleDialog extends mixins(OperateDialogMixin) {
  @Prop() public applicationId: string;
  get nameDisabled() {
    return this.operateType === OperateTypesE.Update;
  }
  public initForm = {
    name: '',
    displayName: '',
    description: '',
    applicationId: this.applicationId,
    isSystem: true,
    id: '',
    normalizedName: '',
    concurrencyStamp: '',
  };
  public form = { ...this.initForm };
  public rules = {
    name: [
      {
        required: true,
        message: '必填',
      },
      {
        max: 100,
        message: '最长100字符',
      },
    ],
    displayName: [{ required: true, message: '必填' }],
  };
  public sureOperateCallback: any = {
    // 确定新增或更新数据时的方法
    [OperateTypesE.Create]() {
      apis.postRole({ ...this.form }).then(() => {
        this.commonSureOperateSuccessCallback[OperateTypesE.Update].call(this);
      });
    },
    [OperateTypesE.Update]() {
      console.log(this.form);

      apis.putRole({ ...this.form }).then(() => {
        this.commonSureOperateSuccessCallback[OperateTypesE.Update].call(this);
      });
    },
  };
  public sureOperateSuccessCallback: any = {
    [OperateTypesE.Create](param: any) {
      console.error('未重写的新增成功回调方法');
    },
    [OperateTypesE.Update](param: any) {
      console.error('未重写的更新成功回调方法');
    },
  };
  public openCallback: any = {
    [OperateTypesE.Update]() {
      apis.getRole(this.id).then((res) => {
        this.form = { ...res };
      }).finally(() => {
        this.isLoading = false;
      });
    },
  };
}
</script>
<style scoped lang="stylus"></style>