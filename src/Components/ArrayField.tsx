import React from 'react'

type ArrayFieldPropsType = {
    mass: Array<string>

}

const ArrayField = (props: ArrayFieldPropsType) => {

    const len = props.mass.length
    const createStringFromArray = (): string => {
        let output = ""

        props.mass.map((item: string, index: number) => {
            output += item 
            if(index !== len - 1) output += ", "
        })
        return output
    }

    const displayString = createStringFromArray()

    return(
        <div className='ArrayField fristArray'>
           {displayString}
        </div>
    )

}

export default ArrayField;