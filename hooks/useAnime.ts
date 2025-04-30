import { useRef, useEffect } from 'react';
import anime from 'animejs';

type AnimeInstance = ReturnType<typeof anime>;

interface UseAnimeProps {
  targets: string | Element | Element[] | NodeList | null;
  animation: anime.AnimeParams;
  dependencies?: any[];
  autoplay?: boolean;
}

/**
 * Custom hook for using anime.js in React components
 * @param targets - The elements to animate
 * @param animation - The animation parameters
 * @param dependencies - Dependencies array for the useEffect hook
 * @param autoplay - Whether to autoplay the animation
 * @returns The anime instance
 */
export const useAnime = ({
  targets,
  animation,
  dependencies = [],
  autoplay = true,
}: UseAnimeProps): AnimeInstance | null => {
  const animeRef = useRef<AnimeInstance | null>(null);

  useEffect(() => {
    if (!targets) return;

    // Create a new anime instance
    animeRef.current = anime({
      targets,
      ...animation,
      autoplay,
    });

    // Clean up the animation when the component unmounts
    return () => {
      if (animeRef.current) {
        animeRef.current.pause();
      }
    };
  }, [targets, ...dependencies]);

  return animeRef.current;
};

export default useAnime;
