<template>
    <div>
        <div v-if="formState.submitted" class="flex flex-col">
            <Message v-if="formState.success" class="w-full" success>
                Thank you for your application!
            </Message>
        </div>

        <form v-else @submit.prevent="onSubmit">
            <section>
                <h1>Personal Information</h1>

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
                                autocomplete="phone"
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
                                aria-describedby="user.address1-help"
                            />

                            <small id="user.address1-help"
                                >Street Address</small
                            >
                        </template>
                    </InputWrapper>

                    <InputWrapper
                        class="col-span-full"
                        name="user.address2"
                    >
                        <template #input="{ props }">
                            <PrimeInputText
                                v-bind="props"
                                aria-describedby="user.address2-help"
                                placeholder="Apartment, suite, unit, etc."
                            />

                            <small id="user.address2-help"
                                >Street Address Line 2</small
                            >
                        </template>
                    </InputWrapper>

                    <div
                        class="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        <InputWrapper label="City" name="user.city">
                            <template #input="{ props }">
                                <PrimeInputText v-bind="props" />
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

                        <InputWrapper
                            label="Zip Code"
                            name="user.zip"
                        >
                            <template #input="{ props }">
                                <PrimeInputText
                                    v-maska="'#####-####'"
                                    v-bind="props"
                                />
                            </template>
                        </InputWrapper>
                    </div>
                </div>
            </section>

            <section>
                <h1>Position Desired</h1>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputWrapper
                        label="Position Desired"
                        name="positionDesired"
                    >
                        <template #input="{ props }">
                            <PrimeInputText v-bind="props" />
                        </template>
                    </InputWrapper>

                    <InputWrapper
                        :error="errors['salaryDesired']"
                        label="Compensation Desired"
                    >
                        <template #input="{ props }">
                            <PrimeInputGroup>
                                <PrimeInputNumber
                                    v-model="salaryField"
                                    currency="USD"
                                    :input-id="props.id"
                                    :invalid="
                                        !!errors['salaryDesired']
                                    "
                                    :max-fraction-digits="2"
                                    mode="currency"
                                    v-bind="salaryFieldProps"
                                />
                                <PrimeInputGroupAddon
                                    >per hour</PrimeInputGroupAddon
                                >
                            </PrimeInputGroup>
                        </template>
                    </InputWrapper>

                    <InputWrapper
                        label="Availability"
                        name="availability"
                    >
                        <template #input="{ props }">
                            <PrimeSelectButton
                                v-bind="props"
                                option-label="label"
                                option-value="value"
                                :options="[
                                    {
                                        label: 'Full-time',
                                        value: 'full-time',
                                    },
                                    {
                                        label: 'Part-time',
                                        value: 'part-time',
                                    },
                                ]"
                            />
                        </template>
                    </InputWrapper>

                    <InputWrapper
                        :error="errors['dateAvailable']"
                        label="Date Available"
                    >
                        <template #input="{ props }">
                            <PrimeDatePicker
                                :id="props.id"
                                v-model="dateAvailableField"
                                v-bind="dateAvailableFieldProps"
                                v-maska="'##/##/####'"
                                :invalid="errors['dateAvailable']"
                                :min-date="new Date()"
                                placeholder="MM/DD/YYYY"
                                show-button-bar
                                show-icon
                            />
                        </template>
                    </InputWrapper>

                    <InputWrapper
                        label="Are you currently employed?"
                        name="currentlyEmployed"
                    >
                        <template #input="{ props }">
                            <PrimeSelectButton
                                v-bind="props"
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
                </div>
            </section>

            <section>
                <h1>Work History</h1>

                <InputError
                    v-if="errors['history']"
                    :message="errors['history']"
                />

                <div
                    v-for="(_field, index) in historyFields"
                    :key="_field.key"
                    class="border border-brand-blue rounded p-4 mb-4"
                >
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`history[${index}].companyName`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Company Name"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`history[${index}].positionTitle`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Job Title"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`history[${index}].companyLocation`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Location"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{
                                    errorMessage,
                                    handleChange,
                                    handleBlur,
                                    value,
                                }"
                                :name="`history[${index}].positionDates`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Dates Employed"
                                >
                                    <template #input="{ props }">
                                        <PrimeDatePicker
                                            :id="props.id"
                                            v-maska="
                                                '##/##/#### - ##/##/####'
                                            "
                                            :invalid="!!errorMessage"
                                            :model-value="value"
                                            placeholder="MM/DD/YYYY - MM/DD/YYYY"
                                            selection-mode="range"
                                            show-icon
                                            @blur="handleBlur"
                                            @update:model-value="
                                                handleChange
                                            "
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`history[${index}].leaveReason`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Reason for leaving"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>
                    </div>

                    <Button
                        class="mt-4"
                        @click="removeHistory(index)"
                    >
                        Remove
                    </Button>
                </div>

                <Button type="button" @click="addHistory()">
                    Add Work History
                </Button>
            </section>

            <section>
                <h1>Education</h1>

                <InputError
                    v-if="errors['education']"
                    :message="errors['education']"
                />

                <div
                    v-for="(_field, index) in educationFields"
                    :key="_field.key"
                    class="border border-brand-blue rounded p-4 mb-4"
                >
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{
                                    errorMessage,
                                    handleChange,
                                    handleBlur,
                                    value,
                                }"
                                :name="`education[${index}].type`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Type"
                                >
                                    <template #input>
                                        <PrimeSelectButton
                                            :invalid="!!errorMessage"
                                            :model-value="value"
                                            option-label="label"
                                            option-value="value"
                                            :options="[
                                                {
                                                    label: 'High school',
                                                    value: 'primary',
                                                },
                                                {
                                                    label: 'College',
                                                    value: 'secondary',
                                                },
                                            ]"
                                            @blur="handleBlur"
                                            @change="
                                                handleChange(
                                                    $event.value,
                                                )
                                            "
                                        />
                                    </template>
                                </InputWrapper>

                                <label
                                    :for="`education[${index}].type`"
                                    >Type</label
                                >
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`education[${index}].name`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Name"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`education[${index}].location`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Location"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`education[${index}].subjects`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Subjects Studied"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{
                                    value,
                                    handleBlur,
                                    handleChange,
                                    errorMessage,
                                }"
                                :name="`education[${index}].completed`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Completed?"
                                >
                                    <template #input>
                                        <PrimeSelectButton
                                            :invalid="!!errorMessage"
                                            :model-value="value"
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
                                            @blur="handleBlur"
                                            @change="
                                                handleChange(
                                                    $event.value,
                                                )
                                            "
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>
                    </div>

                    <Button
                        v-if="index > 0"
                        class="mt-4"
                        @click="removeEducation(index)"
                    >
                        Remove
                    </Button>
                </div>

                <Button @click="addEducation()">
                    Add Education
                </Button>
            </section>

            <section>
                <h1>References</h1>
                <InputError
                    v-if="errors['references']"
                    :message="errors['references']"
                />
                <div
                    v-for="(_field, index) in referenceFields"
                    :key="_field.key"
                    class="border border-brand-blue rounded p-4 mb-4"
                >
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`references[${index}].name`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Name"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{
                                    errorMessage,
                                    value,
                                    handleBlur,
                                    handleChange,
                                    handleInput,
                                }"
                                :name="`references[${index}].yearsKnown`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Years Known"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputNumber
                                            :id="props.id"
                                            :invalid="!!errorMessage"
                                            :model-value="value"
                                            @blur="handleBlur"
                                            @change="
                                                handleChange(
                                                    $event.value,
                                                )
                                            "
                                            @input="
                                                handleInput(
                                                    $event.value,
                                                )
                                            "
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`references[${index}].address`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Address"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>

                        <div class="flex flex-col gap-2">
                            <Field
                                v-slot="{ field, errorMessage }"
                                :name="`references[${index}].phone`"
                            >
                                <InputWrapper
                                    :error="errorMessage"
                                    label="Phone Number"
                                >
                                    <template #input="{ props }">
                                        <PrimeInputText
                                            :id="props.id"
                                            v-maska="'(###) ###-####'"
                                            v-bind="field"
                                            :invalid="!!errorMessage"
                                            type="tel"
                                        />
                                    </template>
                                </InputWrapper>
                            </Field>
                        </div>
                    </div>

                    <Button
                        v-if="index > 2"
                        class="mt-4"
                        @click="removeReference(index)"
                    >
                        Remove
                    </Button>
                </div>

                <Button type="button" @click="addReference()">
                    Add Reference
                </Button>
            </section>

            <div class="flex flex-col items-start gap-4">
                <NuxtTurnstile
                    ref="turnstileRef"
                    v-model="tsToken"
                    :options="{ theme: 'light' }"
                />
                <Button type="submit"> Submit </Button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { UsaStates } from 'usa-states'
