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
      <p class="small">point: 1</p>
      <p class="small">by: mrx</p>
    </b-card-text>
    <b-button size="sm" to="/about" variant="outline-info"
      >Show Detail</b-button
    >
  </b-card>
</template>

<script>
export default {
  name: "MyTask",
  props: ["item"],
};
</script>

<style></style>
