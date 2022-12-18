<template>
    <div class="modal fade round" :class="{ show: createModal, 'd-block': createModal }" tabindex="-1"
       style="background-color: rgba(0, 0, 0, 0.3);" aria-hidden="false">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100" id="exampleModalLabel">Create Team</h4>
                    <button type="button" class="btn-close" @click="close" data-bs-dismiss="modal"></button>
                </div>
                <!-- Modal body center -->
                <div class="modal-body">
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="name" class="form-label"> Name</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="formData.team_name" 
                               class="form-control" />
                            <p class="text-danger" v-for="error in v$.team_name.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </div>
                        
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="email" class="form-label"> Full Name</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="formData.team_fullname" 
                                class="form-control" />
                            <p class="text-danger" v-for="error in v$.team_fullname.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </div>
                        
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="employee_id" class="form-label"> City</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="formData.team_city" 
                                class="form-control" />
                            <p class="text-danger" v-for="error in v$.team_city.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </div>
                        
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="bu" class="form-label">Division </label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="formData.team_division" 
                                class="form-control" />
                            <p class="text-danger" v-for="error in v$.team_division.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer justify-content-center mt-3">
                    <button type="submit" @click="createTeam" class="btn btn-primary">Create</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { players } from '../stores/modules/players';
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const props = defineProps({
    createModal: {
        type: Boolean,
        default: false
    },
})

const store = players()

const formData = reactive({
    team_name: "",
    team_fullname: "",
    team_city: "",
    team_division: ""
})

const rules = computed(() => {
    return {
        team_name: {
            required: helpers.withMessage("Name is required", required)
        },
        team_fullname: {
            required: helpers.withMessage("Full Name is required", required)
        },
        team_city: {
            required: helpers.withMessage("City is required", required)
        },
        team_division: {
            required: helpers.withMessage("Division is required", required)
        }
    }
})
const v$ = useVuelidate(rules, formData)


onMounted(() => {
})

// close function pass into parent components
const emit = defineEmits(["close", "createTeam"]);
function close() {
    emit('close');
}
async function createTeam() {
    let result = await v$.value.$validate();

    if(result) {
        let data = {
            id: store.teams.length+1,
            name: formData.team_name,
            fullname: formData.team_fullname,
            city: formData.team_city,
            division: formData.team_division,
        }
        emit('createTeam', data)
    }
    
}
</script>