import { useFieldArray, useForm, Field } from 'vee-validate'
import applicationSchema from '~/server/schemas/application'
import type { ApplicationFormInput } from '@/types'

const stateOptions = new UsaStates().states.map((state) => ({
    label: state.name,
    value: state.abbreviation,
}))

const turnstileRef = ref()
const tsToken = ref()
const constants = useConstants()
const toast = useNotification()

const formState = reactive({
    submitted: false,
    success: false,
})

const formData = reactive<ApplicationFormInput>({
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
    positionDesired: '',
    dateAvailable: '',
    availability: 'full-time',
    salaryDesired: null,
    currentlyEmployed: null,
    education: [],
    history: [],
    references: [],
})

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: applicationSchema,
    initialValues: formData,
})

const [dateAvailableField, dateAvailableFieldProps] =
    defineField('dateAvailable')

const [salaryField, salaryFieldProps] = defineField('salaryDesired')

const {
    remove: removeEducation,
    push: pushEducation,
    fields: educationFields,
} = useFieldArray('education')
const {
    remove: removeHistory,
    push: pushHistory,
    fields: historyFields,
} = useFieldArray('history')
const {
    remove: removeReference,
    push: pushReference,
    fields: referenceFields,
} = useFieldArray('references')

const addHistory = (data = {}) =>
    pushHistory({
        companyName: '',
        companyLocation: '',
        positionTitle: '',
        positionDates: [],
        leaveReason: '',
        ...data,
    })

const addEducation = (data = {}) =>
    pushEducation({
        type: null,
        name: '',
        location: '',
        subjects: '',
        completed: null,
        ...data,
    })

const addReference = (data = {}) =>
    pushReference({
        name: '',
        yearsKnown: null,
        address: '',
        phone: '',
        ...data,
    })

const onSubmit = handleSubmit(
    async (values) => {
        try {
            await $fetch('/_turnstile/validate', {
                method: 'post',
                body: {
                    token: tsToken.value,
                },
            })

            await $fetch('/api/applications', {
                method: 'post',
                body: values,
            })

            formState.success = true
            formState.submitted = true

            toast.success(constants.APP_EMPLOYMENT_SUBMIT_SUCCESS)

            useTrackEvent('employment_form_submission')
        } catch (error: FetchError<H3Error>) {
            if (error.data) {
                toast.error(error.data.message)
            } else {
                toast.error(error.message)
            }

            turnstileRef.value.reset()
        }
    },
    () => {
        toast.error(constants.APP_FORM_VALIDATION_ERROR)
    },
)

addReference()
addReference()
addReference()
addEducation()
</script>

<style scoped></style>
