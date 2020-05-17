<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div> -->
  <div id="board">
    <!-- Navbar -->
    <b-row
      style="margin: 0 -8px; padding: 0 8px;"
      align-h="between"
      align-v="center"
    >
      <h1>KamVan Board</h1>

      <b-button v-b-modal.modal-new-task size="sm" variant="primary"
        >New Task</b-button
      >
    </b-row>
    <!-- Board -->
    <b-row style="margin: 0 -8px;">
      <b-col
        sm="12"
        md="12"
        lg="3"
        style="padding: 0 8px"
        v-for="(category, idx) in categories"
        :key="idx"
      >
        <my-card
          :color="category.color"
          :name="category.name"
          :data="category.data"
        />
      </b-col>
    </b-row>

    <!-- Modal -->
    <my-modal modal-id="new-task" />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-unused-vars */
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import MyCard from "@/components/MyCard";
import MyModal from "@/components/MyModal";
import db from "@/db";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    MyCard,
    MyModal,
  },
  data() {
    return {
      categories: [
        {
          name: "Backlog",
          color: "danger",
          data: [],
        },
        {
          name: "To-Do",
          color: "warning",
          data: [],
        },
        {
          name: "Doing",
          color: "info",
          data: [],
        },
        {
          name: "Done",
          color: "success",
          data: [],
        },
      ],
    };
  },
  methods: {
    getData() {
      const vm = this;
      setTimeout(() => {
        db.map((el) => {
          switch (el.status) {
            case 0:
              vm.categories[0].data.push(el);
              break;
            case 1:
              vm.categories[1].data.push(el);
              break;
            case 2:
              vm.categories[2].data.push(el);
              break;
            case 3:
              vm.categories[3].data.push(el);
              break;
            default:
              break;
          }
        });
      }, 1570);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
#board {
  width: 90%;
  margin: auto;
}

h1 {
  margin: 14px 0;
}
</style>
