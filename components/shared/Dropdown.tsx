import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"


type DropdownProps = {
    value: string,
    onChangeHandler?: () => void
}
const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])

    const [newCategory,setNewCategory] = useState('');

    const handleAddCategory = () =>{
        createCategory({
            categoryName: newCategory.trim()
          })
            .then((category) => {
              setCategories((prevState) => [...prevState, category])
            })
    }
    useEffect(() => {
        const getCategories = async () => {
          const categoryList = await getAllCategories();
    
          categoryList && setCategories(categoryList as ICategory[])
        }
    
        getCategories();
      }, [])
    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="w-full bg-gray-50 h-[54px] placeholder:text-grey-500 rounded-full p-regular-16 px-5 py-3 border-none focus-visible:ring-transparent focus:ring-transparent !important;">
                <SelectValue placeholder="Loại" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}
                        className="py-3 cursor-pointer  focus:bg-primary-50 text-[14px] font-normal leading-[20px]">{category.name}</SelectItem>
                ))}

                <Dialog>
                    <DialogTrigger className="text-[14px] font-medium leading-[20px] flex w-full rounded-sm py-3 pl-8 text-indigo-700 hover:bg-primary-foreground focus:text-indigo-600">Thêm mới</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Thêm mới loại</DialogTitle>
                            <DialogDescription>
                                <Input type="text" placeholder="Tên loại" className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important mt-3" onChange={(e)=>setNewCategory(e.target.value)}/>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="submit" onClick={() => handleAddCategory()} className="pr-2">Thêm</Button>
                            <DialogClose className="border-solid">Thoát</DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </SelectContent>
        </Select>
    )
}

export default Dropdown