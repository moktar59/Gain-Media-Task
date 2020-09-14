<template>
  <ul>
    <li class="active">
        <router-link :to="{ name:'home' }" exact>Home</router-link>
    </li>
    <li>
        <router-link :to="{ name:'studentsList' }">Students</router-link>
    </li>
    <li>
        <router-link :to="{ name:'subjectsList' }" >Subjects</router-link>
    </li>
  </ul>
</template>

<script>
    export default {
    };
</script>

<style scoped>
  ul li {
    list-style-type: none;
    margin-top: 10px;
  }
</style>