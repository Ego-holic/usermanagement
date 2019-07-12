<template>
    <div class="assgin_wrapper">
        <el-dialog title="分配角色" :visible.sync="visibleAssginRole">
            <div class="header">
                <span>已经分配的角色</span>
                <el-tag
				v-for="(item, index) in usersRoles"
				:key="index"
				closable
				@close="removeTag(index)">{{item}}</el-tag>
            </div>
			<hr />
            <div class="footer">
                <span>未分配的角色</span>
                <el-tag
				v-for="(item, index) in rolesArr"
				:key="index"
                @click="addTag(index)">{{item}}</el-tag>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import {
  Prop, Component, Vue, Watch,
} from 'vue-property-decorator';

@Component
export default class UserAssginRole extends Vue {
@Prop({ type: Boolean, default: false }) public visibleAssginRole: boolean;

@Prop({ type: String, default: '' }) public id: string;

// 未分配的角色数组
    public rolesArr = [{
    name: '',
  }];

  public usersRoles = []; // 已分配的角色数组

  // 用户的全部数据
  public totalData = {
    roleNames: [],
      id: '',
      userName: '',
      email: '',
      phoneNumber: '',
  };

@Watch('id')
public watchIdChange(val: string) {
  this.getUserRoles(val);
  this.getRoles();
  // console.log(val);
}

  public getRoles() {
    axios.get('/role')
      .then((response) => {
        const rolesData = response.data;
        const lengthArr1 = rolesData.length;
         const lengthArr2 = this.usersRoles.length;
         let tmpArr = [];
         let index = 0;
         for (let i = 0; i < lengthArr1; i += 1) {
          tmpArr.push(rolesData[i].name);
      }
      // console.log(tmpArr)
         for (let j = 0; j < lengthArr2; j += 1) {
      index = tmpArr.findIndex((val: string, index: number) => {
      return Object.is(this.usersRoles[j], val);
      });
      tmpArr.splice(index, 1);
      }
        this.rolesArr = tmpArr;
      //   console.log(this.rolesArr)
        });
    }

  // 通过id查询用户的所有数据
  public getUserRoles(val: string) {
    axios.get(`/user/${val}`)
      .then((response) => {
      this.totalData = response.data;
      this.usersRoles = response.data.roleNames;
      });
  }

  public addTag(index: number) {
    const val = this.rolesArr[index];
    this.usersRoles.push(val);
    this.rolesArr.splice(index, 1);
    this.totalData.roleNames = this.usersRoles;
    axios.put(`/user/${this.id}`, this.totalData)
      .then((response) => {});
  }

  public removeTag(index: number) {
    const val = this.usersRoles[index];
    this.rolesArr.push(val);
    this.usersRoles.splice(index, 1);
    axios.put(`/user/${this.id}`, this.totalData)
    .then((response) => {});
  }
}
</script>
