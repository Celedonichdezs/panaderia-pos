// src/supabase.js
// ─────────────────────────────────────────────────────────────
//  Reemplaza los valores con los de tu proyecto en Supabase:
//  Supabase → Settings → API
// ─────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = https://szbafgvlxwhvwlsedskc.supabase.co   // https://xxxxx.supabase.co
const SUPABASE_KEY  = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YmFmZ3ZseHdodndsc2Vkc2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5Njk3MjYsImV4cCI6MjA4NjU0NTcyNn0.YeReH2UY9oTAj6JbxRwr2fm2er-oXkPAkqk-F52a0hw // eyJhbGci...

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)