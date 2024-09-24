import Link from "next/link";
interface BreadcrumbProps {
  pageName: string,
  deepPages?: string[]
}
const Breadcrumb = ({ pageName, deepPages = [] }: BreadcrumbProps) => {
  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          { deepPages.length ? "" : <>
            <li className="font-medium text-primary">{pageName}</li>
          </> }
          {
              deepPages.length ? deepPages.map( (page, key) => {
                return <li className={"font-medium " + ( key + 1 == deepPages.length ? "text-primary" : "" ) } key={key}> { key > 0 ? "/" : "" } {page}</li>
              }) : <></>
          }
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
