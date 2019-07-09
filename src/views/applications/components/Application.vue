<!---->
<template>
  <el-card
    class="box-card application_item_wrapper"
    shadow="hover"
    :body-style="{ padding: '0 15px' }"
  >
    <div slot="header">
      <span>{{ application.name }}</span>
    </div>
    <el-form label-position="top" label-width="80px" :model="form">
      <el-form-item label="ID">
        <p class="item_val">{{ application.id }}</p>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          <span style="font-size: 14px;padding-right:15px">密钥</span>
        </div>
        <p class="item_val">
          {{ application.clientSecret }}
        </p>
      </el-form-item>
      <el-form-item label="描述">
        <p class="item_val">
          {{ application.description }}
        </p>
      </el-form-item>
      <div class="item">
        <span class="item_label">是否内置</span>
        <el-tag
          :type="application.isSystem ? 'success' : 'denger'"
          effect="dark"
          size="mini"
        >
          {{ application.isSystem ? "是" : "否" }}
        </el-tag>
      </div>

      <div class="item">
        <el-tooltip
          :content="application.roles.join(' , ')"
          placement="bottom-start"
          effect="light"
        >
          <el-badge :value="application.roles.length" :max="99" type="primary">
            <span class="item_label">角色数量</span>
          </el-badge>
        </el-tooltip>
      </div>
    </el-form>
    <el-divider></el-divider>
    <div>
      <div class="footer_wrapper">
        <el-button
          v-show="!isEditable"
          style="padding: 3px 0;color: red"
          type="text"
          icon="el-icon-delete"
          @click="onDelete"
          >删除</el-button
        >
        <el-button
          v-show="!isEditable"
          style="padding: 3px 0"
          type="text"
          icon="el-icon-edit"
          @click="onEdit"
          >编辑</el-button
        >
        <el-button
          style="padding: 3px 0;color:#67C23A"
          type="text"
          icon="el-icon-view"
          @click="onCheckRoles"
          >查看角色列表
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

import { ApplicationI } from '@/ts/types/models';
import apis from '@/ts/apis/apis';
import { Checkbox } from 'element-ui';

@Component
export default class Application extends Vue {
  @Prop() public application: ApplicationI;
  @Emit() public edit(application: ApplicationI) {}
  @Emit() public delete(application: ApplicationI) {}
  @Emit() public checkRoles(application: ApplicationI) {}
  // isEditable = false;
  // form: ApplicationI = {
  //   id: "",
  //   name: "",
  //   clientSecret: "",
  //   description: "",
  //   isSystem: true,
  //   roles: []
  // };
  /* onEdit() {
    apis.getApplication(this.application.id).then(res => {
      this.isEditable = true;
      this.form = JSON.parse(JSON.stringify(res));
    });
  } */
  // onCancelEdit() {
  //   this.isEditable = false;
  // }
  /* onDelete() {
    this.$confirm("确定删除?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      apis.deleteApplication(this.application.id).then(() => {
        this.onDeleteSuccess();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    });
  } */
  public onDelete() {
    this.delete(this.application);
  }
  // onCreateSecret() {
  //   apis.getSecret().then(res => {
  //     this.$set(this.form, "clientSecret", res);
  //   });
  // }
  /* onEdit() {
    apis.putApplication(this.form).then(res => {
      this.isEditable = false;
      this.onSubmitSuccess();
    });
  } */
  public onEdit() {
    this.edit(this.application);
  }
  public onCheckRoles() {
    this.checkRoles(this.application);
  }

  // onCheckRoles() {
  //   this.$router.push({
  //     name: "roles",
  //     params: {
  //       id: this.application.id
  //     }
  //   });
  // }
}
</script>
<style lang="scss" scoped >
.application_item_wrapper {
  width: 32%;
  height: 510px;
  background: #fff !important;
  margin-top: 20px;
}
.item_val {
  font-size: 12px;
  color: #999999;
  line-height: 1.5;
  word-break: break-all;
}
.hover-hand:hover {
  cursor: pointer;
}
.item_label {
  font-size: 14px;
  padding-right: 15px;
  color: #606266;
}
.item {
  display: flex;
  align-items: center;
  padding-top: 15px;
}
.footer_wrapper {
  // text-align: right;
  display: flex;
  justify-content: space-between;
  color: green;
  // background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
</stylelang="scss">