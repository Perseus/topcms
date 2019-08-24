<template>
  <div class="ranking-section">
    <h1 class="is-size-2 has-text-centered">Player Ranking</h1>

    <div class="filters">
      <h1 class="is-size-3 filter-heading">Filters</h1>

      <div class="block">
        <b-radio v-model="playerFilter" name="gold" native-value="gold">Gold</b-radio>
        <b-radio v-model="playerFilter" name="level" native-value="level">Level</b-radio>
      </div>
      <hr />

      <b-table :data="playerRanking" :loading="isRetrievingPlayerRanking">
        <template slot-scope="props">
          <b-table-column field="rank" label="Rank" width="40" numeric>{{ props.index + 1 }}</b-table-column>
          <b-table-column field="name" label="Player Name">{{ props.row.cha_name }}</b-table-column>
          <b-table-column
            field="gold"
            label="Gold"
            v-if="playerFilter === 'gold'"
          >{{ props.row.gd }}</b-table-column>
          <b-table-column
            field="level"
            label="Level"
            v-if="playerFilter === 'level'"
          >{{ props.row.degree }}</b-table-column>
          <b-table-column field="job" label="Class">{{ props.row.job }}</b-table-column>
          <b-table-column field="guild" label="Guild">{{ getPlayerGuild( props.row.guild ) }}</b-table-column>
        </template>
      </b-table>
    </div>
    <!-- <b-tabs type="is-toggle" :animated="false" expanded>
      <b-tab-item label="Player Ranking"></b-tab-item>
      <b-tab-item label="Guild Ranking">guild ranking</b-tab-item>
    </b-tabs>-->
  </div>
</template>

<script src="./Ranking.js"></script>
<style src="./Ranking.scss" lang="scss" scoped></style>