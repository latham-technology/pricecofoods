import type { H3Event } from 'h3'

export function usePagination(event) {
    let {
        page = 0,
        perPage = 10,
        orderBy = 'createdAt',
        sort = 'desc',
    } = getQuery(event)

    // if (
    //     !['createdAt', 'updatedAt', 'id'].includes(orderBy as string)
    // ) {
    //     orderBy = 'createdAt'
    // }

    if (!['asc', 'desc'].includes(sort as string)) {
        sort = 'desc'
    }

    page = parseInt(page as string)
    perPage = parseInt(perPage as string)

    if (isNaN(page) || page < 0) {
        page = 1
    }

    if (isNaN(perPage) || perPage < 1 || perPage > 100) {
        perPage = 10
    }

    return mapParamsToPrisaOptions({
        page,
        perPage,
        orderBy,
        sort,
    })
}

export function withPagination(result) {}

function mapParamsToPrisaOptions(params) {
    return {
        skip: params.perPage * params.page,
        take: params.perPage,
        orderBy: {
            [params.orderBy]: params.sort,
        },
    }
}
