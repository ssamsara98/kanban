<template>
  <b-card
    tag="article"
    class="mb-2"
    :header="name"
    :header-bg-variant="color"
    header-text-variant="white"
    body-class="p-3"
  >
    <draggable v-model="items" group="task" :sortable="false" @add="add">
      <my-task v-for="item in items" :key="item.id" :item="item" />
    </draggable>
  </b-card>
</template>

<script>
import Draggable from "vuedraggable";

import MyTask from "@/components/MyTask";
import { firestore } from "../api/firebase";

export default {
  name: "MyCard",
  components: {
    MyTask,
    Draggable,
  },
  props: ["color", "name", "data", "status"],
  data() {
    return {
      items: this.data,
    };
  },
  methods: {
    add(evt) {
      const id = evt.item._underlying_vm_.id;
      const kanban = firestore.collection("kanban").doc(id);
      kanban.update({ status: this.status }).catch((err) => {
        console.error(err);
      });
    },
  },
  watch: {
    data() {
      this.items = this.data;
    },
  },
};
</script>

<style></style>
