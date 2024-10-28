"use client"

import { truncateAmortizations, truncateCompanies, truncateProject, truncateRealties, truncateUsers } from "@/actions/truncate"
import PrimarySaveButton from "@/components/FormElements/Buttons/PrimarySaveButton"

export default function() {

    return(
        <>
        <table className="table-auto w-full h-full">
            <thead>
                <tr>
                    <th>Tables</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center">
                        Companies
                    </td>
                    <td className="text-center">
                        <form className="inline-block" action={
                            async() => await truncateCompanies()
                        }>
                            <PrimarySaveButton>Truncate</PrimarySaveButton>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td className="text-center">
                        Projects
                    </td>
                    <td className="text-center">
                        <form className="inline-block" action={
                            async() => await truncateProject()
                        }>
                            <PrimarySaveButton>Truncate</PrimarySaveButton>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td className="text-center">
                        Realties
                    </td>
                    <td className="text-center">
                        <form className="inline-block" action={
                            async() => await truncateRealties()
                        }>
                            <PrimarySaveButton>Truncate</PrimarySaveButton>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td className="text-center">
                        Users
                    </td>
                    <td className="text-center">
                        <form className="inline-block" action={
                            async() => await truncateUsers()
                        }>
                            <PrimarySaveButton>Truncate</PrimarySaveButton>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td className="text-center">
                        Amortizations
                    </td>
                    <td className="text-center">
                        <form className="inline-block" action={
                        async() => await truncateAmortizations()
                        }>
                            <PrimarySaveButton>Truncate</PrimarySaveButton>
                        </form>
                    </td>
                </tr>
            </tbody>
        </table>
        </>
    )
}