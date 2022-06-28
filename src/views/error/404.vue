<script lang="ts" setup>
  import Error from '@/components/error.vue'
  const errInfo = {
    errTitle: "抱歉!",
    errReason: "您访问的页面不存在...",
    errSolution: "请检查链接是否正确。"
  }
</script>

<template>
  <error :errInfo="errInfo" />
</template>