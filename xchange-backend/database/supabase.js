const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://dcgtounsuwfwnxxtceif.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; // Ensure this is set in your .env file
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;