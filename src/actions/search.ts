'use server';
import dbConnect from "@/lib/mongodb";
import  User  from "@/models/users"
import  Project  from "@/models/projects"

export const searchBuyer = async(text: string) => {
    await dbConnect()
    let buyers :any = []
    const b  = await User.find({account_type: 'buyer', $text : {$search : text}}).populate('spouse_user_id')
    b.map( (i:any) => buyers.push({
        value : i._id.toString(),
        label: i.fullName + " [ " + i.email + " ]",
        data: i.toJSON()
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

export const searchUsers = async(text: string, exclude = 0) => {
    await dbConnect()
    let users :any = []
    const b  = await User.find({ _id: {$ne : exclude}, $text : {$search : text}})
    b.map( (i:any) => users.push({
        value : i._id.toString(),
        label: i.fullName,
        data: i.toJSON()
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
        label: i.name,
        data: i.toJSON()
    }))

    return projects

}
