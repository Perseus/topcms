<template>
    <div class="ui massive menu" >
       
        <div class="menu ">
            <div class="ui image">
                <a :href="APP_URL"><img :src="logoPath"  class="nav-logo"></a>
            </div>
        </div>
        <div class="right menu" v-if="user === null" >
            <div class="item">
               <a :href="registerPath"> <div class="ui primary button">Sign up</div></a>
            </div>
            <div class="item">
                <a :href="loginPath"><div class="ui button">Log in</div></a>
            </div>
        </div>
        <div class="right menu" v-else>
        
            <div class="item">
                <div class="ui dropdown pointing top right ">
                    <div class="text"><small>{{ this.user[0] }}</small></div><small><i class="dropdown icon"></i></small>
                    <div class="menu">
                        <div class="item"><a :href="accountLink"><small>Account Settings</small></a></div>
                        <div v-if="this.user[2] == 1" class="item"><small><a :href="panelLink">Admin Panel</a></small></div>
                    </div>
                </div>

            </div>
            <div class="item ">
                <form method="POST" :action="logoutPath">
                    <button type="submit" class="ui button">Logout</button>
                    <input type="hidden" name="_token" id="csrf-token" :value="csrfToken" />
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        created() {
            this.user = USER;
            this.APP_URL = APP_URL;
        },
        props: ['config'],

        data() {
            return {
                logoPath: `${APP_URL}/${this.config.logoPath}`,
                registerPath: `${APP_URL}/register`,
                loginPath: `${APP_URL}/login`,
                logoutPath: `${APP_URL}/logout`,
                accountLink: `${APP_URL}/account`,
                panelLink: `${APP_URL}/panel`, 
                csrfToken: window.csrfToken,
            };
        }

    }
</script>



<style>

.nav-logo {
    padding: 10px;
    width: 14em;
}

</style>