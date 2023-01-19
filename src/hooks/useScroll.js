import { useEffect, useRef } from "react";

export default function useScroll(parentRef, childRef, callback) {
    const observer = useRef()

    useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0  //if 0 , caallback immideately if child element shows, if 1 full child element
        }
       observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting){
                console.log('intersected')
                callback()
            }
       }, options);

       observer.current.observe(childRef.current)

       return function () {
         observer.current.unobserve(childRef.current)
       }

    }, [callback])
}