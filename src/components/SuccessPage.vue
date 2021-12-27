<template>
    <div class="success-page-container">
        <img class="image-class" src="/images/confeti.png" alt="">
        <span class="text-class">Talebini aldık!</span>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name : 'success-page',
    computed : {
        ...mapGetters(['getAnswers','getQuestions'])
    },
    mounted(){
        this.getQuestions.forEach((element,index) => {
            console.log(element.label)
            if(element.values){
                element.values.forEach(element =>{
                    if(element.id == this.getAnswers[index].answer){
                        console.log(element.value)
                    }
                })
            }else{
                console.log(this.getAnswers[index].answer)
            }
        });
    }
}
</script>

<style scoped>

.success-page-container{
    height: 171px;
    background-image: url('/images/confetti-03.svg');
}

.image-class{
    position: absolute;
    top: 58px;
    left: 16px;
}

.text-class{
    position: absolute;
    left: 85px;
    top: 86px;
    font-size: 18px;
    font-weight: bold;
}

</style>