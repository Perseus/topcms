<template>
  <div class="filtered-accounts">
    <h1 class="is-size-3">Results</h1>
    <b-table
      :data="filteredCharacters"
      :paginated="true"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-position="'top'"
      :loading="isRetrievingCharacters"
      :total="totalFilteredCharacters"
      :backend-pagination="true"
      default-sort="user.first_name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @page-change="handlePageChange"
    >
      ssssssssssssssssssssssssssssssssssssss
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.row.cha_id }}</b-table-column>
        <b-table-column field="name" label="Name">{{ props.row.cha_name }}</b-table-column>
        <b-table-column field="account_name" label="Account Name">
          <a
            @click.prevent="viewAccountInDetail(props.row.account.act_id)"
            class="has-text-link"
          >{{ props.row.account.act_name }}</a>
        </b-table-column>
        <b-table-column field="level" label="Level">{{ props.row.degree }}</b-table-column>
        <b-table-column field="guild" label="Guild">{{ props.row.guild.guild_name }}</b-table-column>
        <b-table-column field="gold" label="Gold">{{ props.row.gd }}</b-table-column>
        <b-table-column field="action" label="Actions">
          <b-button
            type="is-primary"
            @click="viewCharacterInDetail( props.row.cha_id )"
          >View in detail</b-button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script src="./Characters.js"></script>
<style src="./Characters.scss" lang="scss" scoped></style>