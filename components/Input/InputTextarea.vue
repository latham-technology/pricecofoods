<template>
    <label
        class="input-textarea"
        :class="{ 'is-valid': meta.valid, 'is-invalid': !meta.valid }"
    >
        <span class="input-textarea__label">{{ label }}</span>
        <textarea
            v-bind="$attrs"
            class="input-textarea__input"
            :name="name"
            :value="modelValue"
            @blur="onBlur"
            @change="onInput"
        />
        <div v-if="hasExtra" class="input-textarea__extra">
            <slot name="extra" />
        </div>

        <slot name="error" v-bind="{ errorMessage }">
            <InputError v-if="errorMessage" :message="errorMessage" />
        </slot>
    </label>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import useInput from '@/composables/useInput'

type Props = {
    name: string
    label: string
    modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    modelValue: '',
})

const emit = defineEmits(['update:model-value'])

const { hasExtra } = useInput()
const name = toRef(props, 'name')
const { handleBlur, handleChange, meta, value, errorMessage } = useField(
    name,
    undefined,
    {
        initialValue: props.modelValue,
    },
)

function onBlur(event: Event) {
    emit('update:model-value', value.value)
    handleBlur(event)
}

function onInput(event: Event) {
    emit('update:model-value', value.value)
    handleChange(event)
}
</script>

<style lang="scss" scoped>
.input-textarea {
    @apply flex flex-col;

    &__label {
        @apply mb-1;
        @apply font-bold;
    }

    &__input {
        @apply p-2 rounded;
        @apply bg-gray-100;
    }

    &__extra {
        @apply text-sm mt-1;
    }
}
</style>
