<template>
    <div class="page-container">
        <v-card class="service-container">
            <v-list style="padding: unset" two-line>
                <v-list-item-group>
                    <v-list-item style="background: #f3f5f8">
                         <v-list-item-content class="item-content">
                            <v-list-item-title v-text="'Services'"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <template v-for="(item) in getServices">
                        <v-list-item @click="serviceRouter(item)" :key="item.serviceId">
                            <v-list-item-content class="item-content">
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'


export default {
    name : 'services',
    data :  function(){
        return {
            
        }
    },
    methods : {
        ...mapMutations(['setChosenService']),
        serviceRouter(service){
            this.setChosenService(service);
            this.$router.push('/questions')
        }
    },
    computed : {
        ...mapGetters(['getServices'])
    },
    
}
</script>

<style scoped>
    .page-container{
        width: 90%;
        margin:20px auto 0px auto;
    }

    .v-item-group >>>.v-list-item{
        min-height: 32px;
    }

    .item-content{
        padding: 7px 0;
    }

</style>