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
      label-width="80px"
      v-loading="isLoading"
      size="mini"
      label-position="top"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" :disabled="nameDisabled"></el-input>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          <span style="font-size: 14px;padding-right:15px">密钥</span>
          <el-tag
            type="success"
            effect="dark"
            size="mini"
            class="hover-hand"
            @click="onCreateSecret"
          >
            系统生成
          </el-tag>
        </div>
        <el-input
          disabled
          type="textarea"
          :rows="2"
          v-model="form.clientSecret"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 5 }"
          v-model="form.description"
          resize="none"
        >
        </el-input>
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
import { ApplicationI } from '@/ts/types/models';
import OperateDialogMixin from '@/ts/mixins/operateDialogMixin';
import apis from '../../../ts/apis/apis';
@Component
export default class OperateApplicationDialog extends mixins(
  OperateDialogMixin,
) {
  get nameDisabled() {
    return this.operateType === OperateTypesE.Update;
  }
  @Prop() public applicationId: string;
  public initForm: ApplicationI = {
    id: '',
    name: '',
    clientSecret: '',
    description: '',
    isSystem: true,
    roles: [],
  };
  public form = JSON.parse(JSON.stringify(this.initForm));
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
      apis.postApplication({ ...this.form }).then(() => {
        this.commonSureOperateSuccessCallback[OperateTypesE.Update].call(this);
      });
    },
    [OperateTypesE.Update]() {
      console.log(this.form);

      apis.putApplication({ ...this.form }).then(() => {
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
      apis
        .getApplication(this.id)
        .then((res) => {
          this.form = { ...res };
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  };
  public onCreateSecret() {
    apis.getSecret().then((res) => {
      this.$set(this.form, 'clientSecret', res);
    });
  }
}
</script>
<style scoped lang="stylus"></style>