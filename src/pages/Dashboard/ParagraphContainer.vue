<template>
    <div class="container">
        <div class="row">
            <div class="col pl-0">
                <component :is="this.currentTab"
                        :text="this.paragraphText"
                        @edit-finished="switchToText"
                        >
                </component>
            </div>
            <div class="">
                <base-button type="link" aria-label="edit button" @click="changeToEdit()">
                    <i class="tim-icons icon-pencil"></i>
                </base-button>
            </div>
        </div>
    </div>
</template>

<script>
import TextLine from './TextLine';
import EditLine from './EditLine';

export default {
    name: 'ParagraphContainer',
    components: {
        TextLine,
        EditLine
    },
    props: ['paragraphText'],
    methods: {
        changeToEdit() {
            return this.currentTab = 'EditLine'
        },
        switchToText(newText) {
            this.$emit('edit-finished', newText);
            return this.currentTab = 'TextLine'
        }
    },
    data() {
        return {
            currentTab: 'TextLine'
        }
    }
}
</script>

<style>

</style>