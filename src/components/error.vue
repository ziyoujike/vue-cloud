<script lang="ts" setup>
import { reactive, onBeforeUnmount, onMounted } from "vue";
import errImage403 from "@/assets/images/403.png";
import { useRouter } from 'vue-router'
const router = useRouter()

// 组件接收参数
const props = defineProps({
  errInfo: {
    type: Object,
    default: () => {
      return {
        errTitle: "抱歉!",
        errReason: "您没有操作角色...",
        errSolution: "当前帐号没有操作角色,请联系管理员。",
        errImage: errImage403,
      }
    }
  },
})

const state = reactive({
  count: 5,
  timer: 0,
  errImage: errImage403,
});

// 倒计时
const countDown = () => {
  state.timer = setInterval(() => {
    state.count--;
    if (state.count <= 0) {
      clearInterval(state.timer)
      router.push('/')
      return
    }
  }, 1000);
};

// 当前组件卸载之前清除定时器
onBeforeUnmount(() => {
  clearInterval(state.timer);
});

// 倒计时开始
onMounted(() => {
  countDown();
});
</script>

<template>
  <div class="error-container flex-center">
    <div class="content flex-s-b">
      <div class="img-box">
        <img class="img-err" :src="errInfo.errImage || state.errImage" alt="403" />
        <img
          class="img-cloud"
          src="./../assets/images/cloud.png"
          alt="cloud"
        />
      </div>
      <div class="text-list">
        <h2 class="err-title text-anim">{{ errInfo.errTitle || "抱歉!" }}</h2>
        <p class="err-reason text-anim">
          {{ errInfo.errReason || "当前网络繁忙..." }}
        </p>
        <p class="err-solution text-anim">
          {{ errInfo.errSolution || "网络繁忙,请刷新重试。" }}
        </p>
        <div class="btn-back-index text-anim flex-center" @click="router.push('/')">
          <span>{{ state.count || "0" }}s 返回首页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  width: 100%;
  min-height: 400px;

  .content {
    width: 460px;

    .img-box {
      position: relative;
      width: 225px;

      .img-err {
        width: 225px;
        height: 204px;
        object-fit: contain;
      }

      .img-cloud {
        position: absolute;
        right: -30px;
        top: 30px;
        width: 80px;
        animation: fadeInLeft 2.4s linear 1s forwards;
        opacity: 0;
      }
    }

    .text-list {
      margin-top: 20px;

      .err-title {
        font-size: 30px;
        color: rgba(0, 0, 0, 0.65);
        font-weight: bold;
        animation-delay: 0.2s;
      }

      .err-reason {
        font-size: 20px;
        font-weight: bold;
        animation-delay: 0.3s;
      }

      .err-solution {
        margin-top: 6px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
        animation-delay: 0.4s;
      }

      .btn-back-index {
        margin-top: 30px;
        width: 110px;
        height: 36px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: #1890ff;
        border-radius: 100px;
        animation-delay: 0.5s;
      }
      
      .text-anim {
        opacity: 0;
        animation-name: fadeInTop;
        animation-fill-mode: forwards;
        animation-duration: 0.5s;
      }
    }
  }
}

@keyframes fadeInLeft {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(-150px, 120px);
    opacity: 0;
  }
}
@keyframes fadeInTop {
  0% {
    transform: translate(0, 30px);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
