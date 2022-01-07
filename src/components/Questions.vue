<template>
    <div>
        <v-card class="question text-center">
            <v-card-title class="question-title"> {{question.label}} </v-card-title>
        </v-card>


        <div v-if="question.typeId == 5">
            <v-radio-group class="radio-group-class" v-model="getAnswers[question.pageNumber-1].answer" style="margin-top:unset">
                <div class="question-wrapper" >
                    <div class="question-container-type5" v-for="options in question.values" :key="options.id">
                        <div class="image-wrapper">
                            <v-img class="image" :src="options.valueImageUrl"></v-img>
                        </div>
                        <div class="checkbox">
                            <v-radio class="radio-box" color="success" :label="options.value" :value="options.id"></v-radio>
                        </div>
                    </div>
                    <p  v-if="errorClassReturn"  class="error-text">Bu alan zorunlu</p>
                </div>
            </v-radio-group>
        </div>

        <div class="radio-wrapper" v-else-if="question.typeId == 6">
            <v-radio-group v-model="getAnswers[question.pageNumber-1].answer" column>
                <div class="question-wrapper type6">
                    <div class="question-container-type6" v-for="options in question.values" :key="options.id">
                        <div class="checkbox">
                            <v-radio color="success" @click="removeErrorClass"  class="radio-box"  :label="options.value" :value="options.id"></v-radio>
                        </div>
                    </div>
                    <p  v-if="errorClassReturn"  class="error-text">Bu alan zorunlu</p>
                </div>
            </v-radio-group>
        </div>

        <div v-else>
            <div class="question-wrapper type8">
                <v-textarea  @click="removeErrorClass" color="rgba(0, 0, 0, 0.38)" v-model="getAnswers[question.pageNumber-1].answer" class="text-area-class" :placeholder="question.placeHolder"  outlined></v-textarea>
                <p  v-if="errorClassReturn"  class="error-text">Bu alan zorunlu</p>
                <p  v-if="errorClass2"  class="error-text">Eksik Bir şey var mı?</p>
            </div>
        </div>

        <div class="devam-button">
            <v-btn @click="goButton" class="button" block>{{lastQuestion}}</v-btn>
        </div>

    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    name : 'questions',
    props : ['question'],
    data : function(){
        return{
            isLastQuestion : false,
            errorClass : false,
            errorClass2 : false
        }
    },
    computed : {
        ...mapGetters(['getChosenService','getQuestions','getAnswers','getPageNumber']),
        lastQuestion(){
            return !this.isLastQuestion ? 'DEVAM' : 'TALEP GÖNDER';
        },
        errorClassReturn(){
            return this.errorClass;
        }
    },
    methods : {
        ...mapMutations(['updatePageNumber','setAnswers']),
        removeErrorClass(){
            this.errorClass = false;
            this.errorClass2 = false;
            if(this.question.typeId == 8){
                document.querySelector('div.v-input__slot > fieldset').style.borderColor = "currentColor"
            }
        },
        goButton(){
            if(this.question.required){
                if(this.getAnswers[this.question.pageNumber-1].answer == null){
                    this.errorClass = true;
                    if(this.question.typeId == 8){
                        document.querySelector('div.v-input__slot > fieldset').style.borderColor = "#F1664A"
                    }
                }else{
                    if(this.question.typeId == 8){
                        if(this.getAnswers[this.question.pageNumber-1].answer.length < this.question.minLength){
                            this.errorClass = true;
                            this.errorClass2 = true;
                            if(this.question.typeId == 8){
                                document.querySelector('div.v-input__slot > fieldset').style.borderColor = "#F1664A"
                            }
                        }else{
                            this.errorClass = false;
                            this.errorClass2 = false;
                            if(this.question.typeId == 8){
                                document.querySelector('div.v-input__slot > fieldset').style.borderColor = "currentColor"
                            }
                        }
                    }else{
                        this.errorClass = false;
                        if(this.question.typeId == 8){
                            document.querySelector('div.v-input__slot > fieldset').style.borderColor = "currentColor"
                        }
                    }
                }
            }
            if(!this.errorClass){
                this.setAnswers(this.getAnswers[this.question.pageNumber-1].answer);
                if(this.isLastQuestion){
                    this.$router.push('success-page')
                }else{
                    this.updatePageNumber(1);
                }
            }
        }
    },
    mounted(){
        if(this.getQuestions.length == this.getPageNumber){
            this.isLastQuestion = true
        }
    },
    
}
</script>

<style scoped>

    .question{
        box-shadow: unset !important;
    }
    .question-title{
        font-size: 18px;
        display: grid;
        padding: 19px;
        word-break: break-word;
        overflow: hidden;
    }

    .devam-button{
        height: 62px;
        position: fixed;
        bottom: 0px;
        width: 100%;
        display: flex;
        padding: 0 16px;
        z-index: 1;
    }

    .button{
        height: 46px !important;
        background: #2CB34F !important;
        align-self: center;
        color: white !important;
        font-size: 18px !important;
    }

    .question-wrapper{
        margin-bottom: 60px !important; 
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .question-container-type5{
        background: #f3f5f8;
        width: 156px;
        height: 164px;
        margin-bottom: 16px;
    }

    .image-wrapper{
        width: 156px;
        height: 119px;
        display: flex;
        justify-content: center;
        padding: 12px 30px 11px 30px;
    }

    .image{
        width: 96px;
        height: 96px;
    }

    .checkbox{
        height: 45px;
        width: 100%;
        padding: 13px 8px 14px 8px;
    }

    .v-radio.theme--light >>> .v-icon.notranslate.mdi.mdi-radiobox-blank.theme--light{
        font-size: 16px;
    }

    .radio-box{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        font-size: 14px;
    }

    .v-radio.theme--light >>> .v-label.theme--light{
        font-size: 14px;
    }

    .question-container-type6{
        background: #f3f5f8;
        width: 327px;
        height: 45px;
        margin-bottom: 8px;
        width: 100%;
    }

    .radio-wrapper >>> .v-input--selection-controls {
        margin-top: unset;
        padding: unset;
    }

    .text-area-class{
        font-size: 14px;
        width: 100%;
    }

    .error-text{
        color: red;
        font-size: 10px;
        text-align: start;
        width: 100%;
        margin-bottom: 0px;
    }

    .type6{
        justify-content: start;
    }

    .type8{
        justify-content: start;
    }

    .v-input >>> .v-text-field__details{
        display: none;
    }
</style>