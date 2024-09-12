import dbConnect from "@/lib/mongodb";
import User from "@/models/users";

export const addProject = async(data : any) => {

}

export const addUser = async(data : any) => {
  await dbConnect()
    return await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export const getUsers = async() => {
  return await User.find({})
}

export const registerAfterSignIn = async(user: any) => {
  await dbConnect()
   const checkUser = await User.findOne({
    email: user.email
  })

  if(!checkUser) {
    const newUser = await User.create({
      email: user.email,
      first_name : user.name,
      middle_name: " ",
      last_name : " ",
    })
    return newUser
  }
  return checkUser
  
}
