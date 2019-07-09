<template>
<el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="onDialogOpen"
    @close="onDialogClose">
    <el-form
      ref="form"
      label-width="80px"
      v-loading="isLoading"
      size="mini"
      label-position="top"
      :model="form"
      :rules="rules"
    >
    <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" :disabled="nameDisabled"></el-input>
    </el-form-item>
    <el-form-item >
        <el-form :inline="true" :model="formInline" class="from-inline">
            <el-form-item label="app">
                <el-input v-model="formInline.app" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="role">
                <el-input v-model="formInline.role" label=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="lookfor">查找</el-button>
            </el-form-item>
        </el-form>
    </el-form-item>
    <div class="button">
    <el-button type="primary" @click="confirm">确认</el-button>
    <el-button @click="() => {
              this.dialogVisible = false;
                }
                "
                >取消</el-button>
</div>
</el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';

@Component
export default class Assign extends Vue {
    fromInline=[]
    lookfor(){
    }
    confirm(){

    }
}
</script>

<style lang="stylus">
</style>

