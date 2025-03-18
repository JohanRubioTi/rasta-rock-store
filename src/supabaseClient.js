import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aflogzqsyhpbrizizfud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmbG9nenFzeWhwYnJpeml6ZnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzMjQzNzUsImV4cCI6MjA0NzkwMDM3NX0._xKbClBlwD2yhH5Up8mkg-Zo_G0C1oYXS31bQZUSAkQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
