<template>
  <b-card
    tag="article"
    class="mb-2"
    :header="name"
    :header-bg-variant="color"
    header-text-variant="white"
    body-class="p-3"
  >
    <my-task v-for="item in data" :key="item.id" :item="item" />
  </b-card>
</template>

<script>
import MyTask from "@/components/MyTask";

export default {
  name: "MyCard",
  components: {
    MyTask,
  },
  props: ["color", "name", "data"],
};
</script>

<style></style>
