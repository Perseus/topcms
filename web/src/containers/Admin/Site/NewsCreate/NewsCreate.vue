<template>
  <section class="news-create-section">
    <div class="card">
      <header class="card-header">
        <h3 class="card-header-title">Create News Article</h3>
      </header>
      <form @submit.prevent="handleCreateNews" class="news-create-form">
        <div class="card-content">
          <b-field
            label="Title"
            :type="{ 'is-danger': errors.has('title') }"
            :message="errors.first('title')"
          >
            <b-input
              type="text"
              :value="title"
              name="title"
              v-validate="'required|min:4'"
              v-model="title"
            ></b-input>
          </b-field>
          <b-field label="Author">
            <h3
              class="is-size-6 has-text-danger"
              v-if="authors.length === 0"
            >No authors found! Please create an author.</h3>
            <b-dropdown v-else v-model="author" aria-role="list">
              <button class="button is-primary" type="button" slot="trigger">
                <span>{{ currentAuthorDetails.name }}</span>
                <b-icon icon="caret-down" size="is-small"></b-icon>
              </button>
              <b-dropdown-item
                v-for="(authorItem) in authors"
                :key="authorItem.id"
                :value="authorItem.id"
                aria-role="listitem"
              >{{ authorItem.name }}</b-dropdown-item>
            </b-dropdown>
          </b-field>
          <b-field
            label="Content"
            :type="{ 'is-danger': errors.has('content') }"
            :message="errors.first('content')"
          >
            <froala
              id="edit"
              :tag="'textarea'"
              v-validate="'required'"
              name="content"
              v-model="content"
            ></froala>
          </b-field>
        </div>
        <footer class="card-footer">
          <b-button type="is-primary" native-type="submit" :loading="isLoading">Create Article</b-button>
        </footer>
      </form>
    </div>
  </section>
</template>


<script src="./NewsCreate.js"></script>
<style src="./NewsCreate.scss" scoped lang="scss"></style>