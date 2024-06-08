'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import { z } from "zod"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { FileUploader } from "./FileUploader"
import Image from "next/image"
import LocationIcon from "/public/assets/icons/upload.svg"
import DateTimeIcon from "/public/assets/icons/calendar.svg"
import DatePicker from "react-datepicker";
import PriceTimeIcon from "/public/assets/icons/dollar.svg"
import LinkIcon from "/public/assets/icons/link.svg"
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox";
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { CreateEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"

type EventFormProps = {
    userId: string,
    type: "Create" | "Update",
    event?: IEvent,
    eventId?: string
}
const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {

    const [files, setFiles] = useState<File[]>([]);
    const [startDate, setStartDate] = useState(new Date());
    const { startUpload } = useUploadThing('imageUploader');
    const initialValues = eventDefaultValues;

    const router = useRouter();

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        const event = values;
        let uploadedImageUrl =  values.imageUrl;
        if(files.length>0){
            const uploadedImages = await startUpload(files);

            if(!uploadedImages) return
            uploadedImageUrl =uploadedImages[0].url
        }
        if(type==="Create"){
            try {
                const newEvent = await CreateEvent({
                    event : {...values,imageUrl: uploadedImageUrl},
                    userId,
                    path:'/profile'
                })
                if(newEvent){
                    form.reset();
                    router.push(`/events/${newEvent._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(type === 'Update') {
            if(!eventId) {
              router.back()
              return;
            }
      
            try {
              const updatedEvent = await updateEvent({
                userId,
                event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
                path: `/events/${eventId}`
              })
      
              if(updatedEvent) {
                form.reset();
                router.push(`/events/${updatedEvent._id}`)
              }
            } catch (error) {
              console.log(error);
            }
          }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Tiêu đề" {...field}
                                        className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important;" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown onChangeHandler={field.onChange}
                                        value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea placeholder="Mô tả..." {...field}
                                        className="bg-gray-50 flex flex-1 placeholder:text-gray-500 text-[16px] font-normal leading-[24px] px-5 py-3 border-none focus-visible:ring-transparent !important rounded-2xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                            src={LocationIcon}
                                            alt="calender"
                                            width={24}
                                            height={24}
                                        />
                                        <Input placeholder="Vị trí..." {...field}
                                            className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important;" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                            src={DateTimeIcon}
                                            alt="calender"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-gray-600">Ngày bắt đầu:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="dd/MM/yyyy hh:mm:ss aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                            src={DateTimeIcon}
                                            alt="calender"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-gray-600">Ngày kết thúc:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="dd/MM/yyyy hh:mm:ss aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                            src={PriceTimeIcon}
                                            alt="dollar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Giá" {...field}
                                            className="text-[16px] font-normal leading-[24px] border-0 bg-gray-50 outline-offset-0 focus:border-0 
                                        focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none
                                                    peer-disabled:cursor-not-allowed
                                                    peer-disabled:opacity-70">Miễn phí</label>
                                                            <Checkbox onCheckedChange={field.onChange} checked={field.value} id="isFree" className="mr-2 h-5 w-5 border-2 border-indigo-500" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                                        <Image
                                            src={LinkIcon}
                                            height={24}
                                            width={24}
                                            alt="link" />
                                        <Input placeholder="URL" {...field}
                                            className="bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important;" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ) : `${type} Event `}</Button>
            </form>
        </Form>
    )
}

export default EventForm