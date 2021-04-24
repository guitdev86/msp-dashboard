<template>
  <base-input v-model="text"
              @keyup.13="$emit('edit-finished', text)"
                  >
  </base-input>
</template>

<script>
export default {
    name: 'EditLine',
    props: ['text']
}
</script>

<style>

</style>