import { type NextRequest, NextResponse } from 'next/server'
import { createItems, readItems, updateItems } from '@directus/sdk'
import { directusClient, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest, { params: { messageId } }: { params: { messageId: string } }) {
  const { user } = getInfo(request)
  const params = await request.json()
  const existed = await directusClient.request(
    readItems('dify_chat_history_spd', {
      filter: {
        message_id: messageId,
      },
      limit: 1,
    }),
  )

  if (existed?.length > 0) {
    const updated = await directusClient.request(
      updateItems('dify_chat_history_spd', {
        filter: {
          message_id: messageId,
        },
      }, {
        ...params,
        created_by: user,
        message_id: messageId,
      }),
    )

    return NextResponse.json({
      data: updated,
    })
  }

  const created = await directusClient.request(
    createItems('dify_chat_history_spd', {
      ...params,
      created_by: user,
      message_id: messageId,
    }),
  )

  return NextResponse.json({
    data: created,
  })
}
