<template>

  <div class="sidebar">
    
    <img class="sidebar__brand" src="../../assets/img/logo.png">
    <div class="sidebar__container">
      <ul class="sidebar__nav">
          <li class="sidebar__nav-item-wrapper sidebar__nav-item-wrapper--active">
            <font-awesome-icon :icon="[ 'far', 'newspaper' ]" size="xs" class="sidebar__nav-icon"></font-awesome-icon>
            <span class="sidebar__nav-item"> News </span>
          </li>
          <li class="sidebar__nav-item-wrapper">
            <font-awesome-icon :icon="[ 'far', 'image' ]" size="xs" class="sidebar__nav-icon"></font-awesome-icon>
            <span class="sidebar__nav-item"> Media </span>
          </li>
          <li class="sidebar__nav-item-wrapper">
            <font-awesome-icon icon="shopping-cart"  size="xs" class="sidebar__nav-icon"></font-awesome-icon>
            <span class="sidebar__nav-item"> Shop </span>
          </li>
          <li class="sidebar__nav-item-wrapper">
            <font-awesome-icon icon="download"  size="xs" class="sidebar__nav-icon"></font-awesome-icon>
            <span class="sidebar__nav-item"> Downloads </span>
          </li>
      </ul>
    </div>
    
  </div>
  
</template>


<style lang="scss" src="./Sidebar.scss"></style>
<script src="./Sidebar.js"></script>