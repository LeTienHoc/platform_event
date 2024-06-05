import { z } from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3,'Tiêu đề phải lớn hơn 3 ký tự'),
    description: z.string().min(3,'Mô tả phải lớn hơn 3 ký tự').max(400,
        'Mô tả không được quá 400 ký tự'
    ),
    location: z.string().min(3,'Vị trí phải lớn hơn 3 ký tự').max(400,
        'Vị trí không được nhập quá 400 ký tự'
    ),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime:z.date(),
    categoryId:z.string(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url()
})