<template>
  <a-menu mode="inline" style="height: 100%">
    <div v-for="item in Router.options.routes" :key="item.path">
      <a-sub-menu
        :key="item.name"
        v-if="item.children && item.children.length != 1"
      >
        <template #title>
          <span>
            {{ item.meta?.title }}
          </span>
        </template>
        <div v-for="children in item.children">
          <span @click="handleClick(children)">
            <a-menu-item :key="children.path">
              {{ children.meta?.title }}
            </a-menu-item>
          </span>
        </div>
      </a-sub-menu>
      <span @click="handleClick(item)" v-else>
        <a-menu-item :key="item.name">
          {{ item.meta?.title }}
        </a-menu-item>
      </span>
    </div>
  </a-menu>
</template>
<script  lang="ts" >
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },
  setup() {
    const Router = useRouter();
    const Route = useRoute();
    let selectedKeys = ref<string[]>(["index"]);
    let openKeys = ref<string[]>(["/"]);
    console.log(Router.options.routes)
    const handleClick = (children:any) => {
      openKeys.value = [children.path];
      selectedKeys.value = [children.name];
      Router.push({ path: children.path });
    };
    return {
      selectedKeys,
      openKeys,
      Router,
      handleClick,
    };
  },
});
</script>