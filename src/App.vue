<template>
  <router-view v-slot="{ Component }">
    <keep-alive max="10">
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

html {
  font-size: calc(100vw / 750);
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
  position: relative;

  b {
    font-weight: 500;
  }
}

.el-message {
  font-size: 32rem;

  p {
    font-size: 22rem;
  }
}

.i-dou {
  width: 24rem;
}

.i-ex {
  width: 39rem;
  height: 39rem;
}

.el-divider--horizontal {
  margin: 24rem 0;
}
</style>
