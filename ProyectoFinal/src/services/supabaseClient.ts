import { createClient } from "@supabase/supabase-js";
//subapaseClient.ts
//Gira Content

const SUPERBASE_URL = "https://ntqnngicovsmgyxzhsqf.supabase.com";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cW5uZ2ljb3ZzbWd5eHpoc3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODIxNzcsImV4cCI6MjA4OTQ1ODE3N30.nyuvZO0q7-QIxL_FR9ecFYHtgmP4UecVc3LwrNQOwf4"

export const supabase = createClient(SUPERBASE_URL, SUPABASE_ANON_KEY);