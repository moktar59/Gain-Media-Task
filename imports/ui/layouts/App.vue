<template>
    <div>        
        <b-container fluid="sm">
            <b-row class="text-center">
                <b-col class="custom-theme"><h1>Gain Solutions Task</h1></b-col>
            </b-row>
            <b-row>
                <b-col class="custom-theme sidebar-col">
                    <SidebarLink />
                </b-col>
                <b-col cols="10">
                    <router-view></router-view>                    
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import SidebarLink from './SidebarLink';

    export default {
        components: {
            SidebarLink
        },
        data() {
            return {};
        }
    };
</script>

<style>
    .custom-theme {
        background: #343a40;
        color: #ffffff;
    }

    .sidebar-col {
        min-height: 800px;
        padding: 0px;
        margin: 0px;
    }

    .page-header {
        margin-top: 5px;
    }
    a {
        color: #ffffff
    }
    
</style>