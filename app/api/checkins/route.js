import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const family_id = searchParams.get('family_id')

  let query = supabase
    .from('checkins')
    .select('*')
    .order('created_at', { ascending: false })

  if (family_id) query = query.eq('family_id', family_id)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request) {
  const body = await request.json()

  const { data, error } = await supabase
    .from('checkins')
    .insert([body])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Auto-flag logic
  const shouldFlag = body.mood <= 2 || body.pain >= 7 || body.bleeding === 'heavy'

  if (shouldFlag && body.family_id) {
    await supabase
      .from('families')
      .update({ status: 'flagged' })
      .eq('id', body.family_id)
  }

  return NextResponse.json(data[0], { status: 201 })
}