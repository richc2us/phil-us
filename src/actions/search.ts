'use server';
import dbConnect from "@/lib/mongodb";
import  User  from "@/models/users"
import  Project  from "@/models/projects"
import  Realty  from "@/models/realties"


export const searchBuyer = async(text: string, all_type : boolean = false) => {
    await dbConnect()
    let buyers :any = []
    let condition =  all_type ? { $ne : ''} :   {$in : ['buyer']};
    const b  = await User.find({account_type: {...condition} , $text : {$search : text}}).populate('spouse_user_id')
    b.map( (i:any) => buyers.push({
        value : i._id.toString(),
        label: i.fullName + " [ " + i.email + " ]",
        data: i.toJSON(),
        isDisabled: !i.active
    }))

    return buyers
    // return[
    //     { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    //     { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    //     { value: 'purple', label: 'Purple', color: '#5243AA' },
    //     { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    //     { value: 'orange', label: 'Orange', color: '#FF8B00' },
    //     { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    //     { value: 'green', label: 'Green', color: '#36B37E' },
    //     { value: 'forest', label: 'Forest', color: '#00875A' },
    //     { value: 'slate', label: 'Slate', color: '#253858' },
    //     { value: 'silver', label: 'Silver', color: '#666666' },
    //   ];
}

export const searchUsers = async(text: string="", exclude:string = "0") => {
    await dbConnect()
    let users :any = []

    const b  = text.length == 0 ? await User.find() : await User.find({  $text : {$search : text}})
    b.map( (i:any) => users.push({
        value : i._id?.toString(),
        label: i.fullName + " ["+ i?.account_type +"]",
        data: i.toJSON(),
        isDisabled: !i.active
    }))
    return users
}

function searchAggregateBuilder(columns:any = [], q:string) : [{
    autocomplete: {
        query:string,
        path:string
    }
}] {
    let should : any = []

    columns.forEach( (column:any) => {
        should.push({
            autocomplete : {
                query : q,
                path: column
            }
        })
    } )

    return should
}

export const searchUserAtlas = async(query: string = "") => {
    await dbConnect()
    let aggregate = [{
        $search :  {
            index: "default",
            compound: {
                should: searchAggregateBuilder(['first_name','last_name','middle_name','email'],query),
                minimumShouldMatch: 1
            }
        }
    }]
    // let aggregate =
    // [
    //     {
    //         $search: {
    //             index: "default",
    //             compound: {
    //                 should: [
    //                     {
    //                         autocomplete: {
    //                             'query': query,
    //                             'path': 'first_name'
    //                         }
    //                     },
    //                     {
    //                         autocomplete: {
    //                             'query': query,
    //                             'path': 'last_name'
    //                         }
    //                     },
    //                     {
    //                         autocomplete: {
    //                             'query': query,
    //                             'path': 'middle_name'
    //                         }
    //                     },
    //                     {
    //                         autocomplete: {
    //                             'query': query,
    //                             'path': 'email'
    //                         }
    //                     }
    //                 ],
    //                 minimumShouldMatch: 1
    //             }
    //         }
    //     }
    // ]
    return User.aggregate(aggregate)
}

export const searchProjectAtlas = async(query: string = "") => {
    await dbConnect()
    let aggregate = [{
        $search :  {
            index: "projects",
            compound: {
                should: searchAggregateBuilder(['name','address1','address2','barangay','city','province','region','zip'],query),
                minimumShouldMatch: 1
            }
        }
    }]
    return Project.aggregate(aggregate)
}

export const searchRealtiesAtlas = async(query: string = "") => {
    await dbConnect()
    let aggregate = [{
        $search :  {
            index: "realties",
            compound: {
                should: searchAggregateBuilder(['name','address','address2','contact_number','description'],query),
                minimumShouldMatch: 1
            }
        }
    }]
    return Realty.aggregate(aggregate)
}

export const searchBarAtlas = async(query: string = "") => {
    const users = await searchUserAtlas(query)
    const projects = await searchProjectAtlas(query)
    const realties = await searchRealtiesAtlas(query)
    let results = []

    if(users.length) {
        results.push({
            label: "Users",
            options : users.map( (user) => ({
                value:user._id,
                label: user.first_name + " " + user.middle_name + " " + user.last_name,
                type: "users"
            }) )
        })
    }

    if(projects.length) {
        results.push({
            label: "Projects",
            options : projects.map( (project) => ({
                value: project._id,
                label: project.name,
                type:"projects"
            }))
        })
    }

    if(realties.length) {
        results.push({
            label: "Realties",
            options : realties.map( (realty:any) => ({
                value: realty._id,
                label: realty.name,
                type: "realties"
            }))
        })
    }

    return results
}

export const searchProject = async(text: string = "") => {
    let projects :any = []
    let q: any;
    await dbConnect()
    if(text.length == 0) {
        q = await Project.find({})
    } else {
        q = await Project.find({$text : {$search : text}})
    }
    q.map( (i:any) => projects.push({
        value : i._id.toString(),
        label: i.name + (!i.active ?  " - (inactive)" : "") ,
        data: i.toJSON(),
        isDisabled: !i.active
    }))

    return projects

}
