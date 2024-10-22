import Image from "next/image"

export function updateState(state:any, callback:any) : any  {
  return callback((prev:any) => {  return {  ...prev, ...state}})
}

export function requestApi(url:any,callback:any) {
    return fetch(url,{cache:"no-cache"}).then(res => res.json()).then(res => callback(res))
}

export function SidebarIcon(name: string) {
    return <Image alt={name} width={18} height={18} src={`/icons/${name}.svg`} />
  }

export function formatDecimal(val:any, sign:boolean = true) {
return (sign ? "₱ " : "") + new Intl.NumberFormat().format(val)
}