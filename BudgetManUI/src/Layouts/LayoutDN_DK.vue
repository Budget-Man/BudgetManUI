<template>
  <el-container>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @select="handleSelect">
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1">Login</el-menu-item>
      <el-menu-item index="2">Register</el-menu-item>
    </el-menu>

    <el-container>
      <el-aside width="200px"></el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-container {
  height: 600px;
}

.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.el-footer {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.flex-grow {
  flex-grow: 1;
}

.el-menu {
  border-right: none;
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.el-main {
  padding: 10px;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}</style>