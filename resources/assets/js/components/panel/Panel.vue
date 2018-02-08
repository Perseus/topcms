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
                                 <small><a href="#" @click="openModal(newsItem.id)">Delete</a></small></td>
                           
                        </tr>
                        <tr> 
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><a :href="newsViewLink">View all</a></td>
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
     <div class="ui basic modal">
        <div class="ui icon header">
            <i class="archive icon"></i>
            Delete news article
        </div>
        <div class="content">
            Are you sure you want to delete this news article? 
        </div>
        <div class="actions">
            <div @click="dontDeleteNews" class="ui red basic cancel inverted button">
                <i class="remove icon"></i>
                No
            </div>
            <div @click="deleteNews" class="ui green ok inverted button">
                <i class="checkmark icon"></i>
                Yes
            </div>
        </div>
     </div>
</div>
</template>

<script>
    
    export default {
        
        created() {
            this.getNewsFeed();
        },


        data() {
            return {
                NewsItems: [],
                newsEditLink: `${APP_URL}/panel/news/edit/`,
                newsDeleteLink: `${APP_URL}/panel/news/delete/`,
                newsCreateLink: `${APP_URL}/panel/news/create/`,
                newsViewLink: `${APP_URL}/panel/news/view/`,
                truncateLength: 15,
                currentNewsItem: 0,
            }
        },


        methods: {
            truncateContent(content) {
                return content.substring(0, this.truncateLength);
            },

            openModal(id) {
                this.currentNewsItem = id;
                $('.ui.basic.modal')
                .modal('show');
            },

            deleteNews() {
                if(this.currentNewsItem != 0) {
                    axios.post(`/panel/news/delete/${this.currentNewsItem}`, {})
                    .then((response) => {
                        if(response.data.success == true) {
                            toastr.success("News article has been deleted. Refreshing news list");
                            this.getNewsFeed();
                        } else if(response.data.error) {
                            toastr.error(response.data.error);
                        }
                        
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            },

            dontDeleteNews() {
                this.currentNewsItem = 0;
            },


            getNewsFeed() {
                 axios.get('/news/small')
                 .then((response) => {
                     this.NewsItems = response.data;
                 })
                 .catch((error) => {
                     console.log(error);
                 });
            }
        }



    }
</script>