<template>
  <b-modal
    :id="`modal-${modalId}`"
    :title="`${item !== null ? item.title : `Detail`}`"
    footer-class="justify-content-between text-center"
  >
    <!-- body -->
    <template v-if="item !== null">
      <h3 class="lead">Description:</h3>
      <p style="white-space: pre">
        {{ item.description }}
      </p>
      <h3 class="lead">Created by:</h3>
      <p>
        {{ item.creator }}
      </p>
      <h3 class="lead">Status:</h3>
      <p>
        {{ getStatus(item.status) }}
      </p>
    </template>
    <!-- footer -->
    <template slot="modal-footer">
      <div>
        <div v-if="isPrev">
          <b-button id="task-backward" variant="warning">
            Back
          </b-button>

          <b-popover target="task-backward" placement="top" triggers="focus">
            <template slot="title">
              Send backward?
            </template>
            <b-button variant="tranparent" size="sm" class="mx-1">
              No, cancel!
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              class="mx-1"
              @click="updatePrev"
            >
              Yes, sure!
            </b-button>
          </b-popover>
        </div>
      </div>
      <div>
        <b-button id="task-delete" variant="danger">Delete</b-button>

        <b-popover target="task-delete" placement="top" triggers="focus">
          <template slot="title">
            Delete this task?
          </template>
          <b-button variant="tranparent" size="sm" class="mx-1">
            No, cancel!
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="mx-1"
            @click="deleteTask"
          >
            Yes, sure!
          </b-button>
        </b-popover>
      </div>
      <div>
        <div v-if="isNext">
          <b-button id="task-forward" variant="success">
            Next
          </b-button>

          <b-popover target="task-forward" placement="top" triggers="focus">
            <template slot="title">
              Send forward?
            </template>
            <b-button variant="tranparent" size="sm" class="mx-1">
              No, cancel!
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              class="mx-1"
              @click="updateNext"
            >
              Yes, sure!
            </b-button>
          </b-popover>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { EventBus } from "../eventBus";
import { firestore } from "../api/firebase";

export default {
  name: "MyModalDetail",
  props: ["modal-id"],
  methods: {
    closeModal() {
      this.$bvModal.hide(`modal-${this.modalId}`);
    },
    updatePrev() {
      const kanban = firestore.collection("kanban").doc(this.item.id);
      kanban.update({ status: this.item.status - 1 }).catch((err) => {
        console.error(err);
      });
      this.closeModal();
    },
    updateNext() {
      const kanban = firestore.collection("kanban").doc(this.item.id);
      kanban.update({ status: this.item.status + 1 }).catch((err) => {
        console.error(err);
      });
      this.closeModal();
    },
    deleteTask() {
      const kanban = firestore.collection("kanban").doc(this.item.id);
      kanban.delete().catch((err) => {
        console.error(err);
      });
      this.closeModal();
    },
    getStatus(status) {
      switch (status) {
        case 0:
          return "Backlog";
        case 1:
          return "To Do";
        case 2:
          return "Doing";
        case 3:
          return "Done";
        default:
          break;
      }
    },
  },
  data() {
    return {
      isPrev: false,
      isNext: false,
      item: null,
    };
  },
  watch: {
    item() {
      if (this.item !== null) {
        if (this.item.status === 0) {
          this.isPrev = false;
          this.isNext = true;
        } else if (this.item.status === 3) {
          this.isPrev = true;
          this.isNext = false;
        } else {
          this.isPrev = true;
          this.isNext = true;
        }
      }
    },
  },
  created() {
    EventBus.$on("showModalDetail", (item) => {
      this.item = item;
      this.$bvModal.show(`modal-${this.modalId}`);
    });
  },
};
</script>

<style></style>
