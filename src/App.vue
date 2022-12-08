<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
  </router-view>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100vw;
  min-height: 100vh;
  margin: auto !important;
  font-family: "Microsoft YaHei", sans-serif;
  font-weight: 400;
  color: #343434;
  background-color: #eee;
  overflow: hidden;

  b {
    font-weight: 500;
  }
}

.el-message {
  font-size: 1.5rem;
  top: unset !important;
  bottom: 20px;

  p {
    font-size: 1.5rem;
    line-height: 3rem;
  }
}
</style>
