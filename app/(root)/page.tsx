import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import HeroIcon from '../../public/assets/images/hero.png'
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";


export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })
  return (
    <>
      <section className="bg-primary-foreground bg-dotted-pattern bg-contain
      py-5 md:py-10">
        <div className="wrapper flex gird gird-cols-1 gap-5
        md:gird-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
            Tổ chức, Kết nối, Kỷ niệm: Sự kiện của bạn, Nền tảng của chúng tôi!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
            Đăng ký và tìm hiểu những lời khuyên hữu ích từ hơn 3.168 cố vấn ở các công ty đẳng cấp thế giới với cộng đồng toàn cầu của chúng tôi.
            </p>
            <Button size="lg" className="button w-full sm:w-fit">
              <Link href="#event">
                Khám phá ngay
              </Link>
            </Button>
          </div>
          <Image
            src={HeroIcon}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center
           2xl:max-h-[50vh]"
          />

        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8
      md:gap-12">
        <h2 className="h2-bold">
          Tin tưởng bởi <br /> Hàng ngàn sự kiện
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="Không tìm thấy sự kiện"
          emptyStateSubtext="Quay trở lại sau"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
