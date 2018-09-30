<style lang="less" scoped>
.error404 {
  padding-top: 80px;

  .title {
    text-align: center;
    font-size: 240px;
    font-weight: 700;
    color: #2d8cf0;
    height: 260px;
    line-height: 260px;
  }
  .message {
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 12px;
    color: #dddde2;
    animation: error404animation 3s ease 0s infinite alternate;
  }
  .btn-con {
    text-align: center;
    padding: 20px 0;
    margin-bottom: 40px;
  }
}

@keyframes error404animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-60deg);
  }
  40% {
    transform: rotateZ(-10deg);
  }
  60% {
    transform: rotateZ(50deg);
  }
  80% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>

<template>
  <div class="error404">
    <div class="title">404</div>
    <p class="message">施工中...</p>
    <div class="btn-con">
      <button class="csButton" @click="goHome" size="large" style="width: 200px;" type="text">返回首页</button>
      <button class="csButton" @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',

  methods: {
    backPage () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
