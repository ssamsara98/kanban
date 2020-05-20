<template>
  <b-card
    :header="item.title"
    header-class="lead"
    class="my-2"
    border-variant="dark"
    header-border-variant="dark"
  >
    <template slot="header">
      <strong>{{ item.title }}</strong>
    </template>
    <b-card-text>
      <p class="small">Created by: {{ item.creator }}</p>
    </b-card-text>
    <b-button block size="sm" variant="outline-info" @click="showModalDetail">
      Show Detail
    </b-button>
  </b-card>
</template>

<script>
import { EventBus } from "../eventBus";

export default {
  name: "MyTask",
  props: ["item"],
  methods: {
    showModalDetail() {
      EventBus.$emit("showModalDetail", this.item);
    },
  },
};
</script>

<style></style>
