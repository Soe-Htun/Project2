import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
//Themes
import "./assets/css/config/default/bootstrap.min.css";
import './assets/css/config/default/app.min.css';
import './assets/css/icons.min.css';

//Thirdparty plugin css
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css"

// Data Table
import Vue3EasyDataTable from 'vue3-easy-data-table'
import "vue3-easy-data-table/dist/style.css"

// Loading when fetching data
import PlaceHolder from './shared/Placeholder.vue';
import './assets/main.css'
import { useAuth } from './stores/modules/auth'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

router.beforeEach((to) => {
    window.scrollTo(0,0);
    const store = useAuth();
    if(to.meta.requiresAuth && store.user.name =='') {
        return {
            path: '/'
        }
    }

    if(to.meta.requiresVisitor && store.user.name !="") return "/home"
})

const app = createApp(App)
app.use(createPinia().use(piniaPersist))
app.use(router);
app.use(Toast, {
    newestOnTop: true,
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
})
app.component('v-select', vSelect);
app.component("place-holder", PlaceHolder);
app.component("EasyDataTable", Vue3EasyDataTable)

app.mount('#app')
