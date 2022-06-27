<template>
  <a-layout>
    <a-layout-header class="header">
      <layoutHeader></layoutHeader>
    </a-layout-header>
    <a-layout-content style="padding: 0">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <layoutMenu></layoutMenu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
         <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <layoutFooter></layoutFooter>
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import layoutMenu from "./layout-menu/index.vue";
import layoutFooter from "./layout-footer/index.vue";
import layoutHeader from "./layout-header/index.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    layoutMenu,
    layoutFooter,
    layoutHeader,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.ant-layout.ant-layout-has-sider {
  height: calc(100vh - 134px);
}

#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
