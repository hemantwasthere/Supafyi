import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const useGetUserAvatar = (userId?: string) => {
  const { supabaseClient } = useSessionContext();
  const [avatar_url, setAvatar_url] = useState('')

  useEffect(() => {
    if (!userId) return

    const fetchUrl = async () => {
      const { data, error } = await supabaseClient
      .from('users')
      .select('avatar_url')
      .eq('id', userId)
      .single();

      if (error) return toast.error(error.message)
      
      setAvatar_url(data.avatar_url);
    }

    fetchUrl();
  }, [userId, supabaseClient]);

  return avatar_url;
};

export default useGetUserAvatar;