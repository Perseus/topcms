<template>
  <div class="ranking-section">
    <b-tabs type="is-toggle" :animated="false" expanded>
      <b-tab-item label="Player Ranking">
        <div class="filters">
          <h1 class="is-size-3 filter-heading">Filters</h1>

          <div class="block">
            <b-radio v-model="playerFilter" name="gold" native-value="GOLD">Gold</b-radio>
            <b-radio v-model="playerFilter" name="level" native-value="LEVEL">Level</b-radio>
          </div>
          <hr />

          <div class="no-rankings-found" v-if="!areThereAnyPlayers">No players found</div>
          <b-table :data="playerRanking" :loading="isRetrievingPlayerRanking" v-else>
            <template slot-scope="props">
              <b-table-column field="rank" label="Rank" width="40" numeric>{{ props.index + 1 }}</b-table-column>
              <b-table-column field="name" label="Player Name">{{ props.row.cha_name }}</b-table-column>
              <b-table-column
                field="GOLD"
                label="Gold"
                v-if="playerFilter === 'GOLD'"
              >{{ props.row.gd }}</b-table-column>
              <b-table-column
                field="LEVEL"
                label="Level"
                v-if="playerFilter === 'LEVEL'"
              >{{ props.row.degree }}</b-table-column>
              <b-table-column field="job" label="Class">{{ props.row.job }}</b-table-column>
              <b-table-column field="guild" label="Guild">{{ getPlayerGuild( props.row.guild ) }}</b-table-column>
            </template>
          </b-table>

        </div>
      </b-tab-item>
      <b-tab-item label="Guild Ranking">
        <div class="no-rankings-found" v-if="!areThereAnyGuilds">No guilds found</div>
        <b-table :data="guildRanking" :loading="isRetrievingGuildRanking">
          <template slot-scope="props">
            <b-table-column field="rank" label="Rank" width="40" numeric>{{ props.index + 1 }}</b-table-column>
            <b-table-column field="name" label="Guild Name">{{ props.row.guild_name }}</b-table-column>
            <b-table-column field="leader" label="Leader">{{ props.row.leader.cha_name }}</b-table-column>
            <b-table-column field="total" label="Total Members">{{ props.row.member_total }}</b-table-column>
          </template>
        </b-table>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script src="./Ranking.js"></script>
<style src="./Ranking.scss" lang="scss" scoped></style>