<template>
  <div class="card">
    <div class="card-content is-medium">
      <div class="is-size-5 card-title">Staff Status</div>
      <b-loading
        :is-full-page="false"
        :active.sync="isFetchingStaffInfo"
        :can-cancel="false"
        v-if="isFetchingStaffInfo"
      ></b-loading>
      <ul class="staff-list" v-else>
        <li class="staff-item" v-for="(staff) in staffInfo" :key="staff.name">
          <span class="is-size-6 has-text-info">[{{ staff.type }}] {{ staff.name }}</span>
          <div
            :class="['staff-indicator', { 'has-background-success': isStaffOnline( staff.is_online ), 'has-background-danger': !isStaffOnline( staff.is_online ) } ]"
          ></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./StaffStatusContainer.js"></script>
<style src="./StaffStatusContainer.scss" lang="scss" scoped></style>