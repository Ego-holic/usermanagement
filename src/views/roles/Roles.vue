<template>
  <div>
    <div style="height:100%" v-loading="isLoading">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 60px)"
      >
        <el-table-column prop="id" label="ID" width="350" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="170">
        </el-table-column>
        <el-table-column prop="displayName" label="显示名称" width="100">
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
        </el-table-column>
        <el-table-column label="是否内置" width="100" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isSystem ? 'success' : 'denger'"
              effect="dark"
              size="mini"
            >
              {{ scope.row.isSystem ? "是" : "否" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170" align="center">
          <template slot-scope="scope">
            <el-button
              style="padding: 3px 15px;color: red"
              type="text"
              icon="el-icon-delete"
              @click="
                () => {
                  onDelete(scope.row);
                }
              "
              >删除</el-button
            >
            <el-button
              style="padding: 3px 0"
              type="text"
              icon="el-icon-edit"
              @click="
                () => {
                  onEdit(scope.row);
                }
              "
              >编辑</el-button
            >
            <el-button 
            tyle="padding: 3px 0;color:#67C23A"
            type="text"
            icon="el-icon-view"
            @click="onCheckUsers"            
            >查看用户列表
            </el-button>


          </template>
        </el-table-column>
      </el-table>
      <el-footer
        style="padding:10px;display:flex;justify-content:flex-end;align-items:center">
        <el-button plain size="mini" @click="onReturnAppList">返回应用列表</el-button>
        <el-button type="primary" plain size="mini" @click="onCreate"
          >添加角色</el-button>
      </el-footer>
      <OperateRoleDialog
        :visible.sync="dialogVisible"
        :id="currentOperateRoleId"
        :applicationId="id"
        :operateType="currentOperateRoleType"
        @operate-success="onOperateSuccess"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';

import OperateRoleDialog from './components/OperateRoleDialog.vue';

import { RoleI } from '@/ts/types/models';
import apis from '@/ts/apis/apis';
import UtilMixin from '@/ts/mixins/utilMixin';
import { OperateTypesE } from '@/ts/enums';

@Component({
  components: {
    OperateRoleDialog,
  },
})
export default class Roles extends Mixins(UtilMixin) {
  @Prop() public id: string; // applicationId
  public tableData: RoleI[] = [];
  public dialogVisible = false;
  public currentOperateRoleId = '';
  public currentOperateRoleType = OperateTypesE.Create;
  public isLoading = false;
  public getTableData() {
    this.isLoading = true;
    apis.getRoles(this.id).then((res) => {
      this.tableData = res;
    }).finally(() => {
      this.isLoading = false;
    });
  }
  public onOperateSuccess() {
    this.getTableData();
  }
  public onDelete(role: RoleI) {
    this.confirmDialog()
      .then(() => {
        return apis.deleteRole(role.id);
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
  public onEdit(role: RoleI) {
    this.currentOperateRoleId = role.id;
    this.dialogVisible = true;
    this.currentOperateRoleType = OperateTypesE.Update;
  }
  public onCreate() {
    this.currentOperateRoleId = '';
    this.dialogVisible = true;
    this.currentOperateRoleType = OperateTypesE.Create;
  }
  public onReturnAppList() {
    this.$router.push({name: 'applications'});
  }
  public created() {
    this.getTableData();
  }
  // onCheckUsers() {
  //   this.checkUsers(this.application)
  // }
}
</script>
<style scoped  lang="stylus"></style>