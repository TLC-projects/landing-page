import { useEffect } from "react";


/**
 * Use this hook to schedule cleanup of particles after a certain amount of time has passed since the last interaction.
 * This is useful for the ripple effect in the button component, where we want to remove old particles after they have finished fading away.
 * 
 * example usage:
 * 
 * const [particles, setParticles] = useState<Particle[]>([]);
 * const [interactionCount, setInteractionCount] = useState(0);
 * useCleanup(interactionCount, setParticles);
 * 
 * @param interactionCount - a state variable that increments every time the user interacts with the button. This is used to trigger the cleanup effect.
 * @param setParticles  - the state setter function for the particles array. This is used to clear the particles after they have finished fading away.
 * @param delay - the amount of time (in milliseconds) to wait after the last interaction before clearing the particles. Default is 500ms, which is the duration of the ripple animation.
 */
export function useCleanup<T>(interactionCount: number, setParticles: React.Dispatch<React.SetStateAction<T[]>>, delay: number = 500) {
  // This effect runs whenever the user interacts with the button.
  // It schedules a timeout to delete particles that have finished
  // fading away.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setParticles([]);
    }, delay + 200);

    // This returned function will get called right before
    // running the effect. This will cancel the timeout if
    // the user interacts with the button again before the particles
    // have finished fading away, guaranteeing that we never
    // erase particles that are mid-fade.
    // You can think of this whole thing as a debounce. The
    // timeout only fires when there hasn't been interaction for
    // a few seconds.
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [interactionCount, setParticles]);
}