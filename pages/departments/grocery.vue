<template>
    <div>
        <PageTitle
            :images="[
                {
                    src: '/img/grocery/grocLg01.png',
                    alt: 'A well-stocked grocery aisle featuring spices, sauces, soups, chips, and other specialty items',
                },
                {
                    src: '/img/grocery/grocSm01.png',
                    alt: 'A well-stocked grocery aisle featuring spices, sauces, soups, chips, and other specialty items',
                },
                {
                    src: '/img/grocery/grocSm02.png',
                    alt: 'A well-stocked grocery aisle featuring spices, sauces, soups, chips, and other specialty items',
                },
            ]"
            title="Specialty Products"
        />

        <PageContent>
            <template #sidebar>
                <MoreInformation :links="links" />
            </template>

            <AppTypography>
                PriceCo Foods is happy to supply one of the largest
                varieties of specialty items in every department. The
                grocery department has hard to find spices, sauces,
                soups, chips, baking products (Bob’s Red Mill is a
                favorite), organics, cereals, and juices to name a
                few.
            </AppTypography>
            <AppTypography>
                In every department you will find unusual out of the
                ordinary products.
            </AppTypography>
        </PageContent>
    </div>
</template>

<script setup lang="ts">
const links = [
    {
        text: 'Specialty Products',
        to: '/products/specialty',
    },
    {
        text: 'Gluten Free',
        to: '/products/glutenfree',
    },
    {
        text: 'Gourmet Wines',
        to: '/products/wine',
    },
    {
        text: 'Frozen Food',
        to: '/products/frozenfood',
    },
    {
        text: 'Item Request',
        to: '/products/order',
    },
]
</script>
