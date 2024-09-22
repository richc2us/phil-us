export const  initialSateCompany = {
    name: "",
    address: "",
    address2: "",
    description: ""
}

export const initialStateProject : any = {
    name: "",
    address1: "",
    address2: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    zip: "",
    landmark: "",
    latitude: "",
    longitude: "",
    original_owners: [
        // {
        //     first_name: "",
        //     middle_name: "",
        //     last_name:"",
        //     phone: "",
        //     email:""
        // }
    ],
    purchase_scheme: "",
    title_information: "",
    legal_documentation: "",
    restrictions: "",
    terrane_information: "",
    total_number_of_lots: 0,
    date_bought: "",
    date_begin_selling: "",
    date_begin_grading: "",
    investment_amount: 0,
    geographic_layer_file: "",
    bulk_discount_scheme: 0,
    LTS: "",
}

export const  initialStateRealty = {
    name: "",
    address: "",
    tin: "",
    address2: "",
    description: "",
    commission_percent: 10,
    contact_number: "",
    lead_id:null,
    leads: []
}

export const initialStateBuyer = {
    first_name: "",
    middle_name: "",
    last_name: "",
    tin: "",
    tin_issuance: "",
    address: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    zip: "",
    email: "",
    phone: "",
    spouse: {
        first_name: "",
        middle_name: "",
        last_name:"",
        address:"",
        region: "",
        province: "",
        city: "",
        barangay: "",
        zip: "",
        email: "",
        phone: "",
        tin: "",
        tin_issuance: "",
    },
    buyer_id: null,
    spouse_user_id:null
}

export const initialStateAgent = {
    first_name: "",
    middle_name: "",
    last_name: "",
    tin: "",
    tin_issuance: "",
    address: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    zip: "",
    email: "",
    phone: "",
    buyer_id: null,
    spouse_user_id:null,
    realties: [],
    realty_id: null,
}