<template>
    <div class="modal fade round" :class="{ show: createModal, 'd-block': createModal }" tabindex="-1"
       style="background-color: rgba(0, 0, 0, 0.3);" aria-hidden="false">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100" id="exampleModalLabel">Create Player</h4>
                    <button type="button" class="btn-close" @click="close" data-bs-dismiss="modal"></button>
                </div>
                <!-- Modal body center -->
                <div class="modal-body">
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="name" class="form-label"> First Name</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="formData.first_name" 
                               class="form-control" />
                            <p class="text-danger" v-for="error in v$.first_name.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </div>
                        
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="email" class="form-label"> Last Name</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="formData.last_name" 
                                class="form-control" />
                            <p class="text-danger" v-for="error in v$.last_name.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </div>
                        
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="employee_id" class="form-label"> Positioin</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="formData.position" 
                                class="form-control" />
                            <p class="text-danger" v-for="error in v$.position.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </div>
                        
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="bu" class="form-label">Team Name </label>
                        </div>
                        <div class="col-6">
                            <v-select :clearable="false" :taggable="true" v-model="formData.team_name" :options="store.players?.map(e=> e.team)"
                                label="name" return-object filled>
                            </v-select>
                            <p class="text-danger" v-for="error in v$.team_name.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </p>
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer justify-content-center mt-3">
                    <button type="submit" @click="createPlayer" class="btn btn-primary">Create</button>
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
    first_name: "",
    last_name: "",
    position: "",
    team_name: ""
})

const rules = computed(() => {
    return {
        first_name: {
            required: helpers.withMessage("First Name is required", required)
        },
        last_name: {
            required: helpers.withMessage("Last Name is required", required)
        },
        position: {
            required: helpers.withMessage("Position is required", required)
        },
        team_name: {
            required: helpers.withMessage("Team Name is required", required)
        }
    }
})
const v$ = useVuelidate(rules, formData)


onMounted(() => {
})

// close function pass into parent components
const emit = defineEmits(["close", "createPlayer"]);
function close() {
    emit('close');
}
async function createPlayer() {
    let result = await v$.value.$validate();

    if(result) {
        let data = {
            id: store.players.length+1,
            first_name: formData.first_name,
            last_name: formData.last_name,
            position: formData.position,
            team: formData.team_name,
        }
        emit('createPlayer', data)
    }
    
}
</script>
