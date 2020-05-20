<template>
  <!-- <b-modal id="modal-new" title="New Task"> -->
  <b-modal
    :id="`modal-${modalId}`"
    title="New Task"
    footer-class="justify-content-between"
    @hide="newTaskReset"
  >
    <b-form @submit="newTaskCreate">
      <!-- title -->
      <b-form-group
        id="task-title"
        label="Title:"
        label-for="task-title-input"
        description="Title for the Task"
      >
        <b-form-input
          id="task-title-input"
          type="text"
          required
          placeholder="Enter title"
          trim
          v-model="formNewTask.title"
        />
      </b-form-group>

      <!-- description -->
      <b-form-group
        id="task-description"
        label="Description:"
        label-for="task-description-input"
      >
        <b-form-textarea
          id="task-description-input"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          trim
          v-model="formNewTask.description"
        />
      </b-form-group>

      <!-- creator -->
      <b-form-group
        id="task-creator"
        label="Creator"
        label-for="task-creator-input"
      >
        <b-form-input
          id="task-creator-input"
          type="text"
          trim
          placeholder="Created by..."
          v-model="formNewTask.creator"
        />
      </b-form-group>

      <b-button
        ref="form-new-task-submit"
        type="submit"
        variant="primary"
        v-show="false"
      >
        Submit
      </b-button>
      <b-button
        ref="form-new-task-reset"
        type="reset"
        variant="danger"
        v-show="false"
        @click="newTaskReset"
      >
        Reset
      </b-button>
    </b-form>

    <!-- footer -->
    <template slot="modal-footer">
      <b-button variant="danger" @click="$refs[`form-new-task-reset`].click()">
        Reset
      </b-button>

      <div>
        <b-button class="mx-1" variant="dark" @click="closeModal">
          Cancel
        </b-button>
        <b-button
          class="mx-1"
          variant="success"
          @click="$refs[`form-new-task-submit`].click()"
        >
          Save
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { firestore } from "../api/firebase";

export default {
  name: "MyModal",
  props: ["modal-id"],
  data() {
    return {
      formNewTask: {
        title: "",
        description: "",
        creator: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$root.$emit("bv::hide::modal", `modal-${this.modalId}`);
    },
    newTaskCreate(evt) {
      evt.preventDefault();

      const kanban = firestore.collection("kanban");

      kanban
        .add({
          title: this.formNewTask.title,
          description: this.formNewTask.description,
          creator:
            this.formNewTask.creator === ""
              ? "Anonymous"
              : this.formNewTask.creator,
          createdAt: new Date(),
          status: 0,
        })
        .then(() => {
          this.newTaskReset();
        });
      this.closeModal();
    },
    newTaskReset() {
      this.formNewTask = {
        title: "",
        description: "",
        creator: "",
      };
    },
  },
};
</script>

<style></style>
