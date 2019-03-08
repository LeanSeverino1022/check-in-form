<template>
    
    <fieldset class="questions-container center">
        <h3>{{questionIndex}}</h3>
        <label for="main_answer" class="first-question">{{question.text}}</label>
        <textarea
            id ="main_answer"
            rows="1"
            :placeholder="question.placeholder"
            @change="$emit('update-answer', $event.target.value, questionIndex)"
                             
        ></textarea>
        <div class="more-info-actions">
            <span>Bonus points for more info:</span>
            <button>PULL FROM ASSIGNMENTS OR YOUR DAY PLAN</button>
            <button>ADD NOTES</button>
            <button>ADD ATTACHMENTS</button>
        </div>
    </fieldset>
</template>

<script>
export default {
    name: "FormMainContent",
    props: ["question","answer","questionIndex"]
};

debugger;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
    margin: 0 auto;
}

.first-question,
.second-question {
    font-size: 24px;
    line-height: 32px;
    overflow-wrap: break-word;
}
.second-question {
    opacity: 0.7;
}

#main_answer {
    width: 100%;
    height: 100px;
    overflow-wrap: break-word;
    overflow-x: hidden;
}

fieldset {
    min-height: 300px;
}

button { margin: 15px }
</style>
