<template>
    <div class="edit-wrapper">
      <el-card shadow="hover" class="card">
        <h1>修改用户信息</h1>
        <br/>
        <el-row>
          <el-col :span="15"><p>当前用户的ID：{{ userData.id }}</p></el-col>
          <el-col :span="6">
            <el-button
              size="small"
              @click = "changePasswd">修改密码</el-button></el-col>
        </el-row>
        <br/>
        <div class="form">
        <el-row>
          <el-form ref="userData" :model="userData" :rules="rules" label-width="150px">
            <el-form-item label="新的邮箱地址：" prop="email">
                <el-input v-model="userData.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="新的手机号码：" prop="phoneNumber">
                <el-input
                  v-model="userData.phoneNumber"
                  maxlength="11"
                  placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitChange('userData')">提交修改</el-button>
              <el-button type="default" @click="cancel()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        </div>
      </el-card>
      <UserChangePasswd
        :dialogVisible= "dialogVisible"
        :password = "originPassword"
        :id = "id"/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
import UserChangePasswd from '@/components/UserChangePasswd.vue';
// import UserForm from '@/views/UserForm.vue';
@Component({
  components: { UserChangePasswd },
})
export default class UserInfoEdit extends Vue {
  dialogVisible: boolean = false;

  originPassword: string = '';

  id: string = '';

  userData = {
    id: '',
    password: '',
    email: '',
    phoneNumber: '',
  };

  validateEmail(rule: any, value: string, callback: any) {
    let isEmail: boolean = false;
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    isEmail = emailReg.test(value);
    if (!isEmail) {
      isEmail = false;
      callback(new Error('请检查输入的邮箱是否合法!'));
    }
    isEmail = true;
    callback();
  }

  validatePhone(rule:any, value: string, callback: any) {
    let isTel: boolean = false;
    const telReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    isTel = telReg.test(value);
    if (!isTel && value !== '') {
      isTel = false;
      callback(new Error('请检查输入的手机号码是否合法!'));
    }
    isTel = true;
    callback();
  }

  rules = {
    email: [{ required: true, validator: this.validateEmail, trigger: 'blur' }],
    phoneNumber: [{ required: true, validator: this.validatePhone, trigger: 'blur' }],
  };

  getUserById(val: string) {
    axios.get(`http://localhost:3000/users?id=${val}`).then((response) => {
      // console.log(response.data[0].password)
      this.userData = {
        id: response.data[0].id,
        password: response.data[0].password,
        email: response.data[0].email,
        phoneNumber: response.data[0].phoneNumber,
      };
    });
  }

  // updateForm = {
  //       // id: this.userData.id,
  //       // password: this.userData.password,
  //       email: this.userData.email,
  //       phoneNumber: this.userData.phoneNumber,
  //     };

  submitChange(formName: string) {
    // console.log(this.updateForm.email);
    (this.$refs[formName] as HTMLFormElement).validate((tmp: boolean) => {
      if (tmp) {
        const updateForm = {
          email: this.userData.email,
          phoneNumber: this.userData.phoneNumber,
        };
        axios.patch(`http://localhost:3000/users/${this.$route.params.id}`, updateForm)
          .then((response) => {
            this.$router.push({ path: '/users' });
          });
      } else if (!this.userData.email || !this.userData.phoneNumber) {
        this.$alert('请输入信息！');
      } else {
        this.$alert('请输入正确的信息！');
      }
    });
  }

  cancel() {
    this.$router.push({ path: '/users' });
  }

  changePasswd() {
    this.dialogVisible = true;
    this.originPassword = this.userData.password;
    this.id = this.$route.params.id;
    // return this.dialogVisible, this.password;
  }

  created() {
    this.getUserById(this.$route.params.id);
  }
}
</script>

<style lang="stylus">
.edit-wrapper{
  display flex
  // width 40%
  // height 300px
  justify-content center
  margin-top 150px
}
.card {
  height 400px
}

h1{
  text-align center
}
p{
  text-align center
}
</style>
