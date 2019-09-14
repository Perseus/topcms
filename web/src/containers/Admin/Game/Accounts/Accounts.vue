<template>
  <div class="filtered-accounts">
    <h1 class="is-size-3">Results</h1>
    <b-table
      :data="filteredAccounts"
      :paginated="true"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-position="'top'"
      :loading="isRetrievingAccounts"
      :total="totalFilteredAccounts"
      :backend-pagination="true"
      default-sort="user.first_name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @page-change="handlePageChange"
    >
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.row.id }}</b-table-column>
        <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
        <b-table-column field="last_login_ip" label="Last Login IP">{{ props.row.last_login_ip }}</b-table-column>
        <b-table-column field="last_login_mac" label="Last Login MAC">{{ props.row.last_login_mac }}</b-table-column>
        <b-table-column field="ban" label="Ban Status">
          <div class="field">
            <b-switch
              :value="getBanStatus( props.row.ban ) "
              type="is-danger"
              @input="handleBanForUser( props.row.id, props.row.ban )"
            >{{ !getBanStatus( props.row.ban ) ? 'Not Banned' : 'Banned' }}</b-switch>
          </div>
        </b-table-column>
        <b-table-column field="action" label="Actions">
          <b-button type="is-primary" @click="viewAccountInDetail( props.row.id )">View in detail</b-button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script src="./Accounts.js"></script>
<style src="./Accounts.scss" lang="scss" scoped></style>