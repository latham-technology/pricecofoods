import { StatusCodes } from 'http-status-codes'
import { successResponse } from '~/server/utilities'

export default eventHandler(async (event) => {
    const session = await useAuthSession(event)
    return successResponse(event, StatusCodes.OK, session.data)
})
