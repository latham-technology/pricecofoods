import { StatusCodes } from 'http-status-codes'
import { adminUserSchema } from '~/server/schemas/adminUser'
import { errorResponse, successResponse } from '~/server/utilities'

export default eventHandler(async (event) => {
    const { $db, $sentry } = useNitroApp()
    const session = await useAuthSession(event)
    const body = await readBody(event)

    try {
        const data = await adminUserSchema.validate(body)

        try {
            const user = await $db.client.adminUser.findUnique({
                where: {
                    email: data.email,
                },
            })

            if (!user) {
                return errorResponse(event, StatusCodes.UNAUTHORIZED)
            }

            if (user.password !== (await hash(data.password))) {
                return errorResponse(event, StatusCodes.UNAUTHORIZED)
            }

            await session.update({
                id: user.id,
                email: user.email,
            })

            return successResponse(
                event,
                StatusCodes.OK,
                session.data,
            )
        } catch (error) {
            $sentry.captureException(error)
            return errorResponse(
                event,
                StatusCodes.INTERNAL_SERVER_ERROR,
            )
        }
    } catch (error) {
        return errorResponse(event, StatusCodes.BAD_REQUEST)
    }
})
