import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#6FCE91',
                secondary: '#FFAAAA',
                accent: '#8c9eff',
                warning: '#FF3636',
            },
        },
    },
})
export default vuetify
