<template>
    <div>
        <input type="text"  :value="value" @input="onInput" v-bind="$attrs">
    </div>
</template>

<script>
    export default {
        inheritAttrs:true,
        props: {
            value: {
                type: String,
                default: ""
            },
        },
        methods: {
            onInput(e) {
                this.$emit('input',e.target.value)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>