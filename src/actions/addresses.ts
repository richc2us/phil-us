'use server';
import { promises as fs } from 'fs';

const addressesDirectory = process.cwd() + '/src/lib/addresses/'

export const getRegions = async() => {
    let file = await fs.readFile(addressesDirectory + 'regions.json', 'utf8');
    return JSON.parse(file);
}

export const getProvinces = async(region_code:any) => {
    let file = await fs.readFile(addressesDirectory + 'provinces.json', 'utf8');
        const provinces = JSON.parse(file);
        return provinces.filter( (province:any)  => province.region_code === region_code).map( (filtered:any) => {
            return {
                psgc_code : filtered.psgc_code,
                province_name: filtered.province_name,
                province_code: filtered.province_code,
                region_code: filtered.region_code
            }
        })
}

export const getCities = async(province_code:any) => {
    let file = await fs.readFile(addressesDirectory + 'cities.json', 'utf8');
        const cities = JSON.parse(file);
        return cities.filter( (city:any)  => city.province_code === province_code).map( (filtered:any) => {
            return {
                city_name: filtered.city_name,
                city_code: filtered.city_code,
                province_code: filtered.province_code,
                region_desc: filtered.region_desc,
            }
        })
}

export const getBarangays = async(city_code:any) => {
    let file = await fs.readFile(addressesDirectory + 'barangays.json', 'utf8');
    const barangays = JSON.parse(file);
    return barangays.filter( (barangay:any)  => barangay.city_code === city_code).map( (filtered:any) => {
        return {
            brgy_name: filtered.brgy_name,
            brgy_code: filtered.brgy_code,
            province_code: filtered.province_code,
            region_code: filtered.region_code,
        }
    })
}
