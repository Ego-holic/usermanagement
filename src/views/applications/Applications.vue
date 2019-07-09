<template>
  <div class="wrapper" v-loading="isLoading">
    <div class="list_wrapper">
      <Application
        v-for="application in applications"
        :key="application.id"
        :application="application"
        @edit="onEdit"
        @delete="onDelete"
        @check-roles="onCheckRoles"
      />
    </div>
    <el-footer
      style="padding:10px;display:flex;justify-content:flex-end;align-items:center"
    >
      <el-button plain size="mini" @click="onReturnAppList"
        >返回应用列表</el-button
      >
      <el-button type="primary" plain size="mini" @click="onCreate"
        >添加APP</el-button
      >
    </el-footer>

    <OperateApplicationDialog
      :visible.sync="dialogVisible"
      :id="currentOperateApplicationId"
      :applicationId="id"
      :operateType="currentOperateApplicationType"
      @operate-success="onOperateSuccess"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';

import { ApplicationI } from '@/ts/types/models';
import { OperateTypesE } from '@/ts/enums';
import apis from '@/ts/apis/apis';

import UtilMixin from '@/ts/mixins/utilMixin';
import Application from './components/Application.vue'; // @ is an alias to /src
import OperateApplicationDialog from './components/OperateApplicationDialog.vue'; // @ is an alias to /src

@Component({
  components: {
    Application,
    OperateApplicationDialog,
  },
})
export default class Applications extends Mixins(UtilMixin) {
  public applications: ApplicationI[] = [];
  public isLoading = false;
  public dialogVisible = false;
  public currentOperateApplicationId = '';
  public currentOperateApplicationType = OperateTypesE.Create;
  public getTableData() {
    this.isLoading = true;
    apis
      .getApplications()
      .then((res) => {
        this.applications = res;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  public onDelete(application: ApplicationI) {
    this.confirmDialog()
      .then(() => {
        return apis.deleteApplication(application.id);
      })
      .then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        this.getTableData();
      })
      .catch((e) => {
        if (e !== 'cancel') {
          // 非取消错误捕获
        }
      });
  }
  public onEdit(application: ApplicationI) {
    this.currentOperateApplicationId = application.id;
    this.dialogVisible = true;
    this.currentOperateApplicationType = OperateTypesE.Update;
  }
  public onCheckRoles(application: ApplicationI) {
    this.$router.push({
      name: 'roles',
      params: {
        id: application.id,
      },
    });
  }
  public onCreate() {
    this.currentOperateApplicationId = '';
    this.dialogVisible = true;
    this.currentOperateApplicationType = OperateTypesE.Create;
  }
  public onOperateSuccess() {
    this.getTableData();
  }
  public created() {
    this.getTableData();
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}
.list_wrapper {
  height: calc(100% - 60px);
  display: flex;
  padding: 5px 10px;
  flex-wrap: wrap;
  overflow-y: auto;
  // justify-content: space-around;
}
.list_wrapper>div:not(:nth-child(3n+1)) {
  margin-left: 2%; 
}
</style>

