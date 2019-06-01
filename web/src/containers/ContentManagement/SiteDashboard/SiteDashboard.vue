<template>
  <div class="management-panel-container">
    <div class="panel-header">
      <span class="title">Manage Website Content</span>
      <input type="text" class="search-field" :placeholder="'Search ' + selectedNavItem.title">
    </div>
    <div class="panel-navigation">
      <ul class="nav-list">
        <li
          :class="['nav-list-item', { 'active': isNavSelected(item.title) }]"
          v-for="item in navigationCategories"
          :key="item.title"
          @click="selectNavItem(item.title)"
        >{{ item.title }}</li>
      </ul>
    </div>
    <div class="cta-group">
      <button class="create-cta" @click="handleCreateCTAClick">Create {{ selectedNavItem.title }}</button>
    </div>
    <div class="content">
      <table class="content-table">
        <thead class="table-header">
          <tr class="heading-list">
            <th
              v-for="column in selectedNavItemColumns"
              :key="column"
              class="heading-item"
            >{{ column }}</th>
          </tr>
        </thead>
        <tbody class="table-content">
          <tr class="content-list" v-for="content in tableContents" :key="content.id">
            <td class="content-item">{{ content.id }}</td>
            <td class="content-item">{{ content.descriptor }}</td>
            <td class="content-item">{{ content.createdAt }}</td>
            <td class="content-item">
              <div class="actions">
                <font-awesome-icon @click="editItem(content.id)" icon="edit" class="edit-icon"></font-awesome-icon>
                <font-awesome-icon
                  @click="deleteItem(content.id)"
                  icon="trash-alt"
                  class="delete-icon"
                ></font-awesome-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./SiteDashboard.js"></script>
<style src="./SiteDashboard.scss" lang="scss" scoped></style>
