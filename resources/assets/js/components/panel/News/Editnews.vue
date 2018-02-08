<template>
    <div>
        <div class="ui attached segment">
            <div class="ui form">
                <form @submit.prevent>
                    <div class="field">
                        <label for="">Title</label>
                        <input type="text" name="title" placeholder="News title" v-model="title" >
                    </div>
                    <div class="field">
                        <label for="">Author</label>
                        <select name="author" id="author" v-model="author">
                            <option v-for="(key, index) in this.authors" :value="key.id" :key="index">
                                {{ key.name }}
                            </option>
                        </select>
                    </div>
                    <div class="field">
                        <label for="">Category</label>
                        <select name="category" id="category" v-model="category">
                            <option v-for="(key, index) in this.categories" :value="key.id" :key="index">
                                {{ key.title }}
                            </option>
                        </select>
                    </div>
                    <div class="field">
                        <label for="">Content</label>
                         <froala :tag="'textarea'" v-model="content"></froala>
                    </div>
                    
                    <button class="ui button" type="submit" @click="editNews">Submit</button>
                </form>
            </div>
            <div class="ui error message" v-if="this.errors.length != 0">
                <div class="header">Error</div>
                <ul>
                    <li v-for="(error, index) in this.errors" :key="index"> {{ error }} </li>
                </ul>
            </div>
        </div>
    </div>

</template>




<script>


    export default {


        
        created() {
            this.articleData = article[0];
            this.title = this.articleData.title;
            axios.get('/authors/get')
            .then((response) => {
                this.authors = response.data;
            })
            .catch((error) => {
                console.log(error);
            });


            axios.get('/newsCat/get')
            .then((response) => {
                this.categories = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
            this.author = this.articleData.author.id;
            this.category = this.articleData.category;
            this.content = this.articleData.content;
        },




        data() {
            return {
                authors: [],
                title: "",
                author : "",
                content: "",
                category: "",
                errors: [],
                categories: [],
                articleData: [],
            
            }
        },



        methods: {
            editNews() {
                if(this.validateForm()) {
                    axios.post(`/panel/news/edit/${this.articleData.id}`, {
                        'title': this.title,
                        'author': this.author,
                        'content': this.content,
                        'category': this.category
                    })
                    .then((response) => {
                        console.log(response);
                        if(response.data.error != null) {
                            this.errors = [];
                            this.errors.push(response.data.error);
                        } else if(response.data.success != null) {
                            this.refreshForm();
                            toastr.success("News article edited! Redirecting to panel.");
                            window.setTimeout(() => {
                                window.location = APP_URL + response.data.url;
                            }, 2000);
                        }

                    })
                    .catch((error) => {
                        if(error) {
                            console.log(error);
                            this.errors = [];
                            this.errors.push("Please make sure all the fields are filled.");
                        }
                    });
                }
            },

            validateForm() {
                this.errors = [];
                if(this.title == '' || this.title == null) {
                    this.errors.push('Please enter a title');
                }
                if(this.author == '' || this.author == null) {
                    this.errors.push('Please select an author');
                }
                if(this.content == '' || this.content == null) {
                    this.errors.push('Please enter some content');
                }
                if(this.category == '' || this.category == null) {
                    this.errors.push('Please select a category');
                }
                if(this.errors.length > 0) {
                    return false;
                }
                return true;
            },

            refreshForm() {
                this.title = '';
                this.author = '';
                this.content = '';
                this.category = '';
            }
            
        }






    }

</script>
