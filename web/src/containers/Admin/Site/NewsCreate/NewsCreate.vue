<template>
  <section class="news-create-section">
    <div class="card news-create-card">
      <header class="card-header">
        <h3 class="card-header-title">Create News Article</h3>
      </header>
      <ValidationObserver v-slot="{ handleSubmit }">

        <form @submit.prevent="handleSubmit(handleCreateNews)" class="news-create-form">
          <div class="card-content">
            <TInput v-model="title" name="Title" label="Title" rules="required|min:4" />
            <b-field label="Author">
              <h3
                class="is-size-6 has-text-danger"
                v-if="authors.length === 0"
              >No authors found! Please create an author.</h3>
              <b-dropdown v-else v-model="author" aria-role="list">
                <button class="button is-primary" type="button" slot="trigger">
                  <span>{{ currentAuthorDetails.name }}</span>
                  <b-icon icon="caret-down" size="is-small" pack="fas"></b-icon>
                </button>
                <b-dropdown-item
                  v-for="(authorItem) in authors"
                  :key="authorItem.id"
                  :value="authorItem.id"
                  aria-role="listitem"
                >{{ authorItem.name }}</b-dropdown-item>
              </b-dropdown>
            </b-field>
            <ValidationProvider
              rules="required"
              immediate
              v-slot="{ errors, valid }"
              name="Content">
              <b-field
                label="Content"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
               <ck-editor :editor="editor" v-model="content"></ck-editor>
              </b-field>
            </ValidationProvider>
          </div>
          <footer class="card-footer">
            <b-button type="is-primary" native-type="submit" :loading="isLoading">Create Article</b-button>
          </footer>
        </form>

      </ValidationObserver>
    </div>
  </section>
</template>


<script src="./NewsCreate.js"></script>
<style src="./NewsCreate.scss" scoped lang="scss"></style>