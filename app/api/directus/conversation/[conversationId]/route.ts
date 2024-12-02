import { type NextRequest, NextResponse } from 'next/server'
import { readItems } from '@directus/sdk'
import { directusClient } from '@/app/api/utils/common'

export async function GET(request: NextRequest, { params }: { params: { conversationId: string } }) {
  const resp = await directusClient.request(
    readItems('dify_chat_history_spd', {
      filter: {
        conversation_id: {
          _eq: params.conversationId,
        },
      },
      fields: [
        'message_id',
        'rating',
      ],
      limit: 1000,
    }),
  )

  return NextResponse.json({
    data: resp,
  })
}
