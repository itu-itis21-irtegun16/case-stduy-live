<template>
  <div class="text-center">
    <v-app-bar class="app-bar"> 
      <v-icon @click="updatePageNumber(-1)" class="icon" :style="[getPageNumber != 1 ? {} : {'visibility' : 'hidden'}]">mdi-chevron-left</v-icon>
      <v-spacer>
        <v-app-bar-title class="title">{{getChosenService.name}}</v-app-bar-title>
      </v-spacer>
      <v-icon @click="returnServices" class="icon">mdi-close</v-icon>
    </v-app-bar>

    <v-progress-linear color="#2CB34F" :value="calculateProgress" height="3"></v-progress-linear>

    <div class="price-interval" v-if="getChosenService.price">
      <div class="price-info">Ortalama Fiyat Aralığı:</div>
      <div class="price"><span style="font-size: 12px;margin-left:4px "> {{getChosenService.price.currency}} </span> {{getChosenService.price.min}} - {{getChosenService.price.max}}  </div>
    </div>

    <div class="banner" v-if="getChosenService.discountRateText && getPageNumber == 1">
      <div class="banner-text">
        <div v-html="numberColor(getChosenService.discountRateText)"></div>
      </div>
    </div>

    <template v-for="question in getQuestions">
      <app-questions  v-if="getPageNumber == question.pageNumber" :key="question.id" :question="question"></app-questions>
    </template>

  </div>
</template>

<script>
import questions from '../components/Questions.vue'
import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'Questions',
    data : function(){
      return {
        isFirstQuesiton : false,
        succesPage : false
      }
    },
    methods : {
      ...mapMutations(['clearState','updatePageNumber']),
      numberColor(value){
        if(value){
          var text = '<p>';
          var a = value.split(" ");
          a.forEach((element,index) => {
            if(element.indexOf('%') > -1){
              text = text + '<span style="color : #90ee90">' + ' ' + element  +'</span>'
            }else{
              if(index){
                text = text + ' ' + element
              }else{
                text = text + element
              }
            }
          });
        }
        return text = text + '</p>';
      },
      returnServices(){
        this.clearState();
        this.$router.push('/');
      }
    },
    components: {
      appQuestions : questions,
    },
    computed : {
      ...mapGetters(['getChosenService','getQuestions','getPageNumber']),
      calculateProgress(){
        return (this.getPageNumber / this.getQuestions.length) * 100
      }
    },
    mounted(){
        if(this.getChosenService.length > 0 || this.getChosenService.name){
            this.$store.dispatch('getQuestions',this.getChosenService.serviceId)
        }else{
            this.$router.push('/')
        }
    }
  }
</script>

<style scoped>

  .v-progress-linear >>> .v-progress-linear__buffer {
    background: #E3E4E6;
  }

  .app-bar{
    background: white !important;
    box-shadow: unset !important;
  }

  .title >>> .v-app-bar-title__placeholder{
    font-size: 14px;
  }

  .icon{
    color: black;
  }

  .price-interval {
    box-shadow: 0px 1px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
    height: 50px;
    width: 100%;
    padding: 10px 24px;
    display: flex;
    margin-bottom: 1px;
  }

  .price-info{
    width: 50%;
    font-size: 12px;
    margin-top: 7px;
    font-weight: bold;
    display: flex;
  }

  .banner{
    height: 44px;
    background: #111321;
    padding: 10px;
  }

  .banner-text{
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    line-height: 22px;
    color: white;
  }

  .price{
    width: 50%;
    font-size: 16px;
    margin-top: 4px;
    font-weight: bold;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

</style>
