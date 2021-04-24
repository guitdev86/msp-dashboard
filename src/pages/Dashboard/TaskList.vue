<template>
    <base-table :data="tableData"
                thead-classes="text-primary"
                >
      <template slot-scope="{row}">
        <!-- <td>
          <base-checkbox v-model="row.done">
          </base-checkbox>
        </td> -->
        <td>
          <p class="title">{{row.title}}</p>
          <paragraph-container :paragraphText=row.description
                                @edit-finished="$emit('edit-finished', $event, row.title)"
                                ></paragraph-container>
          <!-- <text-line :text=row.description></text-line> -->
        </td>
      </template>
    </base-table>
</template>
<script>
  import {BaseTable} from '@/components'
  import TextLine from './TextLine'
  import EditLine from './EditLine'
  import ParagraphContainer from './ParagraphContainer'

  export default {
    components: {
      BaseTable,
      TextLine,
      EditLine,
      ParagraphContainer
    },
    computed: {
      tableData() {
        return this.$t('dashboard.manageInfo');
      }
    },
    methods: {
      changeToEdit() {
        this.currentTab = 'EditLine';
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
