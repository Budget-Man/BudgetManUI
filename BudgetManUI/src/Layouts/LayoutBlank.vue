<template>
  <div>
    <router-view />
  </div>
</template>
  
  
<style>
.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.el-menu {
  border-right: none;
}

.el-main {
  padding: 0;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}</style>