<template>首页</template>
<script lang="ts" setup>
import { ref } from "vue";
  import {
  GetDictionariesList,
} from "../../servers/db_common";

const getDictionaries = ()=>{
  GetDictionariesList().then(response=>{
    localStorage.setItem("dictionaries",JSON.stringify(response.data))
  })
}
getDictionaries()
</script>
