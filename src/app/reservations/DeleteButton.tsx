"use client"

import { deleteAmortizationAction } from "@/actions/amortizations"
import NormalButtonAction from "../../components/FormElements/Buttons/NormalButtonAction"

export const DeleteButton = ({id} : any) => {
    return <form action={ async() =>  await deleteAmortizationAction(id) }> <NormalButtonAction>Delete</NormalButtonAction> </form>
    
}
