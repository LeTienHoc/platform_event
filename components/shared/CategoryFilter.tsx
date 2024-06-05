"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ICategory } from "../../lib/database/models/category.model";
import { getAllCategories } from "../../lib/actions/category.actions";
import { formUrlQuery, removeKeysFromQuery } from "../../lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, [])

  const onSelectCategory = (category: string) => {
      let newUrl = '';

      if(category && category !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'category',
          value: category
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['category']
        })
      }

      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="w-full bg-gray-50 h-[54px] placeholder:text-gray-500 rounded-full text-[16px] font-normal leading-[24px] px-5 py-3 border-none focus-visible:ring-transparent focus:ring-transparent !important">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="py-3 cursor-pointer  focus:bg-primary-foreground text-[14px] font-normal leading-[20px]">Tất cả</SelectItem>

        {categories.map((category) => (
          <SelectItem value={category.name} key={category._id} className="py-3 cursor-pointer  focus:bg-primary-foreground text-[14px] font-normal leading-[20px]">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryFilter