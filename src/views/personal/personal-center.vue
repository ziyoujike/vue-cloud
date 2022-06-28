<template>
  <div class="container">
    <div style="padding-top: 30px;"></div>
    <div class="content-wrap">
      <div class="user-info flex-center">
        <a-upload
          list-type="picture-card"
          class="avatar_url-uploader"
          :show-upload-list="false"
          :customRequest="(e: FileItem) => customRequest(e, 'avatar_url')"
        >
          <img
            class="upload-img"
            v-if="formState.avatar_url"
            :src="formState.avatar_url"
            alt="avatar_url"
          />
          <div v-else>
            <plus-outlined :style="{ fontSize: '24px' }" ></plus-outlined>
            <div class="ant-upload-text">上传头像</div>
          </div>
        </a-upload>
        <div class="text-wrap">
          <div class="font-size-14" style="margin-bottom: 10px;">
            <a-input 
              ref="nicknameInput" @blur="handleBlur" 
              :class="{ 'hide': !isEdit }" 
              v-model:value="formState.user_name" 
            />
            <span style="cursor: pointer;" :class="{ 'hide': isEdit }" @click="handleFocus">
              昵称：{{ userInfo.user_name }}
              <EditOutlined />
            </span>
          </div>
          <div class="font-size-14" style="margin-bottom: 10px;">
            <a-input 
              ref="emailInput" @blur="handleEmailBlur" 
              :class="{ 'hide': !isEditEmail }" 
              v-model:value="formState.email" 
            />
            <span style="cursor: pointer;" :class="{ 'hide': isEditEmail }" @click="handleEmailFocus">
              邮箱：{{ userInfo.email || "暂未设置邮箱" }}
              <EditOutlined />
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue';
import { qiniuUploadFile } from '@/utils/upload-file';
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import { message } from 'ant-design-vue';
import { UpdateUserInfo } from '@/servers/db_user';
import { User } from "@/libs/db_user";
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore);

const nicknameInput = ref();
const isEdit = ref<boolean>(false);
const formState = reactive<User.UpdateUserInfo>({
  user_name: userInfo.value.user_name || "",
  avatar_url: userInfo.value.avatar_url || "",
  email: userInfo.value.email,
});
type Name = 'user_name' | 'avatar_url' | 'email';
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  preview?: string;
  originFileObj?: any;
  file: string | Blob;
}
// 上传图片
const customRequest = async (e: FileItem, name: Name) => {
  let res: any = await qiniuUploadFile(e);
  formState[name] = res.result || "";
  if (formState.avatar_url === userInfo.value.avatar_url) return;
  updateBasicInfo();
};
const handleFocus = () => {
  isEdit.value = true;
  nextTick(() => {
    nicknameInput.value.focus();
  })
}
const handleBlur = () => {
  isEdit.value = false;
  if (formState.user_name === userInfo.value.user_name) return;
  updateBasicInfo();
}

const emailInput = ref();
const isEditEmail = ref<boolean>(false);
const handleEmailFocus = () => {
  isEditEmail.value = true;
  nextTick(() => {
    emailInput.value.focus();
  })
}
const handleEmailBlur = () => {
  isEditEmail.value = false;
  if (formState.email === userInfo.value.email) return;
  updateBasicInfo();
}

const updateBasicInfo = async() => {
  if (!formState.user_name) {
    formState.user_name = userInfo.value.user_name;
    message.warn("请输入昵称！");
    return;
  }
  try {
    let res = await UpdateUserInfo(formState);
    message.success(res.message);
    const newUserInfo = JSON.parse(JSON.stringify(userInfo.value));
    newUserInfo.user_name = formState.user_name;
    newUserInfo.avatar_url = formState.avatar_url;
    userStore.GET_USER_INFO();
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped lang="scss">
.title {
  position: relative;
  z-index: 9;
  margin: 0 0 30px 10px;
  font-weight: bold;
}

.items-center {
  align-items: center;
}

.content-wrap {
  padding: 0 40px;
}

.user-info {
  max-width: 600px;
  padding: 46px 21px 31px;
  margin-bottom: 30px;
  box-shadow: 0 4px 40px 30px #F9F9F9;

  .text-wrap {
    margin: 0 15px;

    &>p {
      margin-bottom: 8px;
      color: #444;
    }
  }
}

.setting-item {
  align-items: center;
  padding: 0 32px;
  margin-bottom: 30px;
  box-shadow: 0 4px 40px 30px #F9F9F9;
  min-height: 182px;

  .center-text {
    width: 100%;
    flex-wrap: wrap;
  }

  .icon {
    margin-right: 20px;
    border-radius: 50%;
    width: 46px;
    height: 46px;
  }

  .left-text {
    margin-right: 10px;
    
    .desc-text {
      max-width: 320px;
    }
  }

  .right-text {
    margin-right: 10px;
  }
}

@media screen and (max-width: 1024px){
  .content-wrap {
    padding: 0 10px;
  }
  .setting-item {
    padding: 10px 14px !important;
    min-height: 120px !important;
  }
  
  .user-info {
    padding: 20px 20px 5px;
  }
}

.upload-img {
  border-radius: 50%;
  background-color: #fafafa;
  padding: 0;
  object-fit: cover;
  width: 128px;
  height: 128px;
  
}
:deep(.ant-upload-picture-card-wrapper) {
  width: auto;

  .ant-upload {
    border-radius: 50%;
    padding: 0;
    margin: 0 0 15px 0 !important;
    width: 130px;
    height: 130px;
  }
}

.hide {
  display: none;
}

@media screen and (max-width: 750px){
  .user-info {
    flex-wrap: wrap;
    max-width: 100%;
  }

  .right-text {
    display: none !important;
  }
  
  .icon {
    width: 30px !important;
    height: 30px !important;
  }
}

</style>
