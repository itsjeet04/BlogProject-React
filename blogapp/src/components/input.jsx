// forwardRef is used to forward the ref to the input element, providing a way to access the DOM node directly from the parent component.
// it’s not a hook, but a React API function.
// It’s useful when you want to manipulate a child’s DOM node (like focusing an input or measuring size).
import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    // It accepts props: label, type, className, and any extra props (...props).
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    // Creates a unique ID for the input and label pair.

    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {/* When a <label> has a htmlFor="some-id" that matches the id of an <input>, clicking the label automatically focuses the input.
                The label is like a name tag or sign above the input box. If you click on it, it makes the input box light up (get focused) — but only if the label and input are connected with the same id.
                If you don't connect them with the same id, clicking the label won't do anything.
                 */}
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
