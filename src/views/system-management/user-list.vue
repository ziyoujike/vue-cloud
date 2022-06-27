<template>
  <a-page-header title="用户列表" sub-title="User List">
    <template #extra>
      <a-button type="primary">新增</a-button>
      <a-button><sync-outlined />刷新</a-button>
    </template>
  </a-page-header>
  <br />
</template>
<script setup lang="ts">
import { SyncOutlined } from "@ant-design/icons-vue";
</script>