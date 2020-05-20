<template>
  <div id="board">
    <!-- Navbar -->
    <b-row
      style="margin: 0 -8px; padding: 0 8px;"
      align-h="between"
      align-v="center"
    >
      <h1>KamVan Board</h1>

      <b-button v-b-modal="`modal-${modalNewTask}`" size="sm" variant="primary">
        New Task
      </b-button>
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
          :status="category.status"
        />
      </b-col>
    </b-row>

    <!-- Modal -->
    <!-- Modal - New Task -->
    <my-modal-new-task :modal-id="modalNewTask" />
    <!-- Modal - Detail -->
    <my-modal-task-detail :modal-id="modalItemDetail" />
  </div>
</template>

<script>
// @ is an alias to /src
import MyCard from "@/components/MyCard";
import MyModalNewTask from "@/components/MyModalNewTask";
import MyModalTaskDetail from "@/components/MyModalTaskDetail";
import { firestore } from "../api/firebase";

export default {
  name: "Home",
  components: {
    MyCard,
    MyModalNewTask,
    MyModalTaskDetail,
  },
  data() {
    return {
      modalNewTask: "new-task",
      modalItemDetail: "item-detail",
      categories: [
        {
          name: "Backlog",
          color: "danger",
          status: 0,
          data: null,
        },
        {
          name: "To-Do",
          color: "warning",
          status: 1,
          data: null,
        },
        {
          name: "Doing",
          color: "info",
          status: 2,
          data: null,
        },
        {
          name: "Done",
          color: "success",
          status: 3,
          data: null,
        },
      ],
    };
  },
  methods: {
    getData(database) {
      const vm = this;
      // cleaning
      for (const category of vm.categories) {
        category.data = [];
      }
      // filling
      for (const item of database) {
        switch (item.status) {
          case 0:
            vm.categories[0].data.push(item);
            break;
          case 1:
            vm.categories[1].data.push(item);
            break;
          case 2:
            vm.categories[2].data.push(item);
            break;
          case 3:
            vm.categories[3].data.push(item);
            break;
          default:
            break;
        }
      }
    },
    getFirestore() {
      const kanban = firestore.collection("kanban").orderBy("createdAt", "asc");
      kanban.onSnapshot(
        (querySnapshot) => {
          const database = [];
          querySnapshot.forEach((doc) => {
            const item = {
              id: doc.id,
              ...doc.data(),
            };
            database.push(item);
          });
          this.getData(database);
        },
        (err) => {
          console.error(`Encountered error: ${err}`);
        }
      );
    },
  },
  created() {
    this.getFirestore();
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
