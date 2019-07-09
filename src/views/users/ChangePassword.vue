<template>
<div class="passwordchange">
 <el-form  ref="form" :model="form" label-width="120px" class="form" :rules="rules">
    <el-form-item label="原密码：" prop="oldPasswd">
        <el-col :span="14">   
        <el-input type="password" placeholder="请输入原密码" v-model="form.oldPasswd" 
   
        ></el-input>
        </el-col>
    </el-form-item>
    <el-form-item label="新密码：" prop="newPasswd">
        <el-col :span="14">
        <el-input type="password" placeholder="密码至少6位以上" v-model="form.newPasswd"></el-input>
        </el-col>
    </el-form-item>
    <el-form-item label="重复新密码：" prop="checkPasswd">
        <el-col :span="14">   
        <el-input type="password" placeholder="请再次输入新密码" v-model="form.checkPasswd"></el-input>
        </el-col>
    </el-form-item>
</el-form>
<div class="button">
  <el-button type="primary">确认</el-button>
   <el-button>取消</el-button>
</div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class ChangePassword extends Vue{
  form={
    newPasswd:''
  };
   validateCheckPasswd(rule: any, value: string, callback: any) {
    const passwd = this.form.newPasswd;
    if (value === '') {
      callback(new Error('密码不能为空！'));
    } else if (value !== passwd) {
      callback(new Error('两次输入的密码不一致！'));
    } else {
      callback();
    }
  }
    rules={
        oldPasswd:[
            { required : true, message:'请输入原密码', trigger:'blur'},
            // { min: 3 ,max: 5 , message:'',trigger:''}
        ],
        newPasswd:[
            { required : true, message:'密码不能为空', trigger:'blur'},
            { min: 6 , message:'密码位数过少', trigger:'blur'}
        ],
        checkPasswd:[
            { required : true, validator: this.validateCheckPasswd, trigger:'change'},
            // {validator: ,trigger:'blur'}
        ],        
    }
}

    // get

</script>

<style>
.passwordchange{
    background-image: linear-gradient(to top, #e0d0ca 0%, #42778f 100%);
}
.form {
  padding: 50px 300px;
}
.button{
padding: 0px 450px;
}
</style>