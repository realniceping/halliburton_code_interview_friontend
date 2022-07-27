import React, {useState} from 'react'
import ArrayField from "./ArrayField" 
const axios = require("axios").default


type SendFieldPropsType = {

} 



const FileField = (props: SendFieldPropsType) => {

    const [oldMass, setOldMass] = useState(["choose file"])
    const [sortedMass, setSortedMass] = useState([])
    const [sortType, setSortType ] = useState("ask")

    // Элемент - поле выбора типа сортировки
    const FieldOfSortingType = (props: any) => {

        return(
            <select name="selector" id="selector" onChange={(e) => {setSortType(e.target.value)}}>
                <option value="ask">ask</option>
                <option value="desc">desc</option>
                <option value="reverse">reverse</option>
            </select>  
        )
    }
    
    //элемент - поле загрузки файла 
    const FileSenderField = () => {
        return(
            <div className='SendField'>
                <input type={"file"} id="file" onChange={(e) => FileLoadedHandler(e)}></input>
                <br />
            </div>
        )
    }

    //чтение файла при загрузке пользователем 
    const FileLoadedHandler = (e: any ) => {
        e.preventDefault()
        const reader = new FileReader();
        reader.onload = () => {
            //console.log(parseToArray(reader.result));
            setOldMass(parseToArray(reader.result))

        }
        reader.readAsText(e.target.files[0])
    
    }

    //не смог понять причину по которой ридер доставал данные из файла как jsx, написал такой метод 
    const parseToArray = (arg1: any): Array<string>=>{
        
        let s: string = ""

        for(let i = 1; i<arg1.length - 1; i++){
            s += arg1[i].toString()
        }
        //время час ночи :_(
        let out: Array<string> = s.split(`"`).join('').split(" ").join('').split(",") //удаление лишних символов + разделение в массив 
        return out;
    }
    //

    
    //логика при нажатии на кнопку сортировки 
    const SortButtonClickEventHandler = () => {
        console.log(sortType);
        console.log(oldMass);
        
        axios.post("http://localhost:5011/MyClass", {
            data: oldMass,
            type_of_sort: sortType
        }).then((res:any ) => {
            console.log(res);
            setSortedMass(res.data[0].data);
        }).catch((err: any) => {console.log(err);})
     
    }

    return(
        <div className='FileField'>
            <FileSenderField/>
            <span>Select type of sorting:  </span>
            <FieldOfSortingType/>
            <br />
            <button onClick={SortButtonClickEventHandler}>Sort</button>
            <hr />
            <h3>Unsorted array</h3>
            <ArrayField mass={oldMass}/>
            <hr />
            <h3>Sorted array</h3>
            <ArrayField mass={sortedMass}/>
        </div>

    )
}

export default FileField