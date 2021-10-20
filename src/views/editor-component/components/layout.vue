<template>
  <div class="c-layout">
    <slot name="header" />
    <div class="c-center">
      <div class="c-layout__sidebar">
        <slot name="sidebar" />
      </div>
      <div class="c-layout__wrap">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../var';
.c-layout {
  width: 100%;
  .c-center {
    display: flex;
    height: calc(100vh - @header-height);
    overflow: hidden;
  }
  &__sidebar {
    flex-shrink: 0;
  }
  &__wrap {
    flex-grow: 1;
  }
}
</style>
