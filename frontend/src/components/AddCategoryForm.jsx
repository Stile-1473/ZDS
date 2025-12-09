import {useEffect, useState} from "react";
import Input from "./Input.jsx";
import EmojiPickerPop from "./EmojiPickerPop.jsx";
import {LoaderCircle} from "lucide-react";

const AddCategoryForm = ({onAddCategory,intialCategoryData,isEditing})=>{

    const [loading,setIsLoading] = useState(null)
    const [category,setCategory] = useState({

        name:"",
        type:"",
        icon:""
    })

    useEffect(()=>{
        if(isEditing && intialCategoryData){
            setCategory(intialCategoryData)
        }else{
            setCategory({name: "",type: " income",icon: ""})
        }
    },[isEditing,intialCategoryData])

    const categoryTypes = [
        {value : "income",label :"Income"},
        {value : "expense",label :"Expense"}
    ]

    const handleChange = (key,value) => {
        setCategory({...category,[key] : value})
    }

    const handleSubmit = async ()=>{
        setIsLoading(true)
        try{
           await onAddCategory(category)
        }finally {
            setIsLoading(false)
        }
    }

    return(
        <div className="space-y-6 bg-white p-3 h-fit rounded-md shadow-2xl">
            <EmojiPickerPop icon={category.icon}
            onSelect={(selectIcon) => handleChange("icon" ,selectIcon) }
            />

            <Input
            value={category.name}
            onChange={(value) => handleChange("name",value )}
            label="Category Name"
            placeholder="e.g Bonus Allowance"
            type="text"
            />

            <Input
                label="Category Type"
                value={category.type}
                onChange={(value) => handleChange("type",value)}
                isSelect={true}
                options={categoryTypes}
            />

            <div className="flex justify-end pt-4">
                <button
                    disabled={loading}
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-300
                    text-white
                            rounded-lg
                    border-gray-200
                    border
                    text-2xl
                     gap-2 px-5 py-2.5
                    disabled:opacity-60 disabled:cursor-not-allowed active:scale-95">
                    {loading ? (
                        <>
                        <LoaderCircle className="w-4 h-4 animate-spin"/>
                            {isEditing ? "Updating.." : "Adding.."}
                        </>

                    ) : (
                        <>
                            {isEditing ? "Update Category" : "Add Category"}
                        </>
                    )}

                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm