export default function Card(props){

    return(
        <div className="m-[1rem] mt-[2rem] border-2 border-blue-400 rounded-2xl w-[200px] p-[20px] ">
            <h2 className="text-2xl font-bold mb-[1rem] ">{props.name}</h2>
            <p>Calories: {props.calories}g</p>
            <p>Protien: {props.protien}g</p>
            <p>Carbs: {props.carbs}g</p>
            <p>Fat: {props.fats}g</p>
            <div className="flex justify-between mt-[0.5rem] ">
                <button onClick={props.addItemQuantity} className="bg-green-600 text-2xl text-white px-[1.5rem] rounded-[5px] cursor-pointer ">&#43;</button>
                <p className="mx-[10px] text-center ">{props.itemQuantity}</p>
                <button onClick={props.subItemQuantity} className="bg-red-600 text-2xl text-white px-[1.5rem] rounded-[5px] cursor-pointer " >&#45;</button>
            </div>
            <div className="flex justify-center gap-4 mt-[0.5rem] ">
                <button onClick={props.editItem} className="bg-blue-400 text-white px-[1rem] py-[0.5rem] rounded-[5px] cursor-pointer ">Edit</button>
                <button onClick={props.deleteItem} className="bg-red-400 text-white px-[1rem] py-[0.5rem] rounded-[5px] cursor-pointer ">Delete</button>
            </div>
        </div>
    )
}