<template>
  <div class="author-management">
    <template v-if="showEditForm">
      <form class="manage-authors-form">
        <text-input :layout="'row'" :disabled="true" :value="authorDetails.id">
          <template slot="label">ID</template>
        </text-input>
        <text-input :layout="'row'" v-model="name">
          <template slot="label">Name</template>
        </text-input>
        <div class="cta-group">
          <ApolloMutation
            :mutation="updateAuthorMutation"
            :variables="{ id: this.authorId,
                          name: this.name}"
            @done="handleMutationFinish"
            @error="handleMutationError"
          >
            <template slot-scope="{ mutate, loading, error }">
              <button class="edit-btn" @click="mutate()">
                <template v-if="loading">
                  <loading-spinner
                    :primaryColor="spinnerOptions.primaryColor"
                    :height="spinnerOptions.height"
                    :width="spinnerOptions.width"
                    :borderSize="spinnerOptions.borderSize"
                  ></loading-spinner>
                </template>
                <template v-else>Edit</template>
              </button>
            </template>
          </ApolloMutation>

          <button class="cancel-btn" @click="goBack">Go Back</button>
        </div>
      </form>
    </template>
    <template v-else>
      <form class="manage-authors-form">
        <text-input :layout="'row'" v-model="name">
          <template slot="label">Name</template>
        </text-input>
        <div class="cta-group">
          <ApolloMutation
            :mutation="createAuthorMutation"
            :variables="{
                name: this.name }"
            @done="authorCreated"
            @error="handleMutationError"
          >
            <template slot-scope="{ mutate, loading }">
              <button class="create-btn" @click="mutate()">
                <template v-if="loading">
                  <loading-spinner
                    :primaryColor="spinnerOptions.primaryColor"
                    :height="spinnerOptions.height"
                    :width="spinnerOptions.width"
                    :borderSize="spinnerOptions.borderSize"
                  ></loading-spinner>
                </template>
                <template v-else>Create</template>
              </button>
            </template>
          </ApolloMutation>
          <button class="cancel-btn" @click="goBack">Go Back</button>
        </div>
      </form>
    </template>
  </div>
</template>


<script src="./ManageAuthors.js"></script>
<style src="./ManageAuthors.scss" lang="scss" scoped></style>