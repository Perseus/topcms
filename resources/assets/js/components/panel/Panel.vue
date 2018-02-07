<template>
<div>


    <div class="ui attached segment">
        <h4 class="ui top attached header"> News </h4>
        <div class="ui attached segment">
                <table class="ui celled table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            <th>Last Updated</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(newsItem, index) in NewsItems" :key="index">
                            <td> <span v-if="index==0"><div class="ui green ribbon label">New</div> </span>{{ newsItem.title }} </td>
                            <td> <span v-html="truncateContent(newsItem.content)"></span>..</td>
                            <td> {{ newsItem.author.name }} </td>
                            <td> {{ newsItem.created_at }}</td>
                            <td> <small><a :href="newsEditLink + newsItem.id">Edit</a></small><br />
                                 <small><a :href="newsDeleteLink + newsItem.id">Delete</a></small></td>
                        </tr>
                    </tbody>
                </table>
              
                        <a :href="newsCreateLink">
                            <i class="newspaper icon"></i> Create a news article
                        </a>
                 
          
                
        </div>
    </div>
    <div class="ui attached segment">
        <h4 class="ui top attached header"> Downloads </h4>
        <div class="ui attached segment">
        </div>
    </div>
</div>
</template>

<script>
    
    export default {
        
        created() {
            axios.get('/news/small')
                 .then((response) => {
                     this.NewsItems = response.data;
                 })
                 .catch((error) => {
                     console.log(error);
                 });
        },


        data() {
            return {
                NewsItems: [],
                newsEditLink: `${APP_URL}/news/edit/`,
                newsDeleteLink: `${APP_URL}/news/delete/`,
                newsCreateLink: `${APP_URL}/news/create/`,
                truncateLength: 15,
            }
        },


        methods: {
            truncateContent(content) {
                return content.substring(0, this.truncateLength);
            }
        }



    }
</script>