"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function SaveAnimeFirebase({ data }: { data: any }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [like, setLike] = useState(false);

  const { user } = UserAuth();
  const url = `${pathname}?${searchParams}`;
  const { description, totalEpisodes, image, title } = data;

  const markWatchLaterAnime = async (data: any) => {
    const userEmail = user?.email;
    const userVerified = user?.emailVerified;
    if (userEmail && userVerified) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        watchLaterAnime: arrayUnion({
          title,
          description,
          image,
          totalEpisodes,
          url,
          from: "anime",
        }),
      });
    } else alert("Login to save Movies, Shows and Anime to Watch Later");
  };

  return <button onClick={() => markWatchLaterAnime(data)}>Save Anime</button>;
}
