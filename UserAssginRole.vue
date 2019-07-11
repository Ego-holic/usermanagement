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
            <div class="footer">
                <span>未分配的角色</span>
                <el-tag
				v-for="(item, index) in rolesArr"
				:key="index"
                @click="addTag(index)">{{item.name}}</el-tag>
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
@Prop({ type: Boolean, default: false }) visibleAssginRole: boolean;

@Prop({ type: String, default: '' }) id: string;

@Watch('id')
watchIdChange(val: string) {
  this.getUserRoles();
  this.getRoles();
}

    rolesArr = [{
      name: '',
    }];

	usersRoles = [];

	totalData = {
	  roleNames: [],
    	id: '',
    	userName: '',
    	email: '',
    	phoneNumber: '',
	};

	getRoles() {
	  axios.get('http://localhost:3000/roles')
	    .then((response) => {
	      const rolesData = response.data;
	      this.rolesArr = rolesData;
	    });
	}

	getUserRoles() {
	  axios.get(`http://localhost:3000/users/${this.id}`)
	    .then((response) => {
		  this.totalData = response.data;
		  this.usersRoles = response.data.roleNames;
		  this.compare();
	      //   console.log(response.data.roleNames);
	    });
	}

	addTag(index: number) {
	  const val = this.rolesArr[index].name;
	  this.usersRoles.push(val);
	  this.rolesArr.splice(index, 1);
	  // this.compare();
	  this.totalData.roleNames = this.usersRoles;
	  axios.patch(`http://localhost:3000/users/${this.id}`, this.totalData)
		.then((response) => {});
	}

	removeTag(index: number) {
		const val2 = this.usersRoles[index];
		this.rolesArr.push({ name: val2 });
		this.usersRoles.splice(index,1);
		axios.patch(`http://localhost:3000/users/${this.id}`, this.totalData)
		.then((response) => {});		
	}

	compare() {
	  const lengthUsersRoles: number = this.usersRoles.length;
	  const lengthRoles: number = this.rolesArr.length;
	  for (let i: number = 0; i < lengthUsersRoles - 1; i++) {
	    for (let j: number = 0; j < lengthRoles - 1; j++) {
	      if (this.usersRoles[i] === this.rolesArr[j]) {
	        this.rolesArr.splice(j, 1);
	      }
	    }
	  }
	}

	created() {
	  this.getRoles();
	}
}
</script>
