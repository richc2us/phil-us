
export const  initialSateCompany = {
    name: "",
    address: "",
    address2: "",
    description: "",
    active: false
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
    project_type:"",
    project_status: "",
    total_area: 0
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
    leads: [],
    active: true
}

export const initialStateUser = {
    spouse_user_id:null,
    realty_id : null,
    first_name: "",
    middle_name: "",
    last_name: "",
    address: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    zip: "",
    gender:"",
    civil_status:"",
    email: "",
    phone: "",
    account_type: "",
    tin: "",
    tin_issuance: "",
    verified : false,
    references: []
}

export const initialStateBuyer = {
    ...initialStateUser,
    spouse: {
        ...initialStateUser
    }
}

export const initialStateAgent = {
    ...initialStateUser,
    spouse_user_id:null,
    realties: [],
    realty_id: null,
}

export const initialStateAmortizationSchedule = {
    amortization_id : null,
    payment_id: null,
    due_date : "",
    amount: 0,
    paid: false
}

export const initialStateAmortizationEquity = {
    amortization_id : null,
    payment_id: null,
    due_date : "",
    amount: 0,
    paid: false
}

export const initialStateAmortizationCommissionSharing = {
    entity_id: "",
    type: "",
    percent: 0,
    active: true
}

export const initialStateReservation = {
    borrowers:[
        {...initialStateBuyer}
    ],
    equity: [{
        ...initialStateAmortizationEquity
    }],
    schedules : [
        {...initialStateAmortizationSchedule}
    ],
    commission_sharing: [
        {...initialStateAmortizationCommissionSharing, percent: 2},
        {...initialStateAmortizationCommissionSharing},
        {...initialStateAmortizationCommissionSharing, percent: 8},
        {...initialStateAmortizationCommissionSharing},
        {...initialStateAmortizationCommissionSharing}
    ],
    project_id : null,
    block_id: null,
    lot_id : null,
    realty_id: null,
    agent_id:null,
    projects: [],
    blocks:[],
    lots:[],
    realties:[],
    agents:[],
    area: 0,
    price_per_sqm:0,
    tcp:0,
    down_payment:0,
    discount_percent:0,
    discount_percent_amount : 0,
    reservation:0,
    lot_condition:"",
    balance:0,
    monthly:0,
    equityMonthly: 0,
    overall_commission_percent: 0,
    overall_commission_amount: 0,
    terms:60,
    years: 5,
    active: true
}

export const initialAcceptablePayment = {
    mode_of_payment : "",
    name: "",
    description: ""
}

export const initialReceiverAccount = {
    ...initialAcceptablePayment,
    account_number: ""
}

export const dataTableOptions = {
    download : false,
    filter: false,
    print: false,
    viewColumns : false,
    rowsPerPage: 10
}

export const initialStateLot = {
    id:"",
    _id:"",
    name: "",
    area: 0,
    project_id:"",
    block_id: "",
    price_per_sqm:0,
    status:"available",
    remark: "REGULAR LOT",
    amortization_id: "",
    projectID:"",
    active: true,
    agentName: "",
    agent_id: ""
}