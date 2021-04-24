<template>
    <div class="container">
        <div class="row">
            <div class="col pl-0">
                <component :is="this.currentTabProp"
                        :text="this.paragraphText"
                        @edit-finished="(text) => $emit('edit-finished', text)"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>
import TextLine from './TextLine';
import EditLine from './EditLine';

export default {
    name: 'ListParagraphContainer',
    components: {
        TextLine,
        EditLine
    },
    props: ['paragraphText', 'currentTabProp']
}
</script>

<style>

</style>