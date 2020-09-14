<template>
<div>
    <br/>  
        <b-row class="text-center">
            <b-col class="title-text"><h2>{{ this.head.pageTitle }}</h2></b-col>
            <b-col cols="2">
                <b-button>
                    <router-link :to="{ name: this.head.routeName }">{{ this.head.linkType}}</router-link>
                </b-button>
            </b-col>
        </b-row>  
        
        <hr v-if="this.head.linkType === 'List'"/>
</div>
</template>

<script>
    export default {
        props: ["head"]
    };
</script>