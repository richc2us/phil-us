'use server';
import dbConnect from "@/lib/mongodb";
import  User  from "@/models/users"
import  Project  from "@/models/projects"

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
