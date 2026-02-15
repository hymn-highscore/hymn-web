"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SupabaseDebug() {
  useEffect(() => {
    (async () => {
const { data } = await supabase.auth.getSession();
console.log("SESSION OBJECT:", data);
console.log("SESSION VALUE:", data.session);

    })();
  }, []);

  return <div>Check console for Supabase session</div>;
}
