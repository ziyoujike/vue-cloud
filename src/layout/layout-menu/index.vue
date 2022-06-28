<template>
  <a-menu mode="inline" style="height: 100%">
    <div v-for="item in filterMemu(Router.options.routes)" :key="item.path">
      <a-sub-menu
        :key="item.name"
        v-if="item.children && item.children.length != 1"
      >
        <template #title>
          <span>
            {{ item.meta && item.meta.title }}
          </span>
        </template>
        <div v-for="children in filterMemu(item.children)">
          <span @click="handleClick(children)">
            <a-menu-item :key="children.path">
              {{ children.meta && children.meta.title }}
            </a-menu-item>
          </span>
        </div>
      </a-sub-menu>
      <span @click="handleClick(item)" v-else>
        <a-menu-item :key="item.name">
          {{ item.meta && item.meta.title }}
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
import { RouteRecordRaw, useRouter } from "vue-router";

export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },
  setup() {
    const Router = useRouter();
    let selectedKeys = ref<string[]>(["index"]);
    let openKeys = ref<string[]>(["/"]);

    const handleClick = (children: RouteRecordRaw) => {
      openKeys.value = [children.path];
      selectedKeys.value = [children.name as string];
      Router.push({ path: children.path });
    };

    // 过滤菜单列表
    const filterMemu = (routes: RouteRecordRaw[] = []) => {
      return routes.filter(item => item.meta && item.meta.disable)
    }

    return {
      selectedKeys,
      openKeys,
      Router,
      handleClick,
      filterMemu
    };
  },
});
</script>