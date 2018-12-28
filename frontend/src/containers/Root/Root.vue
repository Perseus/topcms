<template>
  
  <div class="app-container">
    
    <Modal v-if="$store.state.DISPLAY_AUTH_MODAL">
      <template slot="body">
          <AuthModal
            @onCloseAuthModal="onCloseAuthModal"
          ></AuthModal>
      </template>
    </Modal>
    <Sidebar></Sidebar>

    <div class="content-container">

      <Navbar
        @onOpenAuthModal="openAuthModal"
      >
      </Navbar>

      <div class="content">
        {{ $store.state.displayModal }}
        <router-view></router-view>
      </div>
      
    </div>
  
  </div>

</template>

<script src="./Root.js"></script>
<style src="./Root.scss" lang="scss"></style>zl