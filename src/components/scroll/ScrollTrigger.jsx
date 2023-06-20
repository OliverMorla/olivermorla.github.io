// Author: Benjamin Kosten (bendgk) https://github.com/bendgk
import {useRef, useEffect} from "react"
import { useAnimationControls, motion } from "framer-motion"

export const ScrollTrigger = (props) => {
    const onEnter = () => { controls.start(props.animate)}
    const onLeave = () => { controls.stop(); controls.start(props.initial) }

    const scope = useRef()
    const wrapper = (entries, observer) => entries.forEach(entry => entry.isIntersecting ? onEnter(entry.target) : onLeave(entry.target))
    const observer = new IntersectionObserver(wrapper)
    const controls = useAnimationControls()

    useEffect(() => {
        observer.observe(scope.current)
    },[scope])

    return (<motion.div 
        initial={props?.initial ?? {}} 
        animate={controls} 
        transition={props?.transition ?? {}} 
        variants={props?.variants ?? {}} 
        style={props?.style ?? {}} 
        ref={scope}>{props.children}
    </motion.div>)
}