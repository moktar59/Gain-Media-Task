<template>
  <ul class="sidebar">
    <li v-bind:class="{'li-active': 'home' == routeName}">
        <router-link :to="{ name:'home' }" exact>Home </router-link>
    </li>
    <li v-bind:class="{'li-active': 'studentsList' == routeName}">
        <router-link :to="{ name:'studentsList' }">Students</router-link>
    </li>
    <li v-bind:class="{'li-active': 'subjectsList' == routeName}">
        <router-link :to="{ name:'subjectsList' }" >Subjects</router-link>
    </li>
  </ul>
</template>

<script>
    export default {
      data() {
        return {
          routeName: 'sss'
        };
      },
      watch: {
        '$route': function(to, from) {
          this.routeName = to.name;
        }
      }
    };
</script>

<style scoped>
  .sidebar {
    padding: 0px;
    margin: 0px;
  }
  ul li {
    list-style-type: none;
    padding: 10px
  }
  .li-active {
    background: #576384;
  }

</style>