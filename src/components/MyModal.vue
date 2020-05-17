<template>
  <!-- <b-modal id="modal-new" title="New Task"> -->
  <b-modal :id="`modal-${modalId}`" title="New Task">
    <p class="my-4">Hello from modal!</p>
    {{ `modal-${modalId}` }}

    <!-- footer -->
    <template slot="modal-footer">
      <b-button @click="closeModal">Cancel</b-button>
      <b-button variant="success" @click="closeModal">Save</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "MyModal",
  props: ["modal-id"],
  methods: {
    closeModal() {
      this.$root.$emit("bv::hide::modal", `modal-${this.modalId}`);
    },
  },
};
</script>

<style></style>
