<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{error}}
        </div>

        <div v-else>
            <div id="projects">
                <div class="secret-headline">
                    head line
                </div>
                <header>
                    <div class="headline">
                        <a>
                            <strong>FindHopes</strong>
                        </a>
                        <button class="button-signup"  onclick="window.location.href='http://localhost:8080/account'">My account</button>
                        <div class="button-base">

                            <button class="button-signup" onclick="window.location.href='http://localhost:8080/register'">Sign up</button>
                            <button class="button-signup" onclick="window.location.href='http://localhost:8080/login'">Log in</button>
                        </div>
                    </div>
                </header>

                <div v-for="project in projects">
                    <div class="each-block" >
                        <img v-bind:src="'http://csse-s365.canterbury.ac.nz:5199/api/v2/' + project.imageUri" alt="error" height="400" width="350">
                        <div class="title-format"><strong>{{ project.title }}</strong></div>
                        <div class="subtitle-format"><small>{{ project.subtitle }}</small></div>
                        <div class="button-details">
                            <router-link :to="{name: 'project', params:{ projectId: project.id}}">
                                View
                            </router-link>
                        </div>
                    </div>
                </div>


                <footer>
                    <h6>FindHopes@2017</h6>
                </footer>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data (){
            return{
                error:"",
                errorFlag: false,
                projects:[],
                project:null,
                msg:"",
            }
        },
        mounted: function () {
            this.getProjects();
        },
        methods: {
            getProjects: function () {
                this.$http.get('http://csse-s365.canterbury.ac.nz:5199/api/v2/projects')
                    .then(function (response) {
                        this.projects = response.data;
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
        }
    }
</script>