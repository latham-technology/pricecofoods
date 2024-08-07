<template>
    <form @submit.prevent="onSubmit">
        <section>
            <h1>Contact Information</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputWrapper
                    label="First Name"
                    name="user.firstName"
                >
                    <template #input="{ props }">
                        <PrimeInputText
                            v-bind="props"
                            autocomplete="given-name"
                        />
                    </template>
                </InputWrapper>

                <InputWrapper
                    label="Last Name"
                    name="user.lastName"
                >
                    <template #input="{ props }">
                        <PrimeInputText
                            v-bind="props"
                            autocomplete="family-name"
                        />
                    </template>
                </InputWrapper>

                <InputWrapper
                    label="Email Address"
                    name="user.email"
                >
                    <template #input="{ props }">
                        <PrimeInputText
                            v-bind="props"
                            autocomplete="email"
                            type="email"
                        />
                    </template>
                </InputWrapper>

                <InputWrapper
                    label="Phone Number"
                    name="user.phone"
                >
                    <template #input="{ props }">
                        <PrimeInputText
                            v-maska="'(###) ###-####'"
                            v-bind="props"
                            autocomplete="tel-national"
                            type="tel"
                        />
                    </template>
                </InputWrapper>

                <InputWrapper
                    class="col-span-full"
                    label="Address"
                    name="user.address1"
                >
                    <template #input="{ props }">
                        <PrimeInputText
                            v-bind="props"
                            autocomplete="address-line1"
                        />
                        <small>Street Address</small>
                    </template>
                </InputWrapper>

                <InputWrapper
                    class="col-span-full"
                    name="user.address2"
                >
                    <template #input="{ props }">
                        <PrimeInputText
                            v-bind="props"
                            autocomplete="address-line2"
                            placeholder="Apartment, suite, unit, etc."
                        />
                        <small>Street Address Line 2</small>
                    </template>
                </InputWrapper>

                <div
                    class="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full"
                >
                    <InputWrapper label="City" name="user.city">
                        <template #input="{ props }">
                            <PrimeInputText
                                v-bind="props"
                                autocomplete="city"
                            />
                        </template>
                    </InputWrapper>

                    <InputWrapper
                        :error="errors['user.state']"
                        label="State"
                        name="user.state"
                    >
                        <template #input="{ props }">
                            <PrimeSelect
                                v-bind="props"
                                autocomplete="state"
                                editable
                                option-label="value"
                                option-value="value"
                                :options="stateOptions"
                            />
                        </template>
                    </InputWrapper>

                    <InputWrapper label="Zip Code" name="user.zip">
                        <template #input="{ props }">
                            <PrimeInputText
                                v-maska="'#####-####'"
                                autocomplete="postal-code"
                                v-bind="props"
                            />
                        </template>
                    </InputWrapper>
                </div>
            </div>
        </section>

        <section>
            <h1>Questionnaire</h1>

            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full"
            >
                <InputWrapper label="Do you use coupons?">
                    <template #input>
                        <PrimeSelectButton
                            v-model="useCouponsField"
                            option-label="label"
                            option-value="value"
                            :options="[
                                {
                                    label: 'Yes',
                                    value: true,
                                },
                                {
                                    label: 'No',
                                    value: false,
                                },
                            ]"
                        />
                    </template>
                </InputWrapper>

                <InputWrapper
                    label="Were you aware of our senior discount every Tuesday?"
                >
                    <template #input>
                        <PrimeSelectButton
                            v-model="awareOfSeniorDiscountField"
                            option-label="label"
                            option-value="value"
                            :options="[
                                {
                                    label: 'Yes',
                                    value: true,
                                },
                                {
                                    label: 'No',
                                    value: false,
                                },
                            ]"
                        />
                    </template>
                </InputWrapper>

                <InputWrapper
                    label="How did you hear about our email savings program?"
                >
                    <template #input="{ props }">
                        <PrimeSelect
                            v-model="referralField"
                            :label-id="props.id"
                            option-label="label"
                            option-value="value"
                            :options="[
                                {
                                    label: 'Website',
                                    value: 'website',
                                },
                                {
                                    label: 'Friend',
                                    value: 'friend',
                                },
                                {
                                    label: 'Flyer',
                                    value: 'flyer',
                                },
                                {
                                    label: 'Other',
                                    value: 'other',
                                },
                            ]"
                        />
                    </template>
                </InputWrapper>

                <InputWrapper
                    class="col-span-full"
                    label="Comments or suggestions?"
                    name="surveyJson.comments"
                >
                    <template #input="{ props }">
                        <PrimeTextarea v-bind="props" />
                    </template>
                </InputWrapper>
            </div>
        </section>

        <div class="flex flex-col gap-4 items-start">
            <NuxtTurnstile
                ref="turnstileRef"
                v-model="tsToken"
                :options="{ theme: 'light' }"
            />
            <Button type="submit"> Submit </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { UsaStates } from 'usa-states'
import { useForm } from 'vee-validate'
import type { LoyaltyInput } from '@/types'
import loyaltySchema from '~/server/schemas/loyalty'

const toast = useNotification()
const constants = useConstants()
const turnstileRef = ref()
const tsToken = ref()

const stateOptions = new UsaStates().states.map((state) => ({
    label: state.name,
    value: state.abbreviation,
}))

const formData = reactive<LoyaltyInput>({
    user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    },
    surveyJson: {
        useCoupons: null,
        awareOfSeniorDiscount: null,
        referral: null,
        comments: '',
    },
})

const { handleSubmit, defineField, errors } = useForm({
    validationSchema: loyaltySchema,
    initialValues: formData,
})

const [useCouponsField] = defineField('surveyJson.useCoupons')
const [awareOfSeniorDiscountField] = defineField(
    'surveyJson.awareOfSeniorDiscount',
)
const [referralField] = defineField('surveyJson.referral')

const onSubmit = handleSubmit(
    async (values) => {
        try {
            await $fetch('/_turnstile/validate', {
                method: 'post',
                body: {
                    token: tsToken.value,
                },
            })

            await $fetch('/api/loyalty', {
                method: 'post',
                body: values,
            })

            toast.success(constants.APP_ESP_SUBMIT_SUCCESS)
            useTrackEvent('esp_form_submission')
            navigateTo('/')
        } catch (error: FetchError<H3Error>) {
            if (error.data) {
                toast.error(error.data.message)
            } else {
                toast.error(error.message)
            }
        } finally {
            turnstileRef.value.reset()
        }
    },
    () => toast.error(constants.APP_FORM_VALIDATION_ERROR),
)
</script>

<style lang="scss" scoped>
form {
    section {
        @apply py-8;

        h1 {
            @apply py-2 text-brand-blue;
            @apply text-2xl font-semibold;
        }

        h2 {
            @apply py-2;
            @apply text-lg font-semibold;
        }
    }
}
</style>
