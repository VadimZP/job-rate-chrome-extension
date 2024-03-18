import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gfnyrphklamvvvndhdzi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmbnlycGhrbGFtdnZ2bmRoZHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNzM0OTMsImV4cCI6MjAyNTg0OTQ5M30.cxv00hd14dYE0WXfEdeJkVKSMAN07Qs02T-IjIQpN6U'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
