import { use, useState } from 'react'
import Card from './components/Cards'

function App() {

  const [itemsData, setItemsData] = useState({
    itemName: "",
    calories: "",
    protien: "",
    carbs: "",
    fats: "",
    itemQuantity:1,
})

const [itemList, setItemList] = useState([]);
const [totalCalories, setTotalCalories] = useState(0);
const [totalProtien, setTotalProtien] = useState(0);
const [totalCarbs, setTotalCarbs] = useState(0);
const [totalFat, setTotalFat] = useState(0);
const [editingItemName, setEditingItemName] = useState(null);
const [isEdit, setIsEdit] = useState(false);

function addItem(){

  setItemList(prevList =>
    itemsData.itemName && itemsData.calories && itemsData.protien && itemsData.carbs && itemsData.fats ?
    [...prevList,itemsData]
    : prevList
  )
  setItemsData({
    itemName:"",
    calories:"",
    protien:"",
    carbs:"",
    fats:"",
    itemQuantity:1,
  })
  setTotalCalories(prevTotalCal =>
    prevTotalCal + Number(itemsData.calories || 0)
  )
  setTotalProtien(prevTotalProtien =>
    prevTotalProtien + Number(itemsData.protien || 0)
  )
  setTotalCarbs(prevTotalCarbs => 
    prevTotalCarbs + Number(itemsData.carbs || 0)
  )
  setTotalFat(prevTotalFat =>
    (prevTotalFat + Number(itemsData.fats || 0))
  )
}

function handleChange(e){
  const { name, value } = e.target
    setItemsData(prev => ({
      ...prev,
      [name]: value
    }))
}

function clearItem(){
  setItemList([]);
  setItemsData({
    itemName:"",
    calories:"",
    protien:"",
    carbs:"",
    fats:"",
    itemQuantity:1,
  })
  setTotalCalories(0)
  setTotalProtien(0)
  setTotalCarbs(0)
  setTotalFat(0)
}

function addItemQuantity(itemName){
  const item = itemList.find(item => item.itemName === itemName)
  if (!item) return

  setItemList(prevList =>
    prevList.map(item =>
      item.itemName === itemName ? {...item, itemQuantity: item.itemQuantity + 1} : item
    )
  )
  setTotalCalories(prevTotal => prevTotal + Number(item.calories || 0));
  setTotalProtien(prevTotalProtien =>
    prevTotalProtien + Number(item.protien || 0)
  )
  setTotalCarbs(prevTotalCarbs =>
    prevTotalCarbs + Number(item.carbs || 0)
  )
  setTotalFat(prevTotalFat =>
    prevTotalFat + Number(item.fats || 0)
  )

}

function subItemQuantity(itemName){
  const item = itemList.find(item => item.itemName === itemName)
  if (!item) return

  setItemList(prevList =>
    prevList.map(item =>
      item.itemName === itemName && item.itemQuantity > 0 ? {...item, itemQuantity: item.itemQuantity - 1} : item
    )
  )
  setTotalCalories(prevTotal => prevTotal - Number(item.calories || 0));
  setTotalProtien(prevTotalProtien =>
    prevTotalProtien - Number(item.protien || 0)
  )
  setTotalCarbs(prevTotalCarbs =>
    prevTotalCarbs - Number(item.carbs || 0)
  )
  setTotalFat(prevTotalFat =>
    prevTotalFat - Number(item.fats || 0)
  )

}

function deleteItem(itemName){
  const item = itemList.find(item => item.itemName === itemName)
  if(!item) return

  setItemList(prevList =>
    prevList.filter(i => i.itemName !== itemName)
  )

  setTotalCalories(prevTotal =>
     prevTotal - Number(item.calories || 0) * (item.itemQuantity || 1)
  );
  setTotalProtien(prevTotalProtien =>
    prevTotalProtien - Number(item.protien || 0) * (item.itemQuantity || 1)
  )
  setTotalCarbs(prevTotalCarbs =>
    prevTotalCarbs - Number(item.carbs || 0) * (item.itemQuantity || 1)
  )
  setTotalFat(prevTotalFat =>
    prevTotalFat - Number(item.fats || 0) * (item.itemQuantity || 1)
  )
}

function editItem(itemName){
  const item = itemList.find(item => item.itemName === itemName)

  setItemsData(item)
  setEditingItemName(item.itemName)
  setIsEdit(prevIsEdit => !prevIsEdit)

}

function updateItem(){

  const item = itemList.find(item => item.itemName === editingItemName)
  if(!item) return

  const quantity = item.itemQuantity || 1

  const oldTotalCalories = Number(item.calories || 0) * quantity
  const oldTotalProtien = Number(item.protien || 0) * quantity
  const oldTotalCarbs = Number(item.carbs || 0) * quantity
  const oldTotalFats = Number(item.fats || 0) * quantity

  const newTotalCalories = Number(itemsData.calories || 0) * quantity
  const newTotalProtien = Number(itemsData.protien || 0) * quantity
  const newTotalFats = Number(itemsData.fats || 0) * quantity
  const newTotalCarbs = Number(itemsData.carbs || 0) * quantity

  setItemList(prevList =>
    prevList.map(item =>
      item.itemName === editingItemName ? {...item, ...itemsData} : item
    )
  )

  setTotalCalories(prevTotal => prevTotal - oldTotalCalories + newTotalCalories)
  setTotalProtien(prevTotalProtien =>
    prevTotalProtien - oldTotalProtien + newTotalProtien
  )
  setTotalCarbs(prevTotalCarbs =>
    prevTotalCarbs - oldTotalCarbs + newTotalCarbs
  )
  setTotalFat(prevTotalFat =>
    prevTotalFat - oldTotalFats + newTotalFats
  )

  setEditingItemName(null)
  setIsEdit(prevIsEdit => !prevIsEdit)
  setItemsData({
    itemName: "",
    calories: "",
    protien: "",
    carbs: "",
    fats: "",
  })
}

const itemCards = itemList.map(item => {
  return(
  <Card 
    key={item.itemName} 
    name={item.itemName} 
    calories={item.calories} 
    protien={item.protien} 
    carbs={item.carbs} 
    fats={item.fats} 
    itemQuantity={item.itemQuantity}
    addItemQuantity={() => addItemQuantity(item.itemName)}
    subItemQuantity={() => subItemQuantity(item.itemName)}
    deleteItem={() => deleteItem(item.itemName)}
    editItem={() => editItem(item.itemName)}
    isEdit={isEdit}
  />
  )
})


  return (
    <>
      <h1 className='flex justify-center m-[1.5rem] font-bold text-4xl '>Nutrition Meter</h1>
      <section>
        <main className="flex flex-col w-full justify-center items-center ">
            <div className="grid grid-cols-2 gap-4 ">
                <input onChange={handleChange} value={itemsData.itemName} name='itemName' type="text" placeholder="ItemName" className="border-2 border-gray-200 w-[400px] py-[5px] px-[20px] rounded-[10px] "  />
                <input onChange={handleChange} value={itemsData.calories} name='calories' type="text" placeholder="Calories" className="border-2 border-gray-200 w-[400px] py-[5px] px-[20px] rounded-[10px] " />
                <input onChange={handleChange} value={itemsData.protien} name='protien' type="text" placeholder="Protiens(g)" className="border-2 border-gray-200 w-[400px] py-[5px] px-[20px] rounded-[10px] " />
                <input onChange={handleChange} value={itemsData.carbs} name='carbs' type="text" placeholder="Carbs(g)" className="border-2 border-gray-200 w-[400px] py-[5px] px-[20px] rounded-[10px] " />
                <input onChange={handleChange} value={itemsData.fats} name='fats' type="text" placeholder="Fat(g)" className="border-2 border-gray-200 w-[400px] py-[5px] px-[20px] rounded-[10px] " />
            </div>
            <div className="flex gap-4 mt-[1rem]">
                { isEdit ?
                  <button onClick={updateItem} className="w-[400px] py-[5px] px-[20px] rounded-[10px] bg-blue-600 text-white cursor-pointer ">Update Items</button>
                  : null
                }
                <button onClick={addItem} className="w-[400px] py-[5px] px-[20px] rounded-[10px] bg-green-600 text-white cursor-pointer ">Add Items</button>
                <button onClick={clearItem} className="w-[400px] py-[5px] px-[20px] rounded-[10px] bg-red-600 text-white cursor-pointer " >Clear All</button>
            </div>
        </main>
      </section>
      <section className='flex flex-row flex-wrap justify-center '>
        {itemCards}
      </section>
      
     {
      totalCalories > 0 && totalProtien > 0 && totalCarbs > 0 && totalFat > 0 ?
       <section className='flex flex-col justify-center items-center m-[1rem] mt-[2rem] '>
          <p className='text-2xl font-semibold'>Total Calories: {totalCalories}g</p>
          <p className='text-2xl font-semibold'>Total Protien: {totalProtien}g</p>
          <p className='text-2xl font-semibold'>Total Carbs: {totalCarbs}g</p>
          <p className='text-2xl font-semibold '>Total Fat: {totalFat}g</p>
       </section>
       :
       null
      }
    </>
  )
}

export default App
