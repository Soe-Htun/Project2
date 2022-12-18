<template>
    <div class="modal fade round" :class="{ show: deleteModal, 'd-block': deleteModal }" tabindex="-1"
       style="background-color: rgba(0, 0, 0, 0.3);" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold fs-4" id="exampleModalLabel">Confirm</h5>
                <button type="button" class="btn-close" @click="close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <span class="fw-bold fs-5">{{label}}</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove">{{ buttonName }}</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    deleteModal: {
        type: Boolean,
        default: false
    },
    label: {
        type: String
    },
    buttonName: {
        type: String
    }
})
const emit = defineEmits("remove", "close")
function remove() {
    emit("remove")
}
function close() {
    emit('close');
}
</script>