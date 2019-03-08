<template>
    <div id="app">
        <form-wizard
            @on-complete="onComplete"
            @on-change="onChange"
            shape="tab"
            color="#9b59b6"
            title
        >
            <wizard-step
                slot-scope="props"
                slot="step"
                :tab="props.tab"
                :transition="props.transition"
                :index="props.index"
            ></wizard-step>

            <tab-content
                v-bind:title="'Question #'+ ++index"
                icon="fas fa-cog"
                v-for="(question, index) in formQuestions"
                v-bind:key="index"
                :before-change="beforeTabSwitch"
            >
                <FormMainContent
                    v-bind:question="question"
                    v-on:update-answer="updateAns"
                    v-bind:answer="answer"
                    v-bind:questionIndex="index"
                />
            </tab-content>
        </form-wizard>
    </div>
</template>

<script>
import FormMainContent from "./components/FormMainContent.vue";

export default {
    name: "app",
    components: {
        FormMainContent
    },

    data() {
        return {
            formQuestions: [
                {
                    id: 1,
                    text: "What did you accomplish today?",
                    placeholder:
                        "List anything you accomplished, even the smallest step.",
                    required: true
                },
                {
                    id: 2,
                    text: "What will you work on first tomorrow?",
                    placeholder: "I'll start with...",
                    required: true
                },
                {
                    id: 3,
                    text: "Is any specific thing stuck?",
                    placeholder: "Leave this blank if nothing is stuck.",
                    required: true
                }
            ],
            answer: "",
            questionIndex: 0
        };
    },
    methods: {
        onChange(prevIndex, nextIndex) {
            this.questionIndex = nextIndex;
        },
        updateAns(newdata, newid) {
            this.answer = newdata;
        },
        onComplete: function() {
            this.questionIndex = 3;
            // window.location = "https://app.resultmaps.com/communication/check_in/report";
        },

        submitChange() {

            let status = "";

            switch (this.questionIndex) {
                case 0:
                    status = "done";
                    break;
                case 1:
                    status = "next";
                    break;
                case 2:
                    status = "blocked";
                    break;
                default:
                    break;
            }

            let postData = {
                token: "9a171b26197b05748db5f28c472a",
                report_data: {
                    notes: `example notes for ${status}`
                },
                new_items: [this.answer],
                status: status
            };

            console.log(postData);

            $.ajax({
                type: "POST",
                url:
                    "https://app.resultmaps.com/api/communication/update_check_in_status",
                data: postData,
                async: true,
                success: function(response) {
                    if (status == "blocked") {
                        return;
                        window.location =
                            "https://app.resultmaps.com/communication/check_in/report";
                    }
                }
            });

            return true;
        },

        beforeTabSwitch() {
            this.submitChange();
            return true;
        }
    }
};
</script>

<style>
#app {
    padding: 0 60px;
}
</style>
